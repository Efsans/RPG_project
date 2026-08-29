# Classes e Progressão

Quatro **bases**. O resto do elenco (Paladino, etc.) deriva delas, no espírito de D&D — ainda não escrito. [Junco](./classes/junco.md) é a quinta, em esboço.

O VTT **não hardcoda** classe: o mestre cria pelo painel com o template. Cada arquivo em `classes/` é uma **ficha** para preencher — campos iguais, lista de níveis, ramificações no fim.

| Base | Dado de vida | Vigor / Mana | Foco-base | Arquivo |
|---|---|---|---|---|
| Guerreiro | d12 | 1d4 + SAB | 3 | [guerreiro.md](./classes/guerreiro.md) |
| Espadachim | d10 | 1d6 + SAB | 3 | [espadachim.md](./classes/espadachim.md) |
| Ladino | d6 | 1d6 | 3 | [ladino.md](./classes/ladino.md) |
| Mago | d6 | 2d8 + INT (mana) | 2 | [mago.md](./classes/mago.md) |
| Junco | d10 | 1d6 + SAB | 3 | [junco.md](./classes/junco.md) |

**O Capitão** não é classe. É um personagem da lore — um Espadachim específico. Marcas, Olho e Explodir, se aparecerem, são arma/história *dele*, não do arquétipo.

**Feiticeiro** (quando existir) não é Mago com CAR: magia mais solta, mana em CAR, custo ainda na tabela de [magia.md](./magia.md).

Playtest: **2 talentos no nível 1** e **1 encruzilhada no nível 3**. O resto da lista (2, 4, 5…) e as ramificações ficam em branco para ir criando.

---

## Template

| Campo | O que é |
|---|---|
| Descrição | um parágrafo da fantasia. Classes não têm origens; a descrição faz esse papel |
| Dado de vida | o dado da classe (d12, d10, d6…) |
| HP nível 1 | máximo do dado + 2 dados rolados + CON + raça |
| HP ao upar | 1 dado de vida + CON + raça |
| Vigor | reserva de técnicas. Marciais usam isto |
| Mana | só conjurador. No Mago, Vigor **é** Mana. Marcial: — |
| Foco-base | número da classe, antes de raça e `piso(nível / 3)` |
| Atributo sugerido | não é mínimo, só o ofício |

Cada ficha tem **tabela de progressão 1–20**, texto por nível (1–8 detalhado, 9–20 compacto) e **ramificações** a partir do 3. Nível vazio = ainda não escrito. Ramificação vazia = caminho para criar depois.

---

## Experiência

XP se marca **antes**, nunca no improviso do último segundo. Antes da missão começar, ou antes da luta, o mestre escreve o valor. Pode alterar a tabela — a obrigação é ser honesto com o número *antes* dos dados.

### Criaturas (por cabeça, cada PC recebe o valor — mesa de dois, não divide)

| Tipo | XP |
|---|---|
| Fraco | 10 |
| Médio | 20 |
| Forte ou chefe | 100 ou mais (o mestre escreve o número) |

### Missões, marcos e itens

O mestre escolhe um pacote pela dificuldade da missão e anuncia.

| Dificuldade da missão (guia) | XP sugerido |
|---|---|
| Simples / um recado que deu errado | 30 |
| Padrão de aventureiro | 60 |
| Feia / várias cenas | 100 |
| Marco de campanha | 150+ |

Item importante encontrado pode valer um marco pequeno (20–50), se o mestre listou isso antes.

### Tabela de nível (acumulado) — playtest 1–8

| Nível | XP acumulado | Nota |
|---|---|---|
| 1 | 0 | |
| 2 | 100 | Um chefe ou uma missão padrão |
| 3 | 250 | |
| 4 | 450 | |
| 5 | 700 | |
| 6 | 1000 | |
| 7 | 1400 | teto da campanha curta começa a apertar |
| 8 | 1900 | fim do recorte curto |
| 9–20 | +600 por nível (placeholder) | não balanceado; existe para o VTT não quebrar |

Ao atingir o XP do próximo nível, o personagem **upa** na próxima folga narrativa (não no meio do golpe, salvo o mestre querer cinema).

---

## O que se ganha ao upar

1. **HP:** 1 dado de vida + CON + bônus racial. Pode gastar 1 Foco para rerrolar o dado.
2. **Vigor / Mana:** 1 dado de vigor da classe + atributo. Idem Foco.
3. **Foco máximo:** recalcula `base + raça + piso(nível / 3)`.
4. **Talento:** conforme a ficha da classe (nível 3 = ramificação; depois a lista de níveis).
5. Nada de +1 em atributo automático no playtest — isso, se existir, vem de talento ou de marco.

---

## Paladino e outros tanques

Usam o pacote de vida/vigor do Guerreiro (`12 + 2d12`, vigor `1d4 + SAB`) até ganharem página própria. Não copie 5e. Espere a mesa pedir.
