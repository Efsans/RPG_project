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
- [ ] P1 Resources JSON persistidos (impulso, marcas) em vez de useState local
- [ ] P1 Rotacionar chaves que vazaram em markdown; banner no HANDOVER
- [ ] P1 README de verdade (como rodar LAN + produção local)
- [ ] P2 Token ↔ ficha; HP no token
- [ ] P2 Snap-to-grid; imagem de token
- [ ] P2 Layout mobile da ficha
- [ ] P2 Fog of war / whispers / mídia

## Mecânicas (livro)

- [ ] P0 Loop de combate escrito (ataque vs Guarda vs reação)
- [ ] P0 Decisão de CA Passiva (opção A/B/C)
- [ ] P0 Tabela de CD
- [ ] P0 Teto de Impulso nível 1 + recarga
- [ ] P0 Espadachim: dado de vida, Marcas, Explodir, Olho — uma página
- [ ] P1 XP e HP níveis 2–5
- [ ] P1 Mana de playtest (sem ×3) e trégua nas duas fórmulas
- [ ] P1 Protocolo público + secreto da Borda do Abismo
- [ ] P1 Fórmula de carga
- [ ] P1 INDEX.md atualizado
- [ ] P1 Purge “Capitão” → Espadachim nos docs de produto
- [ ] P2 Junco (kit mínimo)
- [ ] P2 Templates de raça para o painel (não hardcoded)
- [ ] P2 Uma página de cosmologia da magia

## Feito nesta pasta (meta)

- [x] Review inicial (21/08/2026)
- [x] Manual de melhorias
- [x] Separação infra vs mecânicas
