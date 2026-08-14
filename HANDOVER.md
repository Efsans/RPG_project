# 🎲 Mesa Virtual RPG — Handover Completo

> **O que é isto:** Documento de contexto para qualquer IA ou desenvolvedor que for continuar este projeto. Contém TUDO que foi discutido, decidido e implementado.

---

## 1. Visão do Projeto

Uma **aplicação web privada de mesa virtual para RPG**, feita sob medida para **3 pessoas** (1 Mestre + 2 Jogadores). Não é para competir com Roll20 ou Foundry VTT — é para ser **"a mesa do Eduardo"**, construída especificamente para as campanhas que ele mestra.

### Filosofia
- **Não fazer uma VTT genérica.** Fazer a ferramenta exata que a mesa precisa.
- **Celular como tela do jogador.** O PC do mestre mostra o tabuleiro completo; os celulares dos jogadores mostram ficha + visão do mapa.
- **Simplicidade acima de tudo.** Se dá pra resolver com Supabase, usa Supabase. Sem servidores extras.
- **Evolução gradual.** Começa com tokens no grid, depois fichas, depois mídia, depois fog of war. Sem tentar fazer tudo de uma vez.

---

## 2. Arquitetura Final (Decidida)

```
INTERNET
    │
    ├── Vercel (Frontend Next.js)
    │
    └── Supabase (TUDO o resto)
         ├── PostgreSQL (fichas, salas, estado do mapa)
         ├── Storage (imagens, vídeos, áudios — bucket "media")
         └── Realtime / Broadcast (sincronização ao vivo)
```

### Decisões-chave:
| Decisão | Escolha | Motivo |
|:---|:---|:---|
| Framework | **Next.js 15+ (App Router)** | Eduardo já conhece a stack |
| Styling | **TailwindCSS** | Já veio configurado no projeto |
| Estado local | **useState/useRef** (futuro: Zustand) | Simples pro MVP |
| Backend | **Supabase** (sem servidor Node.js) | Grátis, sem hibernar, zero manutenção |
| Realtime | **Supabase Realtime (Broadcast)** | Substitui Socket.IO completamente |
| Hospedagem | **Vercel** (frontend) | Grátis, deploy automático |
| Comunicação por voz | **Discord / PS5** (externo) | Não reinventar a roda |

### O que foi DESCARTADO:
- ❌ **Servidor Node.js/Socket.IO dedicado** — removido. O Supabase Realtime faz o mesmo.
- ❌ **Go (Golang) como backend** — discutido mas descartado. A stack Supabase+Next.js é mais eficiente para o escopo.
- ❌ **Railway** — o Eduardo não gostou. Preferiu Vercel + Supabase.
- ❌ **Monorepo com `ws-server`** — a pasta foi deletada. Tudo ficou dentro do Next.js.

---

## 3. Estado Atual do Código

### Projeto real: `D:\Eduardo\projeto\RPG_project`

> ⚠️ **ATENÇÃO:** Existe uma pasta antiga em `D:\Eduardo\RPG_PROJECT` (maiúsculo) que era o scaffold inicial. O projeto **real e atualizado** está em `D:\Eduardo\projeto\RPG_project`.

### O que já funciona:
1. **Tela de Login** — dois botões: `DEV` (Mestre) e `CLIENTE` (Jogador).
2. **Tabuleiro com Grid** — fundo escuro com linhas de grid 50×50px desenhadas via CSS (`background-image: linear-gradient`).
3. **Tokens (bolas)** — pretas (NPC/dev) e vermelhas (jogador/cliente). Posicionados com `transform: translate()`.
4. **Drag & Drop de tokens** — funciona com Pointer Events (`onPointerDown`, `onPointerMove`, `onPointerUp`). Cada token rastreia offset e se move suavemente.
5. **Sincronização em tempo real** — quando o mestre move um token, os jogadores veem instantaneamente. Usa `supabase.channel("table-1")` com eventos `token_move`, `sync_request`, `sync_response`.
6. **Spawn de novos tokens** — o mestre pode arrastar da sidebar para o tabuleiro para criar novas bolas.
7. **Throttling de broadcast** — movimentos são enviados a cada 50ms no máximo para não sobrecarregar o Supabase.

