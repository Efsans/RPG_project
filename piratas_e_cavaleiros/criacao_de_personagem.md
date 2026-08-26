# Criação de Personagem

Siga nesta ordem. Não pule a rolagem: a frustração de um 6 é parte do jogo — por isso existe o rerrol.

## 1. Conceito

Uma frase. Classe + raça + o que essa pessoa quer. A classe **sugere** um atributo-chave, mas não trava nada. Mago de combate com FOR alta é legal.

## 2. Raça

Escolha uma raça em [racas.md](./racas.md). Anote:

- deslocamento
- tamanho / multiplicador de carga
- bônus de HP (e de Vigor, se houver)
- bônus de Foco
- o traço de nível 1

**Playtest:** Maho, Humano, Elfo, Zacar, Anão, Meio-Zacar. Gigante Puro não é PC. Maho entra com Habilidades de Raça a partir do nível 2 — a linhagem ainda vai ser escrita.

## 3. Classe

As quatro bases: [Espadachim](./classes/espadachim.md), [Guerreiro](./classes/guerreiro.md), [Mago](./classes/mago.md), [Ladino](./classes/ladino.md). O resto do mundo deriva delas, no espírito de D&D.

Anote dado de vida, dado de vigor, Foco-base da classe e os dois talentos de nível 1.

## 4. Atributos

Seis atributos: FOR, DEX, CON, INT, SAB, CAR. Escala **1 → infinito**. Sem teto de 20.

**Geração (D&D clássico):**

1. Role **4d6, descarte o menor**, some os três. Faça isso seis vezes.
2. **Distribua à vontade** pelos seis atributos.
3. **Rerrole um** dos seis resultados (os 4d6 de novo) e fique com o novo número — mesmo que saia pior. É a válvula contra a ficha morta.

**Modificador:** `(atributo − 10) / 2`, arredondado para baixo.

| Atributo | 1 | 6–7 | 8–9 | 10–11 | 12–13 | 14–15 | 16–17 | 18–19 | 20–21 |
|---|---|---|---|---|---|---|---|---|---|
| Mod | −5 | −2 | −1 | +0 | +1 | +2 | +3 | +4 | +5 |

Exemplo de mesa: `7, 14, 11, 9, 6, 10`. Personagem mediano. O rerrol existe para não sair da criação odiando a ficha.

## 5. Pontos de Vida (nível 1)

```
HP = valor máximo do dado de vida
   + 2 dados de vida (rolados)
   + modificador de CON
   + bônus racial de HP (se houver)
```

O “valor máximo” é o número cheio do dado (Guerreiro 12, Espadachim 10, Ladino/Mago 6). Os dois dados são sorte. Isso substitui a antiga regra de ×3 — três dados soltos geravam deus ou mago mais duro que guerreiro; só o máximo sem dados gerava herói inchado demais. **Máximo + dois dados** foi o que sobreviveu ao teste.

**Exemplos (humano, +0 racial):**

- Guerreiro CON 14 (+2), 2d12 = 7 e 9 → `12 + 16 + 2 = 30 HP`
- Espadachim CON 12 (+1), 2d10 = 6 e 4 → `10 + 10 + 1 = 21 HP`
- Mago CON 12 (+1), 2d6 = 3 e 5 → `6 + 8 + 1 = 15 HP`

São esponjas. O mestre pode sentar a mão. Um mago de 6 HP na mesa de dois jogadores morre no primeiro crit — por isso o piso existe.

## 6. Vigor (e Mana)

Todo mundo tem **Vigor**. No mago, o Vigor *é* a Mana.

```
Tanque (Guerreiro / Paladino):     1d4 + SAB
Espadachim / Junco:                1d6 + SAB
Ladino:                            1d6
Mago (Vigor = Mana):               2d8 + INT (+ modificador racial, se houver)
```

Vigor alimenta técnicas de classe. Mana alimenta magias. Chegar a 0 deixa o personagem **Exausto**: desvantagem em testes físicos até um descanso curto ou longo.

Detalhe e custos: [atributos.md](./atributos.md) e [magia.md](./magia.md).

## 7. Foco

```
Foco máximo = Foco-base da classe + bônus racial + piso(nível / 3)
```

Nível 1, o `piso(nível/3)` é 0. Humanos +0, Anões +1, Elfos +2, Zacar +1, Maho +1 (chute), Meio-Zacar +0. Ver [atributos.md](./atributos.md) e [racas.md](./racas.md).

Começa a sessão com o máximo cheio.

## 8. Equipamento, CA, carga

- **Guarda (CA passiva)** = `10 + bônus da armadura`. DEX não entra aqui — DEX entra na Esquiva e na Postura de Defesa do Espadachim.
- **Carga:** `FOR × 5 × multiplicador de tamanho` **slots**. Espada gigante ocupa 3–5; alguns itens ocupam 0. Ver [inventario_e_itens.md](./inventario_e_itens.md).
- Anote arma (atributo de ataque: FOR ou DEX), armadura, um kit se houver (+2 em testes óbvios).

## 9. Lore

Um parágrafo. O mestre não precisa de romance. Precisa de um gancho e de alguém que essa pessoa não quer decepcionar.

## Checklist da ficha

- [ ] Nome, raça, classe, nível 1
- [ ] Seis atributos + modificadores
- [ ] HP atual / máximo
- [ ] Vigor (ou Mana) atual / máximo
- [ ] Foco atual / máximo
- [ ] Guarda (`10 + armadura`)
- [ ] Deslocamento
- [ ] Dois talentos de nível 1
- [ ] Arma, armadura, kit
- [ ] Uma frase de lore
