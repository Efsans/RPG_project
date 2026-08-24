# Plano de Implementação — VTT Privado (RPG)

Um Virtual Tabletop (VTT) focado e intimista para 1 Mestre e 2 Jogadores. Sistema com regras próprias, sem necessidade de suportar sistemas comerciais. Flexibilidade máxima para o mestre (preparação prévia + improviso) e isolamento de informações para os jogadores.

---

## Estado Atual do Código vs. O Que Precisa Ser Feito

| O que já existe | O que falta |
|---|---|
| Lobby com criação/entrada em sala (código+senha) | ❌ Login do Mestre (senha hardcoded `amemdoim23`) |
| Grid VTT básico (800x600) com tokens arrastáveis | ❌ Sistema de contas de Jogador (usuário/senha) |
| Realtime via Supabase Broadcast (token_move) | ❌ Criação de Ficha de Personagem |
| API routes para rooms (create/join) | ❌ Tela de Preparação do Mestre (layout editor) |
| Tokens simples (bolinhas coloridas, sem ficha) | ❌ Tabela `entities` e gestão de NPCs/Inimigos |
| Supabase client/server helpers | ❌ Layout estilo editor com accordions e abas |

> [!IMPORTANT]  
> **Foco desta fase**: Criar a **ficha de personagem**, a **área do jogador** (contas + gestão do personagem), e o **layout estilo editor** com menus accordion e abas para o Mestre. O visual das telas (cores, fontes, detalhes estéticos) fica para depois — o foco é a **posição dos menus e a estrutura funcional**.

---

## 1. Layout Geral — Estilo Editor Profissional (Photoshop/Krita/GIMP)