### Arquivos importantes:
- **`src/app/page.tsx`** — TODO o código da aplicação (login + tabuleiro + lógica de drag).
- **`src/lib/supabase.ts`** — Cliente Supabase (`createClient` com env vars).
- **`.env`** — Chaves do Supabase (`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- **`package.json`** — Scripts `dev` e `start` com `-H 0.0.0.0` para aceitar conexões da rede local.

### Fluxo do Supabase Realtime (como funciona):
```typescript
const channel = supabase.channel("table-1");

// Mestre move token
channel.send({
  type: "broadcast",
  event: "token_move",
  payload: { id: "goblin-01", x: 150, y: 200 }
});

// Jogadores recebem
channel.on("broadcast", { event: "token_move" }, (payload) => {
  // Atualiza posição do token na tela
});

// Sincronização inicial (quando alguém entra na sala)
// O novo cliente pede → quem já está manda o estado completo
channel.send({ type: "broadcast", event: "sync_request" });
channel.on("broadcast", { event: "sync_response" }, (payload) => {
  setTokens(payload.payload);
});
```

---

## 4. Banco de Dados (Supabase)

Um arquivo `schema.sql` foi criado (pode estar em `D:\Eduardo\RPG_PROJECT\schema.sql`). As tabelas são:

| Tabela | Propósito |
|:---|:---|
| `rooms` | Salas de jogo (código, senha, nome do mestre) |
| `characters` | Fichas de personagem (HP, atributos, ações, habilidades, `is_npc`, `token_image_url`) |
| `map_states` | Estado persistente do mapa (imagem de fundo, grid_size, tokens JSONB, áreas reveladas) |

- **Bucket `media`** criado no Storage para imagens/vídeos/áudios (público).
- **RLS permissivo** (permitir tudo) — é uma mesa privada entre amigos.
- **Realtime habilitado** em todas as tabelas.

---

## 5. Problemas Resolvidos

### 5.1 Acesso pelo celular na rede local
- **Problema:** O celular não conseguia acessar `192.168.100.52:3000`.
- **Causa 1:** O Next.js por padrão só escuta em `localhost`. Resolvido com `-H 0.0.0.0` nos scripts `dev` e `start`.
- **Causa 2:** Firewall do Windows bloqueava a porta 3000. Resolvido com:
  ```
  netsh advfirewall firewall add rule name="Next.js Dev Server (porta 3000)" dir=in action=allow protocol=TCP localport=3000
  ```
- **Causa 3:** O modo `dev` (Turbopack) carrega JavaScript via WebSocket interno que é bloqueado pela rede. **Solução definitiva:** usar `npm run build` + `npm run start` (modo produção) para testes no celular.

### 5.2 IP correto
- O Eduardo tem **Radmin VPN** (`26.193.36.104`) e **rede local** (`192.168.100.52`).
- Para testes em casa com celular no mesmo Wi-Fi: usar `192.168.100.52:3000`.
- O IP do Radmin só funciona se o celular também tiver Radmin instalado.

### 5.3 Botões não clicáveis no celular
- `touch-none` no CSS bloqueia eventos de toque em alguns navegadores. Removido dos botões.
- Botões usam `onClick` com `style={{ touchAction: 'manipulation' }}` para evitar delay de 300ms.
- Tokens no tabuleiro usam `touch-none` corretamente (para bloquear scroll durante drag).

---

## 6. Roadmap Completo (Fases)

### Fase 1 — MVP ✅ (parcialmente feito)
- [x] Login na mesa (DEV / CLIENTE)
- [x] Tabuleiro com grid
- [x] Tokens arrastáveis
- [x] Sincronização em tempo real (Supabase Broadcast)
- [x] Spawn de novos tokens (sidebar do mestre)
- [ ] Conectar ao banco (persistir estado entre sessões)
- [ ] Sistema de salas com código/senha

### Fase 2 — Fichas e Dados
- [ ] Componente de **Ficha do Personagem** (HP, atributos, CA, velocidade)
- [ ] **Rolagem de dados** visível para todos (d4, d6, d8, d10, d12, d20)
- [ ] Ações e habilidades na ficha (botões clicáveis que executam a mecânica)
- [ ] HP editável em tempo real pelo mestre

### Fase 3 — Mídia Sincronizada
- [ ] **Upload de imagens** para o bucket `media` do Supabase
- [ ] **Mostrar imagem para todos** — mestre clica, aparece em tela cheia nos jogadores
- [ ] **Música ambiente** — mixer com camadas (floresta, chuva, combate, taverna)
- [ ] **Vídeo** — mestre dá play, jogadores assistem sincronizado
- [ ] Controles: play, pause, volume, trocar faixa

### Fase 4 — Recursos Avançados
- [ ] **Fog of War** — mestre controla o que cada jogador vê no mapa
- [ ] **Mensagens privadas** — mestre pode enviar texto só para um jogador
- [ ] **Tokens com imagem** — em vez de bolas coloridas, usar imagens dos personagens
- [ ] **Snap to grid** — tokens se encaixam nas células do grid
- [ ] Trocar mapa (imagem de fundo do tabuleiro)

### Fase 5 — Mobile e Distribuição
- [ ] **PWA** — instalar como "app" no celular
- [ ] Layout mobile dedicado (ficha + ações + dado, sem tabuleiro gigante)
- [ ] Eventualmente: empacotar com Capacitor para Android

---

## 7. Ideias de RPG Discutidas (Contexto para mecânicas)

### Sistema de combate do one-shot
- Jogadores são **nível 1**, mas rolam **3 dados de vida** para ter mais HP (para aguentar lutas cinematográficas estilo anime).
- Fórmula: `PV = 3 × dado de vida da classe + modificador de Constituição`
- Justificativa narrativa: *"São protagonistas capazes de sobreviver a situações absurdas."*

### Boss: Doâ-múto (líder de tribo)
- Guerreiro físico extremamente forte.
- Soco/chute: d6+5 de dano, dois ataques em sequência.
- Lança: d12+5 de dano.
- HP: 200-300 (discutido se é exagero — decisão pendente).
- Ideia: os jogadores lutam contra 3-7 membros da tribo + o boss.

### Ficha personalizada (exemplo: Capitão)

> ⚠️ **Nota de Prioridade:** A implementação de regras e botões de habilidades hardcoded (como cálculo automático de dano) **não é o foco inicial do projeto**. A arquitetura deve permitir essa flexibilidade, mas a implementação real dessas fichas super customizadas deve ficar para o fim do projeto. O foco no começo é a base (tabuleiro, movimentação, ficha simples).

A aplicação pode entender as **mecânicas específicas dos personagens do Eduardo**, não só fichas genéricas:
```
CAPITÃO
HP ████████████████████ 125/125
IMPULSO [ 1 ] [ 2 ] [ 3 ]
MARCAS  ██████████████ 14
OLHO    ○ DESATIVADO

[ ESTOCADA ] [ MARCAR ] [ EXPLODIR ]
```
- Botão MARCAR acumula marcas no alvo.
- Botão EXPLODIR calcula: `marcas × (1 + INT) × 2 = DANO`.
- A aplicação mostra: `💥 CAPITÃO causou 84 de dano!`

### Celular como tela complementar
- PC do mestre: tabuleiro completo com todos os controles.
- Celular do jogador: ficha pessoal + ataques + dados + visão limitada do mapa.
- Mestre pode enviar coisas SÓ para um jogador: *"Você sente algo te observando..."*

---

## 8. Visão de Mídia (como funciona)

### Imagens
- Mestre sobe imagem → aparece em tela cheia nos celulares dos jogadores.
- Dois modos: **referência** (fica disponível) vs **apresentada** (popup dramático).

### Música
- Mixer com camadas que o mestre controla:
  - 🌧 Chuva + 🌲 Floresta + 🎵 Música tensa
  - Transição para: 💥 Trilha de combate
- Não é streaming. O servidor manda o COMANDO (`PLAY "battle.mp3"`), cada cliente reproduz localmente.

### Vídeo
- Mesmo conceito: servidor manda `PLAY VIDEO "intro.mp4"`, cada cliente reproduz.
- Muito mais leve que streaming real.

---

## 9. Configuração Técnica (para quem for continuar)

### Rodar em desenvolvimento (só no PC):
```bash
cd D:\Eduardo\projeto\RPG_project
npm run dev
# Acessa em http://localhost:3000
```

### Rodar para testar no celular (produção local):
```bash
cd D:\Eduardo\projeto\RPG_project
npm run build
npm run start
# Celular acessa http://192.168.100.52:3000
```

### Variáveis de ambiente (`.env`):
```
NEXT_PUBLIC_SUPABASE_URL=https://qcmjfhixxauusfktmrnx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_JvsgAczyhfeqvJDI6Bchpg_TducJACj
```

### Dependências atuais:
- `next@16.3.0`, `react@19.2.8`, `react-dom@19.2.8`
- `@supabase/supabase-js@^2.112.3`, `@supabase/ssr@^0.12.4`
- `tailwindcss@^4`, `typescript@^5`

### Firewall:
A porta 3000 já foi liberada no Windows Firewall. Se precisar refazer:
```
netsh advfirewall firewall add rule name="Next.js Dev Server (porta 3000)" dir=in action=allow protocol=TCP localport=3000
```

---

## 10. O que NÃO fazer

| ❌ Não fazer | Por quê |
|:---|:---|
| Vídeo/áudio call dentro da app | Usem Discord/PS5 |
| Matchmaking / contas complexas | São 3 amigos, código+senha basta |
| Sistema completo de D&D 5e | Regras são customizadas do Eduardo |
| Inventário gigante / marketplace | Fora do escopo |
| Sincronização offline | Se a internet cair, pausa o RPG |
| Iluminação 3D / física | Over-engineering para o propósito |
| Competir com Roll20/Foundry | O objetivo é ser a ferramenta perfeita para ESTA mesa |
