# Backlog priorizado

Legenda: `[ ]` aberto · `[x]` feito · `P0` próxima sessão · `P1` esta semana · `P2` depois de jogar

## Infraestrutura

- [ ] P0 Extrair `Board` compartilhado; persistir tokens no `map_states` no pointerup
- [ ] P0 Cookie de sessão; APIs de character recusam acesso alheio
- [ ] P0 Login do mestre só no servidor (sem senha no bundle)
- [ ] P0 Impedir `?role=dev` como único critério de mestre
- [ ] P1 Unificar cliente Supabase; remover `hooks/useRealtime.ts` morto ou passar a usá-lo
- [ ] P1 SQL único (`rooms` + `map_states` + resto) e nota de RLS
- [ ] P1 Tipos TS; corrigir `params` async nas API routes
- [ ] P1 Dashboard mestre ler `entities`/`characters` reais (acabar com mock)
- [ ] P1 Broadcast de rolagem + log na sala; ficha sem `alert()`
- [ ] P1 Resources JSON persistidos (Foco, Vigor, postura) em vez de useState local
- [ ] P1 Rotacionar chaves que vazaram em markdown; banner no HANDOVER
- [ ] P1 README de verdade (como rodar LAN + produção local)
- [ ] P2 Token ↔ ficha; HP no token
- [ ] P2 Snap-to-grid; imagem de token
- [ ] P2 Layout mobile da ficha
- [ ] P2 Fog of war / whispers / mídia

## Mecânicas (livro)

- [x] P0 Loop de combate escrito (ataque vs Guarda vs reação)
- [x] P0 Decisão de CA Passiva (`10 + armadura`)
- [x] P0 Tabela de CD
- [x] P0 Teto de Foco nível 1 + recarga (números de playtest; raça 0/1/2 ainda é achismo)
- [x] P0 Espadachim: Aparar, Contra-ataque, Postura — uma página
- [x] P1 XP e HP níveis 2–8 (tabela simples; 9–20 placeholder)
- [x] P1 Mana de playtest (Vigor do mago = 2d8; truque ≠ magia)
- [x] P1 Protocolo público + secreto da Borda do Abismo + Dano Massivo 75%
- [x] P1 Fórmula de carga (`FOR × 5 × tamanho` em **slots**; itens 0–5)
- [x] P1 INDEX.md atualizado
- [x] P1 Purge “Capitão” como classe nos docs de regra (fica como NPC da lore)
- [x] P2 Junco (kit mínimo esboçado)
- [x] P2 Template de raça + playtest (Maho, Humano, Elfo, Zacar, Anão, Meio-Zacar)
- [x] P2 Cosmologia da magia (Conselho, 102 selos, alma, Olho)
- [ ] P1 Autor fecha linhagem Maho e o resto do Zacar
- [ ] P2 Grimório nomeado + página de Feiticeiro
- [ ] P1 Autor corrige o livro na mesa (vigor marcial, foco racial, números de Zacar/Maho)

## Feito nesta pasta (meta)

- [x] Review inicial (21/08/2026)
- [x] Manual de melhorias
- [x] Separação infra vs mecânicas
- [x] Padrão visual (latão/sangue) + relicário + tray Three.js leve
- [x] Primeira redação jogável do livro (25/08/2026)
