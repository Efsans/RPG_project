# Combate, Defesa Ativa e a Borda do Abismo

O combate é reativo. Ficar parado na Guarda é possível — e é como se toma porrada. Esquivar e bloquear são decisões com preço: **uma Reação por rodada**.

---

## Economia de ações (o turno)

No seu turno você tem:

| Ação | O que é | Exemplos |
|---|---|---|
| **Principal** | O ato de peso | Atacar (1 ataque no nível 1), conjurar magia de combate, entrar em Postura de Defesa, talento pesado |
| **Secundária** | Ato menor | Andar o deslocamento, usar item (depende do item — poção em geral é secundária; item tático pesado pode ser principal) |
| **Livre** | Sem custo real | Falar uma frase, soltar o que está na mão |
| **Reação** | Fora do seu turno, **1 por rodada** | Esquiva, Bloqueio, Aparar, Contra-ataque — você escolhe **quando alguém vai te atacar** |

Habilidades de classe e Foco podem conceder reações extras. Sem isso, uma.

**Iniciativa:** `1d20 + DEX`. Empate: quem tiver DEX maior; se persistir, o mestre decide. Foco **não** compra o primeiro lugar.

---

## A Guarda (CA passiva)

```
Guarda = 10 + bônus da armadura
```

DEX não entra. Quem não reage é acertado contra esse número. DEX vira defesa **quando você Esquiva** (ou quando o Espadachim entra em Postura).

---

## O loop de um ataque

1. O atacante declara o alvo.
2. O alvo, se ainda tem Reação, **escolhe agora** (antes dos dados do atacante):
   - nada (o golpe vai contra a Guarda);
   - **Esquiva**;
   - **Bloqueio**;
   - habilidade de classe (Aparar, etc.).
3. Resolve conforme a escolha.
4. Se acertou, rola dano: dados da arma + atributo da arma (FOR ou DEX).
5. Aplica redução de dano (RD) **depois** de crítico, metade de bloqueio, etc.

**Nível 1:** uma Ação Principal = **um** ataque. Extra vem da árvore.

### Crítico e falha crítica

- **Natural 20** no d20 de ataque: acerta, **dobra os dados de dano**. Modificador não dobra.
- **Natural 1:** falha crítica. O mestre narra (arma trava, cai, se expõe). Não é tabela — é pior que errar.

Ataques **inesquiváveis** (magia de área, explosão, estado que impede movimento) ignoram Esquiva. O alvo ainda pode tentar Bloqueio se o mestre disser que o corpo aguenta o tranco.

---

## Esquiva (Reação)

Você decide **antes** do atacante rolar. Sem Esquiva, o d20 dele compete com a Guarda. Com Esquiva, compete com o **seu** dado.

```
Atacante: 1d20 + atributo da arma
Defensor: 1d20 + DEX
```

Se o defensor **igualar ou superar**, o golpe erra. Se perder, toma o dano.

**Por que é perigoso e bom:** um ladino com armadura +1 tem Guarda 11 — lixo. DEX 14 (+2): um 10 no d20 vira defesa 12 naquele golpe. Um 20 obriga o inimigo a tirar 20. Foco e talentos empurram isso (vantagem, +1 no mod). Sem Reação, ou sob ataque inesquivável, sobra a Guarda 11.

**Exemplo:** Goblin ataca o ladino. O ladino declara Esquiva. Goblin tira 14 + 3 = 17. Ladino tira 10 + 2 = 12. Acertou. Se o ladino tivesse ficado na Guarda 11, o 17 também acertava — a Esquiva só vale quando o dado colabora.

---

## Bloqueio (Reação)

Feito para gente pesada. Se todo mundo bloquear, ninguém esquiva — e o bloqueio sem armadura quase não vale a pena. Essa é a intenção.

```
Teste: 1d20 + CON  contra a CD do golpe
```

A CD é a dificuldade do tranco, anunciada pelo mestre **naquela tacada** (use a tabela de CD: 12 um golpe normal, 16 um pesado, 20 um destrolhador). Constituição baixa contra CD alta = você leva.

- **Falha:** dano completo.
- **Sucesso:** metade do dano, **arredondado para cima** (4 → 2; 5 → 3; 100 → 50).
- **Depois** aplica RD (o Guerreiro de armadura tem RD 2 permanente).

