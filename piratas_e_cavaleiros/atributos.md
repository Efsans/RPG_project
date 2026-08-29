# Atributos, HP, Vigor e Foco

Seis atributos. Testes = `1d20 + modificador + bônus`. Modificador = `(atributo − 10) / 2`, para baixo. Escala **1 → infinito**: titãs e semideuses despertos passam de 20; aventureiro comum vive na casa dos 8–16.

A classe sugere um atributo-chave. Não exige mínimo. Mago de combate existe.

---

## Os físicos

### Força (FOR)
Músculo, carga, armas pesadas, atletismo bruto.

### Destreza (DEX)
Reflexo, armas rápidas, furtividade, pilotagem, **Esquiva**. Não entra na Guarda passiva.

### Constituição (CON)
HP a cada nível, veneno, doença, **Bloqueio**.

---

## Os mentais e sociais

### Inteligência (INT)
Estudo, mecanismos, portais, tecnologia a vapor. Atributo de mana do Mago (default de playtest).

### Sabedoria (SAB)
Percepção, sobrevivência, vontade. Defesa contra controle mental e ilusão. Alimenta o Vigor da maioria das classes marciais.

### Carisma (CAR)
Presença, liderança, intimidação, charme. O Ladino recebe +2 em testes de CAR. Classes inatas (quando existirem) puxam mana daqui.

---

## Pontos de Vida

### Nível 1

```
HP = máximo do dado de vida da classe
   + 2 dados de vida (rolados)
   + CON
   + bônus racial de HP
```

| Arquétipo | Dado de vida | Máximo (o número cheio) |
|---|---|---|
| Guerreiro, Paladino, tanques | d12 | 12 |
| Espadachim, Junco | d10 | 10 |
| Ladino | d6 | 6 |
| Mago | d6 | 6 |

Algumas classes futuras mudam o pacote. Esta tabela é a base da primeira rolagem.

### Níveis seguintes

Role **1 dado de vida + CON + bônus racial**. Sem máximo automático. Azar existe.

**Foco:** ao upar, o jogador pode gastar 1 Foco para **rerrolar** o dado de vida (fica com o novo resultado).

---

## Vigor

Reserva física e espiritual. Técnicas de classe gastam Vigor. No **Mago, Vigor = Mana**.

### Nível 1

| Arquétipo | Vigor |
|---|---|
| Guerreiro / Paladino / tanque | `1d4 + SAB` |
| Espadachim / Junco | `1d6 + SAB` |
| Ladino | `1d6` |
| Mago (mana) | `2d8 + INT` + modificador racial de mana |

Feiticeiro (quando existir) puxa **CAR**. Devoto puxa **SAB**. A raça não dá barra de MP sozinha — só modifica o ganho da classe. Sem ×3. Detalhe em [magia.md](./magia.md).

### Níveis seguintes

Role o dado de vigor da classe + o atributo correspondente (SAB marcial, INT no mago). Foco pode rerrolar, igual o HP.

### Gastar e zerar

- Habilidades de classe dizem o custo.
- **0 Vigor:** condição **Exausto** — desvantagem em testes de FOR, DEX e CON até um descanso curto (recupera 1 Vigor) ou longo (recupera tudo).
- Descanso curto: recupera Vigor igual ao dado da classe (role 1 dado, some SAB/INT se a classe somar). Descanso longo: cheio.

---

## Foco

Era “Impulso”. Mesma alma, nome novo: o combustível das ações heróicas, não da rotina.

### Máximo

```
Foco máx. = base da classe + bônus racial + piso(nível / 3)
```

**Base da classe (playtest, ainda no achismo do autor):**

| Arquétipo | Base |
|---|---|
| Marcial (Guerreiro, Espadachim, Junco, Ladino) | 3 |
| Conjurador (Mago) | 2 |

**Bônus racial (playtest):** Humano +0, Anão +1, Elfo +2. O resto se aprofunda depois.

Nível 3, 6, 9… o teto sobe +1, somado a qualquer modificador extra de classe/raça que aparecer na árvore.

### Recarga

- Descanso curto: **+1** (não passa do máximo).
- Descanso longo: **tudo**.
- O mestre ainda **dá** Foco por cena memorável, roleplay e ideia genial — e pode **tirar** como penalidade narrativa.

### Onde gastar (1 ponto, a menos que diga o contrário)

Declare **antes** dos dados, salvo a Segunda Chance.

1. **Boost.** Vantagem (rola 2d20, fica com o maior) **ou** +1 no modificador daquele teste **ou** um dado extra de dano. Uma opção por gasto.
2. **Esquiva afiada.** Na Esquiva: vantagem no `1d20 + DEX` **ou** trate o modificador de DEX como +1 maior nesta rolagem.
3. **Sorte no nível.** Rerrola o dado de vida (ou de vigor) ao upar.
4. **Segunda Chance Mortal.** Rerrola um teste que acabou de falhar — inclusive teste da Borda do Abismo.
5. **Heroísmo Narrativo.** Coisa que a ficha não cobre: magia de cena absurda, sacrificar o escudo contra morte instantânea, acrobacia de anime. O mestre precifica se 1 ponto basta.

### Falha Catastrófica

Se a Segunda Chance **também falhar**, o resultado é pior que um 1 comum. O mestre narra usando estes trilhos — não improvisa mais cruel nem mais mole:

- **Combate:** a arma trava, cai, ou o golpe erra e fere um aliado.
- **Social:** a outra pessoa percebe o blefe; algo no ambiente quebra a pose; a fala sai de um jeito que o outro interpreta ao contrário.
- **Exploração:** cai numa armadilha, se acidenta, quebra o item importante sem querer.

**Borda do Abismo:** se a Segunda Chance do teste de morte falhar, o personagem **morre**. Não é “mais uma falha”. É o fim. Ver [combate_e_morte.md](./combate_e_morte.md).
