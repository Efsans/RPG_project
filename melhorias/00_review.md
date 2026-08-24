# Review — RPG_project + Piratas e Cavaleiros

Data: 21/08/2026  
Escopo: VTT privado (1 mestre + 2 jogadores) + sistema customizado.

## O que eu acho, em uma frase

A **visão está certa** (mesa íntima, celular do jogador, regras próprias, sem competir com Foundry), o **esqueleto do VTT já prova o conceito** (grid, tokens, broadcast, salas), e o **livro de regras tem alma** — mas o produto ainda é um **protótipo desconectado**: a ficha não joga com o tabuleiro, as regras não fecham números, e a segurança/auth está no nível “funciona na LAN entre amigos, até alguém abrir o DevTools”.

Isso não é um problema de talento. É o estágio natural de um projeto que cresceu por conversas com IA, com HANDOVER desatualizado e dois “planos da verdade” (HANDOVER vs `coisas.md`) que não batem.

---

## O que está forte

1. **Escopo honesto.** Três pessoas, Discord/PS5 para voz, Supabase para realtime. Essa restrição é o que pode fazer o app ficar bom.
2. **Tabuleiro vivo.** `src/app/sala/[roomId]/page.tsx` já tem drag, spawn, throttle e sync. Isso é o coração da mesa e já existe.
3. **Filosofia do sistema.** Impulso, defesa ativa (esquiva/bloqueio), Borda do Abismo, árvores de talento e “despertar” de raças épicas dão identidade. Não é um clone preguiçoso de 5e.
4. **Documentação de mundo.** Portais, planeta 1.7× Terra, lagostas do deserto, semideuses — o cenário tem gancho de campanha, não só lista de raças.
5. **Layout do mestre pensado.** Accordion + abas estilo editor é o caminho certo para preparação + improviso.

---

## O que está frágil

### Infraestrutura

- **Dois clientes Supabase** (`src/lib/supabase.ts` e `lib/supabase.ts` + `hooks/useRealtime.ts` órfão). Risco de drift e de “por que o realtime não conecta?”.
- **Auth de fachada.** Jogador: SHA-256 + `localStorage`. Mestre: senha comparada **no cliente**. APIs de personagem aceitam GET/PATCH **sem sessão** — qualquer um com a URL lista ou altera fichas. RLS desligado.
- **Ficha vs sala.** Dashboard do mestre é placeholder (Ferreiro Bob, Goblin hardcoded). Ações da ficha dão `alert()`. Impulso/Marcas/Olho não persistem. HP persiste; o resto da ficha “de verdade” ainda não.
- **Handover perigoso.** Chaves e senhas aparecem em markdown. Isso vaza em git, dump de chat e backup.
- **Código sem tipos.** `any` em APIs e ficha; `params` no App Router sem `await` (quebra silenciosa em Next recente).
- **Rolagem de atributos.** `Math.random() * 16 + 3` não é 4d6 drop lowest nem 3d6. O livro não definiu o método, o código inventou um.

### Mecânicas

O sistema **sabe o que quer ser** e **ainda não sabe os números**. Os furos mais graves:

| Furo | Por que dói na mesa |
|---|---|
| CA Passiva = `8 + armadura` sem DEX | Quem não reage fica muito fácil de acertar; DEX some da defesa passiva |
| Impulso: máximo por classe/raça indefinido | Recurso narrativo vira “o mestre dá quanto quiser” sem âncora |
| Mana: fórmula marcada como pendente, mas `atributos.md` já descreve uma | Duas verdades no livro |
| HP nível 1 ×3 vs níveis seguintes 1 dado | Pico de poder no 1, depois crescimento lento — precisa de tabela de XP e teste |
| Borda do Abismo secreta | Tensão ótima, mas sem protocolo o jogador sente arbitrariedade injusta |
| Sem perícias + só atributo | Tudo vira “rola DEX/INT”; falta como o mestre escolhe CD |
| Espadachim/Marcas só no exemplo da ficha | Classe assinatura sem regra escrita |
| Junco citado e vazio | Nome sem kit |
| INDEX.md desatualizado (diz que lore/atributos estão pendentes) | Quem abre o índice não encontra o que já existe |

Há também **inconsistência de nome**: HANDOVER e `coisas.md` ainda falam **Capitão**; as notas de design já corrigiram para **Espadachim**. A ficha no código ainda tem Estocada / Marcar / Explodir / Olho como se fosse um personagem único hardcoded.

---

## Veredito

| Camada | Nota (0–10) | Leitura |
|---|---|---|
| Visão / produto | 8 | Clara, realista, adequada à mesa |
| Tabuleiro realtime | 6 | Prova de conceito boa; falta persistência confiável e vínculo com ficha |
| Fichas / contas | 3 | UI esboçada; sem isolamento real |
| Livro de regras | 5 | Identidade alta, fechamento baixo |
| Segurança / deploy | 2 | Ok só na LAN de confiança, e mesmo assim com ressalvas |

**Não reescreva o sistema nem troque de stack.** Feche o circuito: sala persiste → ficha genérica (recursos JSON, não Capitão hardcoded) → um combate de verdade com Impulso + reação. Em paralelo, **feche 8 números** do livro (ver `mecanicas.md`) antes de desenhar árvores de talento no VTT.

O teto deste projeto é alto exatamente porque é pequeno. O risco é virar um Foundry-lite eterno. A pasta `melhorias/` existe para puxar de volta para a mesa de sexta-feira.
