# Melhorias de Infraestrutura (VTT)

Anotações técnicas. Atualize quando algo for feito.

## Arquitetura atual (o que o código realmente faz)

```
Browser
  ├── /lobby          criar/entrar sala (código + senha)
  ├── /sala/[id]      tabuleiro + tokens + broadcast
  ├── /login          jogador → localStorage
  ├── /jogador        lista fichas
  ├── /mestre         senha no cliente → dashboard mock
  └── /api/*
        auth, rooms, characters  (Supabase service via anon key)
Supabase
  ├── rooms, map_states, users, characters, entities
  └── Realtime Broadcast (token_move, sync_request/response)
```

O HANDOVER ainda descreve “tudo em `src/app/page.tsx`”. Isso **já não é verdade**. Tratar `HANDOVER.md` como histórico, não como mapa.

## Prioridade alta

### 1. Persistência do mapa

**Problema:** posições vão no broadcast; o load inicial lê `map_states`, mas o movimento contínuo pode não gravar (ou gravar pouco). Sync entre clientes vivos funciona; **F5 / segundo jogador atrasado** depende do DB estar fresco.

**Melhoria:** debounce 300–500 ms no `pointerup` → PATCH `map_states.tokens`. Mestre é a fonte da verdade; jogador só move o próprio token.

### 2. Papel na sala

**Problema:** `?role=dev` na query string define o mestre.

**Melhoria:** ao criar sala, gravar `master_user_id` ou flag na sessão. Join sempre entra como jogador. “Assumir mestre” só com senha da sala + cookie.

### 3. Auth e APIs

**Problema:**

- `/api/characters` GET sem `user_id` devolve **todas** as fichas.
- PATCH sem checagem de dono.
- SHA-256 sem salt (rainbow table trivial).
- Senha do mestre no JavaScript enviado ao celular.

**Melhoria mínima:**

- `POST /api/auth` devolve cookie assinado (ou session token na tabela).
- `GET /api/characters` usa o cookie; ignora `user_id` do query (ou só mestre pode omitir filtro).
- Trocar hash por `scrypt`/`bcrypt` quando tocar de novo em senha; até lá, salt aleatório por usuário já ajuda.
- Login mestre: `POST /api/mestre-auth` compara hash no servidor.

### 4. Um cliente Supabase

Apagar ou unificar:

- `src/lib/supabase.ts` (createClient clássico)
- `lib/supabase.ts` + `hooks/useRealtime.ts` (não usados pela sala)

A sala já faz channel na mão. Ou o hook vira a única API, ou some.

### 5. Segredos

- Rotacionar `NEXT_PUBLIC_SUPABASE_*` que já apareceram em markdown.
- Nunca republicar senha de mestre em `coisas.md` / HANDOVER.
- Confirmar `.env` no `.gitignore`.

### 6. Schema

`database_setup.sql` assume `rooms` já existe. Falta um SQL único reproduzível (`rooms` + `map_states` + índices + realtime publication).

Sugestão de campos que o código já precisa e o SQL não cobre bem:

- `characters.mp`, `max_mp`
- `characters.resources` — já existe JSONB; usar de verdade (impulso, marcas)
- `map_states` atualizado em `updated_at`
- `rooms.is_open`, `rooms.master_user_id`

RLS: mesmo sendo mesa privada, **ligar RLS** com policies “dono ou mestre” evita o acidente do anon key no browser.

## Prioridade média

- **Tipos** em `src/types/game.ts`.
- **Next `params`**: em App Router 15+, `params` é Promise — corrigir `characters/[id]/route.ts`.
- **Dashboard mestre:** CRUD `entities` de verdade; canvas central reutilizar a mesma lógica da `/sala` ou extrair `Board` compartilhado.
- **Dados:** `DiceRoller` emitir broadcast `dice` com `{ roller, formula, result, hidden? }` para o log inferior.
- **Mobile jogador:** `/jogador` + ficha em 390px; tabuleiro só leitura ou recorte. O HANDOVER acertou a tese; o layout ainda é desktop.
- **Throttling:** 50 ms está ok; persistir separado do broadcast (não gravar 20 vezes por segundo).

## Prioridade baixa (depois da mesa estável)

- Fog of war, whispers, mixer de áudio, PWA, Capacitor.
- Zustand só quando o Board + ficha + log começarem a brigar por props.
- Storage `media` para mapas: upload no mestre, URL no `map_states.background_url`.

## Dívida documental

| Arquivo | Ação |
|---|---|
| `HANDOVER.md` | Banner no topo: “parcialmente obsoleto; ver `melhorias/`” |
| `piratas_e_cavaleiros/coisas.md` | Plano de UI; mover senha para env; alinhar Capitão → Espadachim |
| `README.md` | Ainda é o template do create-next-app — substituir por como rodar a mesa |

## Anti-objetivos de infra (não fazer agora)

- Servidor Node/Socket.IO paralelo
- Contas Google/Discord
- Offline-first
- Iluminação 3D