**Por que escudo / armadura pesada importam:** o bloqueio “nu” transforma 4 em 2 — quase inútil, e você queimou a Reação. Com RD 2, aqueles 2 viram **0**. Cem de dano ainda são 50 — você sobreviveu ao destrolhador, não ficou imune.

Quem não tem escudo nem armadura pesada **pode** bloquear. Raramente deveria.

**Bloqueio não vira a CA.** O ataque ainda precisa acertar a Guarda (ou a Esquiva, se você tivesse esquivado — mas você não tem duas reações). Na prática: se você bloqueia, o atacante rola contra a Guarda; se errar a Guarda, o bloqueio nem entra; se acertar, aí você testa CON para cortar o dano.

> Se o mestre preferir um único rolo, pode fundir: o atacante já acertou (declarou um número), o bloqueio só disputa a CD. Na dúvida, use os dois passos — acertar e depois reduzir.

---

## Dano Massivo

Golpe único que causa **mais de 75% do HP máximo** do alvo.

Exemplo: Guerreiro com 20 de HP máximo toma 16 num único hit. É Dano Massivo.

Efeito imediato:

1. O personagem entra em **Morrendo** (Borda do Abismo), **mesmo que ainda tivesse HP** — o HP restante vira 0 para o estado, mas **não há dano excedente**.
2. Ganha uma **Marca de Ferimento** (cicatriz, membro comprometido, corte fundo — o mestre marca na ficha; é lore que vira −1 em algo até tratamento, não uma árvore de 40 lesões).
3. **1 ponto de cura** tira de Morrendo e devolve ao combate com o HP curado (porque não há excedente para pagar).

Dano Massivo não substitui a Borda: você ainda faz testes de morte se ninguém curar. Só muda a conta da cura e deixa marca.

---

## A Borda do Abismo (Morrendo)

Cair a **0 HP** por dano comum (não Massivo) põe o personagem em **Morrendo** e registra **dano excedente**.

**Excedente:** o que passou de 0. Tinha 5 HP, tomou 13 → fica a 0 com **8 de excedente**.

### O que o jogador sabe

- Continua no combate. Não é necessariamente inconsciente.
- No turno, ainda tem **Ação Principal** (andar, atacar, o que a ficha permitir). Tudo sai **mais difícil**: testes e ataques sofrem **−4** (o mestre pode, em vez disso, subir a CD em 4 — escolha uma e mantenha).
- **Uma vez por turno**, no início do turno, rola **1d20 contra a CD anunciada naquele turno** (o mestre diz o número em voz alta: “o frio sobe pelas pernas, precisa de 17”).
- **Falha:** +1 falha pública. **3 falhas públicas = morte.**
- **Sucesso:** você não morre agora. Só isso. Sucessos **não** acumulam para “acordar”. Três sucessos não te levantam. Você pode ficar Morrendo **para sempre**, turno após turno, enquanto acertar os testes — até errar três vezes.
- **Cura comum:** primeiro paga o excedente; o que sobrar vira HP. Sair de Morrendo exige HP **1 ou mais**. Curar exatamente o excedente deixa em 0, ainda Morrendo, só sem dívida.
- **Kit médico / habilidade de cura / alguém que “sabe curar”:** pode **estabilizar** sem zerar o excedente. Estabilizado = 0 HP, sem testes de morte, frágil. Qualquer dano novo devolve a Morrendo (o excedente antigo continua até ser curado).
- **Foco** pode comprar Segunda Chance no teste de morte. Se a rerrolagem falhar, **morre** (Falha Catastrófica letal).

### O que só o mestre vê

O jogador **não lê** o resto desta subseção na ficha. No VTT isso é o campo `death_fails_secret`.

- O mestre pode ter um número de falhas **menor que 3**, secreto. O jogador só vê as falhas públicas.
- **Natural 1** no teste de morte: morte na hora — **a menos que alguém esteja curando naquele instante**. Essa exceção é segredo. O jogador não deve otimizar em cima dela.
- O mestre mexe no campo secreto à vontade. O jogador não vê de forma nenhuma.

---

## Condições rápidas

| Estado | Efeito |
|---|---|
| Morrendo | 0 HP, −4 nas ações, testes de morte, 3 falhas = fim |
| Estabilizado | 0 HP, sem testes de morte; dano → Morrendo de novo |
| Exausto (0 Vigor) | Desvantagem em FOR/DEX/CON |
| Sobrecarga | Sem Reação; deslocamento pela metade |
| Marca de Ferimento | Traço narrativo + penalidade leve até tratar |
