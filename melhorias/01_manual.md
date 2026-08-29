# Manual de Melhorias

Como evoluir o projeto sem se perder. Princípio: **uma mesa jogável vale mais que dez features de VTT**.

## Princípios

1. **Regras no livro, código no app.** Se a fórmula não está em `piratas_e_cavaleiros/`, o VTT não deve inventar (ex.: HP d10 fixo, atributos 3–18 aleatórios).
2. **Ficha genérica, classes como dados.** Impulso, Marcas, Olho, Mana são `resources` JSON configuráveis — não botões fixos de um personagem.
3. **Mestre é o servidor de verdade.** Jogador vê e gasta; mestre confirma HP, CDs secretas e Borda do Abismo.
4. **Realtime para o que é agora; banco para o que precisa sobreviver ao F5.** Tokens, HP, mapa.
5. **Não autenticar no cliente.** Senha de mestre e hash de jogador nunca decidem acesso só no browser.
6. **Não commitar segredos.** Env só em `.env` (gitignored). Rotacionar qualquer chave que já entrou em `HANDOVER.md`.

## Ordem recomendada (não pule)

### Fase A — Higiene (1 sessão de código)

- Um único cliente Supabase.
- Remover senha hardcoded do bundle; usar env `MESTRE_PASSWORD_HASH` só no servidor.
- Tirar chaves do git history / HANDOVER (rotacionar no painel Supabase).
- Tipos TypeScript para `Character`, `Token`, `Room`.
- Atualizar `INDEX.md` do livro para apontar os arquivos que já existem.

### Fase B — Circuito da mesa (o que destrava jogar)

1. Persistir tokens no `map_states` ao soltar o mouse (hoje o broadcast some se todos saírem e o DB estiver velho).
2. Vincular token ↔ `character_id` / `entity_id`.
3. HP da ficha visível no token (mestre edita; jogador vê o próprio).
4. Log de dados na sala (broadcast `dice_roll`), em vez de `alert()`.
5. Dashboard do mestre deixar de ser mock: listar `entities` e `characters` reais.

### Fase C — Auth mínima honesta

Para 3 amigos, **não precisa de OAuth**. Precisa de:

- Cookie httpOnly após `/api/auth`.
- APIs recusam PATCH/GET de ficha de outro user (exceto papel mestre).
- Role na sala não vem só de `?role=dev` na URL (hoje isso é um convite para virar mestre).

Supabase Auth pode esperar. Cookie + tabela `users` já existente é suficiente.

### Fase D — Ficha alinhada ao livro

Implementar só o que o livro já definiu:

- 6 atributos + modificador `(atr-10)/2`.
- HP nível 1: `3 × dado de classe + CON`.
- Recursos: Impulso (checkboxes com máximo), HP, MP (quando fechado).
- Ações como lista JSON: `{ nome, formula }` interpretada no servidor ou pelo menos logada.

**Não** implementar Explodir do Espadachim até a classe estar escrita.

### Fase E — Fechar o livro (mesa de design, papel)

Siga `mecanicas.md`. Meta: uma página A4 de “como se joga um combate” antes da árvore visual.

### Fase F — Depois que a mesa já rodou 2 sessões

Snap-to-grid, imagem no token, fog of war, mídia, PWA. O HANDOVER já listou isso; está certo como **depois**.

## Como decidir “isso entra agora?”

Pergunte: **na próxima sessão, o mestre ou o jogador usa isso com o celular na mão?**

- Sim → entra.
- Só fica bonito no editor → backlog futuro.
- Precisa de número que o livro não tem → primeiro fecha a regra, depois o botão.

## Checklist de uma feature de regra

- [ ] Texto no arquivo certo de `piratas_e_cavaleiros/`
- [ ] Exemplo numérico (nível 1, atributos médios)
- [ ] O que o jogador clica / o que o mestre decide em segredo
- [ ] Campo JSON na ficha (se precisar de estado)
- [ ] Broadcast ou persistência (se a mesa precisa ver)
- [ ] Item riscado em `backlog.md`