A interface principal do Mestre segue o paradigma de editores profissionais: uma **tela central** grande cercada por painéis colapsáveis.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Cenas]  [Entities]  [Characters]  [Mídias*]  [Config]           │ ← Barra de Abas (topo)
├──────────────┬──────────────────────────────────┬───────────────────┤
│ ▼ Tokens     │                                  │ ▼ Ficha do Token  │
│   • NPC-1    │                                  │   Nome: Goblin    │
│   • NPC-2    │                                  │   HP: 12/12       │
│ ▶ NPCs      │        CANVAS / MAPA CENTRAL     │   AC: 13          │
│ ▶ Monstros   │         (área principal)          │ ▶ Atributos       │
│ ▶ Aliados    │                                  │ ▶ Ações           │
│              │                                  │ ▶ Inventário      │
│              │                                  │                   │
├──────────────┴──────────────────────────────────┴───────────────────┤
│  🎲 Dados  |  💬 Chat / Log de Combate                            │ ← Barra Inferior
└─────────────────────────────────────────────────────────────────────┘
```

### Estrutura dos Painéis

- **Barra de Abas (topo)**: Alterna o conteúdo da área central entre diferentes modos (Cenas, Entities, Characters, Mídias*, Config). Cada aba carrega uma "página" diferente no canvas central.
- **Sidebar Esquerda (Gavetas Accordion)**: Painéis colapsáveis com toggle ▼/▶. Organizado por pastas. Drag & drop de itens para o canvas.
- **Sidebar Direita (Inspetor Accordion)**: Mostra os detalhes do item selecionado no canvas (ex: clicou num token → aparece a ficha dele à direita). Painéis colapsáveis para Atributos, Ações, Inventário.
- **Barra Inferior**: Rolagem de dados + log de combate / chat narrativo.

> [!NOTE]
> *Mídias é uma aba futura. A sincronização de mídia em tempo real é complexa e não é o foco atual. A aba pode existir como placeholder desabilitado.

---

## 2. Fluxo do Mestre (Game Master)

### 2.1 Login do Mestre
- Rota dedicada (ex: `/mestre` ou `/login-mestre`).
- Campo de senha simples. Senha hardcoded: `amemdoim23`.
- Sem criação de conta. Acesso direto ao Dashboard.

### 2.2 Dashboard / Tela de Preparação
A tela principal do Mestre segue o layout de editor descrito na Seção 1.

**Aba "Entities"** (foco desta fase):
- CRUD completo de NPCs, Inimigos e Monstros.
- Cada entity tem uma **ficha** vinculada (mesma estrutura do `character`, mas controlada pelo mestre).
- Organizados em pastas (ex: `Goblins/`, `Bosses/`, `NPCs da Vila/`).

**Aba "Characters"**:
- Visualização de todos os personagens dos jogadores.
- O Mestre pode **editar** qualquer campo de qualquer personagem.

**Aba "Cenas"** (preparação prévia):
- Upload de mapa (imagem de fundo).
- Posicionar tokens no mapa antecipadamente.
- Salvar cenas prontas para carregar durante o jogo.
- **Também funciona durante a sessão**: mestre pode montar uma cena em outra aba do navegador e "empurrar" para os jogadores quando pronta.

### 2.3 Gestão da Sala
- Botão **"Abrir Sala"** → Inicia a sessão ao vivo (pode abrir em nova aba).
- Botão **"Fechar Sala"** → Encerra a sessão.
- Limpeza automática de salas ociosas no servidor.

### 2.4 Tela de Jogo (Mestre)
- Canvas central com mapa e tokens.
- **Gaveta de Improviso** (sidebar esquerda): Puxar `entities` da gaveta direto para o mapa em tempo real.
- Rolagem de dados e log de combate na barra inferior.

---

## 3. Fluxo dos Jogadores

### 3.1 Sistema de Contas
- Jogadores criam conta com **usuário e senha**.
- Ao logar, caem em um ambiente privado simples focado nos seus personagens.
- **Sem menu de "Campanhas"** — é direto ao ponto.

### 3.2 Criação de Ficha / Personagem (`characters`)

**Isolamento de Visão**: O jogador X só vê e edita o personagem X. Os jogadores NÃO veem as fichas uns dos outros. O Mestre vê e edita todos.

#### Estrutura da Ficha de Personagem

```
┌─────────────────────────────────────────────────────┐
│  NOME DO PERSONAGEM                    Nível: 1     │
│  Classe: Capitão          Raça: Humano              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ██████████████████████░░░░░  HP: 125 / 125         │  ← Barra de vida
│                                                     │
│  IMPULSO  [●] [●] [○]       MARCAS: 14              │  ← Recursos / Trackers
│  OLHO:  [DESATIVADO] / ATIVO                        │  ← Toggles
│                                                     │
├─────────────────────────────────────────────────────┤
│  ▼ ATRIBUTOS (rolados com dados)                    │
│    FOR: 14 (+2)   DEX: 12 (+1)   CON: 16 (+3)     │
│    INT: 18 (+4)   SAB: 10 (+0)   CAR: 8  (-1)     │
│                                                     │
│  ▼ AÇÕES DE COMBATE                                 │
│    [ 🗡️ ESTOCADA ]     → Rolar 1d8 + FOR           │
│    [ 🎯 MARCAR ]        → +1 stack de Marcas        │
│    [ 💥 EXPLODIR ]      → marcas × (1+INT) × 2     │
│                                                     │
│  ▼ LORE / HISTÓRIA                                  │
│    Campo de texto livre para o jogador escrever     │
│    a história e background do personagem.           │
│                                                     │
│  ▼ INVENTÁRIO                                       │
│    • Espada Longa                                   │
│    • Poção de Cura x3                               │
└─────────────────────────────────────────────────────┘
```

#### Criação de Atributos — Rolagem Aleatória de Dados
- O jogador **rola dados** para definir os atributos (FOR, DEX, CON, INT, SAB, CAR).
- Interface visual de rolagem com animação de dados.
- Os valores são gerados aleatoriamente e o jogador pode distribuir conforme as regras.

#### Regra de PV Nível 1 (Protagonista)
- PV = 3 × Dado de Vida + Modificador de CON.
- Justificativa narrativa: protagonistas estilo anime, mais resistentes que o comum.

#### Mecânicas Customizadas na Ficha
- **Barras**: HP, e recursos customizáveis.
- **Trackers de Recursos**: Checkboxes para usos limitados (ex: IMPULSO [●][●][○]).
- **Contadores de Stacks**: Valor numérico incrementável (ex: MARCAS: 14).
- **Toggles**: On/Off para estados (ex: OLHO: ATIVO/DESATIVADO).
- **Botões de Ação**: Cada ação tem uma fórmula vinculada. Ao clicar, executa a fórmula e envia o resultado para o log de combate em broadcast (ex: `💥 CAPITÃO causou 84 de dano!`).

---

## 4. A Sala / Sessão de Jogo (VTT Ao Vivo)

- Grid com mapa de fundo + tokens redondos (bolinhas com imagem/cor).
- Tokens vinculados a fichas (`characters` ou `entities`).
- Rolagem de dados visível para todos na sala.
- Atualização em tempo real via Supabase Realtime (posições, trocas de mapa, ações).
- Evolução futura: tokens com visão top-down, fog of war, whispers do mestre.

---

## 5. Visão de Futuro (Não é Foco Atual)

| Feature | Complexidade | Quando |
|---|---|---|
| Aba de Mídias (música, vídeo, cutscenes) | 🔴 Alta — sincronização complexa | Fase futura |
| Fog of War | 🟡 Média | Fase futura |
| Whispers (mestre → jogador) | 🟢 Baixa | Fase futura |
| Tokens com avatar top-down | 🟡 Média | Fase futura |
| Snap-to-grid | 🟢 Baixa | Fase futura |
| PWA / Mobile dedicado | 🟡 Média | Fase futura |

---

## Proposta de Mudanças nos Arquivos

### Banco de Dados (Supabase)

#### [NEW] Tabela `users` (contas dos jogadores)
- `id`, `username`, `password_hash`, `created_at`

#### [NEW] Tabela `entities` (NPCs/Inimigos do Mestre)
- `id`, `name`, `folder`, `hp`, `max_hp`, `attributes` (JSONB), `actions` (JSONB), `abilities` (JSONB), `resources` (JSONB — trackers, toggles, stacks), `token_image_url`, `notes`

#### [MODIFY] Tabela `characters` (fichas dos jogadores)
- Adicionar: `user_id` (FK → users), `class`, `race`, `level`, `max_hp`, `attributes` (JSONB), `actions` (JSONB), `abilities` (JSONB), `resources` (JSONB), `lore` (text), `inventory` (JSONB)

---

### Frontend (Next.js / React)

#### [NEW] `src/app/mestre/page.tsx`
- Página de login do mestre (senha hardcoded).

#### [NEW] `src/app/mestre/dashboard/page.tsx`
- Dashboard principal com layout estilo editor (abas + sidebars accordion).

#### [NEW] `src/app/login/page.tsx`
- Login/registro de conta para jogadores.

#### [NEW] `src/app/jogador/page.tsx`
- Área do jogador: lista de personagens, criação de ficha.

#### [NEW] `src/app/jogador/ficha/[characterId]/page.tsx`
- Tela de edição/visualização de ficha individual.

#### [NEW] `src/components/ui/Accordion.tsx`
- Componente de painel accordion colapsável reutilizável.

#### [NEW] `src/components/ui/TabBar.tsx`
- Componente de barra de abas reutilizável.

#### [NEW] `src/components/ficha/CharacterSheet.tsx`
- Componente da ficha de personagem (barras, trackers, ações, lore).

#### [NEW] `src/components/ficha/DiceRoller.tsx`
- Componente de rolagem de dados com visual animado.

#### [NEW] `src/components/ficha/AttributeRoller.tsx`
- Componente para rolar atributos na criação de personagem.

---

## Plano de Verificação

### Verificação Automatizada
```bash
npm run build   # Verificar que tudo compila sem erros
npm run lint    # Verificar padrões de código
```

### Verificação Manual
- [ ] Login do mestre com `amemdoim23` funciona e redireciona ao dashboard
- [ ] Criação de conta de jogador funciona
- [ ] Login de jogador funciona e mostra apenas seus personagens
- [ ] Criação de ficha com rolagem de dados funciona
- [ ] Layout accordion abre/fecha corretamente
- [ ] Abas alternam o conteúdo central
- [ ] Mestre consegue ver e editar fichas de todos os jogadores
- [ ] Jogador X NÃO vê fichas do jogador Y
