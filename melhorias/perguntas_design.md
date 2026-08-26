# Perguntas de Design — Fechar o Livro (NPC / Piratas e Cavaleiros)

Objetivo: transformar o sistema de "sabe o que quer ser" em "sabe os números".
Cada pergunta traz um **padrão recomendado** (baseado em `mecanicas.md`) pra você
já levar um número concreto pro playtest. Você não precisa concordar — o padrão
existe só pra não travar a mesa. Depois do teste, a gente corrige e escreve no livro.

## Como usar este arquivo

1. Leia bloco a bloco. Onde concordar com o padrão, escreva `OK` em **Decisão**.
2. Onde quiser mudar, escreva o número/regra que você quer testar.
3. Rode 1 combate curto (2 heróis nível 1 vs 2–3 inimigos) usando suas decisões.
4. Volte aqui, anote o que doeu em **Playtest**, e me chame pra corrigir + escrever.

Legenda: 🎯 = decisão que trava outras · 🧪 = fácil de testar na mesa · 💤 = pode esperar

---

## BLOCO 0 — Escopo e Tom (decide o resto)

### 0.1 🎯 Até que nível vai a campanha?
Por que importa: define curva de XP, quantas encruzilhadas de talento, quão épico o "despertar" precisa ser.
Padrão: **1–10** (campanha média, cabe playtest real; 1–20 fica pra depois).
- Decisão:primeira coisa esse despertar foi uma falta de imterpretação da IA não sao despertares para todos é um tipo de raça que tem esse derpertar que por hora chamo de semi deuses, mas o despertar é exclusivo deles e depois eu explico mas o nivel maximo por hora vamos definir que a longo prazo é o nivel 20 e ao curto prazo apenas ate o 7-8
- Playtest:não tem como fazer um playtest mas acho que isso seria bom tanto para o desenvolvimento das habilidades quanto fazer elas no vtt

### 0.2 🎯 Qual o tom do combate?
Por que importa: muda CA, dano e número de turnos por luta.
Opções:
- (a) **Anime troca-golpe**: dano baixo, muitos turnos, defesa ativa brilha.
- (b) **Letal/tático**: dano alto, poucos turnos, um erro custa caro.
Padrão: **(a)** — combina com Impulso, Esquiva/Bloqueio e "protagonista ×3 HP".
- Decisão:eu quero algo balanceado punitivo mas pegando para um anime mas sem dano baixo os 3 dados sao para balancear mas eu vou testar com um mago de D&d como ficaria ele nivel 1
- Playtest:ele tirou no total mais uma contituiçao alta para um amgo de +1 10 de vida sem conat com 4 iniciais mas pode ser menos entao eu acho que isso torna as coisas mais dinamicas ja que sao apenas dois jogadores e um mago com 6 de vida seria foda (lembarndo isso vem do D&D 3.5 e nao das ediçoes mais recentes) e talvez daria ate para dicionar o dado inicial e ai esse mago teria 14 de vida 

### 0.3 Mesa fixa (1 mestre + 2 jogadores)?
Por que importa: balanceio de encontro é feito pra 2 heróis, não 4–5.
Padrão: **sim, 2 jogadores**.
- Decisão:sim sao dois jogadores apenas no maximo do maximo 3 mas nao conte com isso 

---

## BLOCO 1 — Atributos e Criação de Personagem

### 1.1 🎯🧪 Como se geram os 6 atributos?
Por que importa: o código hoje inventou `random×16+3`; o livro nunca disse o método.
Opções:
- (a) **4d6 descarta o menor**, 6 vezes, distribui à vontade (heróico, clássico).
- (b) **3d6 na ordem** (mais mortal/old school).
- (c) **Array fixo** (ex.: 15,14,13,12,10,8) — igualdade entre os 2 jogadores.
- (d) **Compra por pontos**.
Padrão: **(a) 4d6 drop lowest**, distribuição livre.
- Decisão:vamos de D&D classico 
- Playtest:joguei igaul d&d e temos 7,14,11,9,6,10 uma personagem medio mas vamos adicionar que pode rerolar um dos atributos para nao deixar frustante 

### 1.2 Escala e modificador confirmados?
Padrão: escala 1–20, modificador = `(atributo − 10) / 2` arredondado pra baixo (14 → +2). Igual à `atributos.md`.
- Decisão:1 a infinito ... e o resto ok ta certo

### 1.3 A distribuição é livre ou a classe força um mínimo?
Por que importa: evita mago com FOR 18 e INT 8 sem querer.
Padrão: **livre**, mas classe "sugere" atributo-chave (sem trava).
- Decisão: ok, podem fazer o mago de combate 

---

## BLOCO 2 — HP, MP e Progressão

### 2.1 🎯 Dado de Vida por classe
Por que importa: é a espinha do balanceio de sobrevivência.
Padrão de playtest:
| Classe | Dado de Vida |
|---|---|
| Guerreiro (tanque) | d12 |
| Espadachim | d10 |
| Junco | d10 |
| Ladino | d8 |
| Mago / conjurador | d6 |
- Decisão:(todos teram o dado como numero base de vida mais os dois dados por conta do balanciamento ja que né tres dados é muito)Guerreiro,paladino e tanqes no geral 2d12 + const|e um dado de vigor que é d4 + sab  junco e espadachim 2d10 + const | vigor d6 + sab  ladino 2d6 e vigor é d6 e magos 2d6 e vigor/mana 2d8 (com variaçoes mas essa é a base mas teremos mudanças para algumas classes mas para primeira rolagem esta balanceada e vigor é igual mana e é gasto em futuras habilidades) 
- Playtest:joguei com 3 dados e sem o numero inicial padrao e ou tinahmos um deus ou um guerreiro mais fraco que um mago , com o numero inicial padrao tinhamos personagens consistentemente fortes demais mais com dois dados ou o numero padaro reduzido pela metade fica mais ok e oque eu quero esponjas de dano que eu possa sentar a mao mas que teram atributos padroes de nivel um entao o padaro que gostei mais foi numeor padrao e dosi dados

### 2.2 🧪 HP nível 1 (Regra do Protagonista)
Padrão: `(Dado de Vida × 3) + mod CON` (+ bônus de raça, se houver). Já está no livro.
- Decisão: vamos mudar para o numero de um dado inteiro e dois dados de vida mais CONST e o bonus da raça se tiver 

### 2.3 HP nível 2 em diante: rola ou fixo?
Por que importa: rolagem é divertida na mesa mas gera azar; fixo é estável pro VTT.
Padrão: **média fixa do dado** (d10 → +6 e por aí) `+ mod CON`.
- Decisão:rolagem mais const mais bonus de raça se tiver ... vamso dar sorte ao azar mais se tiver pontos de foco ele pode rerolar o dado
- Playtest:joguei e é o padrao cavaleio pode upar 2 + 2 + bonus da raça mas se tiver foco pode rerolar (foco é aqueles pontos de esforço)

### 2.4 Bônus de HP por raça: fixo por raça?
Padrão: **traço de raça define** (ex.: Anão Puro +2 HP/nível; Humano +0). Fecha no Bloco 7.
- Decisão:isso bonus fixo por raça 

### 2.5 🎯 XP: como se sobe de nível?
Opções:
- (a) **Por marco** (missão concluída = 1 nível; combate difícil = fração).
- (b) **Tabela de XP clássica** (matar/objetivos somam pontos).
Padrão: **(a) por marco** pro playtest 1–5. Tabela vem depois se quiser.
- Decisão:eu queri começar por tabela mas uma mais generica como se fosse tipos , mostros da classe fraco =10XP cada mostro medio +20  mostro forte  ou boss 100 ou mais dai fazer uma tabelinha e tendo marcos itens encontardos ou missoes completas dao XP definido pela dificuldade da missao dai teremos uma tabelinah padaro bem simples mas livre para o mestre auterara mas ele sempre deve marcar o xp antes da missao começar ou antes da luta com inimigo nao é feito para ser feito nahora 
- Playtest:assim é mais facil de tyer uma base mas deixar o mestre brincar 

---

## BLOCO 3 — O Loop de Combate (coração do sistema)

### 3.1 🎯 CA Passiva (Guarda) — qual fórmula?
Problema atual: `8 + armadura` deixa DEX de fora; quem não reage vira saco de pancada.
Opções:
- (a) `10 + armadura + min(DEX, teto da armadura)` — familiar, teto nas pesadas. **(recomendada)**
- (b) `8 + armadura` só contra ataque que você **não viu**; contra ataque visto, Guarda = `10 + armadura` ou você reage.
- (c) Manter `8 + armadura` (só se o tom for anime de dano baixo — Bloco 0.2a).
Padrão: **(a)**.
- Decisão:ja que temos o sistema de esquivas vamos ficar com 10 mais armadura na CA 
- Playtest:

### 3.2 🧪 Iniciativa
Padrão: `1d20 + DEX`. Pode gastar 1 Impulso pra ir primeiro numa cena.
- Decisão:ok mas sem gastar impulso

### 3.3 🎯 Esquiva compete DEPOIS de ver o d20 do atacante?
Por que importa: se for antes, ninguém gasta reação.
Padrão: **sim** — o atacante rola, aí o alvo decide gastar reação pra Esquivar (rola `1d20 + DEX`, vira a CA daquele golpe).
- Decisão:ele decide antes do atacante atacar pois sem esquivar é a CA contra o atacante ao esquivar é os dados mais dex contra o atacante , ex meu ladino tem 1 de armadura entaop a CA dele é 11 muito baixa mas a dex é 14 etao ele vai rolar o dado e adi que entra a parte perigosa e genial se ele tirar 10 ele teria ainda 12 de defesa nesse truno sem dano entao quanto masi dex ele tem e habilidade que faciliatm a esquiva e bontos de foco que melhoram ela aumentando um nos posntos de atributo ou rolando dois dados e pegando o melhor valor ele ainda ta melhor que pura defesa entao dex vira defesa mas em caso que nao se pode esquivar que seriam ataques inesquivaveis ou estados que nao se pode esquivar 
- Playtest: eu testei de leve e achei mais dinamico e mais facil de entender e maisor risco e reconpensa pois voce ainda pode tirara um vinte e seu inimigo vai ter que tirara um vinte para te acertar 

### 3.4 🎯 Bloqueio reduz quanto?
Padrão: reação, rola `1d20 + CON` (ou FOR c/ arma pesada) e **subtrai do dano**. Usa CA base (não vira a CA como a Esquiva).
- Decisão:bloqueio é dado mais const porem voce leva metade do dano arredonado para cima se nao tiver um escudo ou armadura pesada 
- Playtest:testei e se todo mundo bloqueia ninguem esquiva mais entao bloqueio é feito para seres pesados

### 3.5 🧪 Crítico
Padrão: natural 20 → **dobra os dados de dano** (mod não dobra). Fácil de programar no VTT.
Pergunta extra: existe falha crítica no natural 1? Padrão: **não** por regra fixa; o mestre narra.
- Decisão:simplesmente o basico 20 da o dobro de dano e 1 é falha critica

### 3.6 Ataque completo: quantos ataques por Ação Principal no nível 1?
Padrão: **1** (ataques extras viram talento de árvore mais pra frente).
- Decisão:isso perfeito

---

## BLOCO 4 — Testes fora de combate (sem perícias)

### 4.1 🎯 Tabela de CD oficial
Padrão:
| CD | Significado |
|---|---|
| 8 | Rotina sob pressão leve |
| 12 | Desafio normal de aventureiro |
| 16 | Difícil / especializado |
| 20 | Heroico |
| 24 | Lendário / precisa Impulso |
- Decisão:perfeieto da para melhorar essa tabela mas essa base ta boa
- Playtest:é o padrao no teste 

### 4.2 🧪 "Kit" dá +2?
Por que importa: recompensa quem tem a ferramenta/treino óbvio, sem virar lista de perícias.
Padrão: **sim, +2** se o personagem tem tag óbvia na ficha (ferramenta/treino). Não é perícia nomeada.
- Decisão:perfeito 
- Playtest:nem precisa testar

---

## BLOCO 5 — Pontos de Impulso

### 5.1 🎯 Teto de Impulso no nível 1 (por arquétipo)
Padrão de playtest:
| Origem | Impulso máx. nível 1 |
|---|---|
| Humano versátil | 3 |
| Marcial (Guerreiro/Espadachim/Junco) | 3 |
| Conjurador | 2 |
| Raça "sangue quente" (Orc, Fogo) | +1 |
- Decisão:serao bonus de foco por raça humanos é zero , anoes 1, elfos 2 etc depois a gente se aprofunda nisso depois mas as classes terao foco base dai 
- Playtest:essa eu to no achismo

### 5.2 O teto cresce com nível?
Padrão: **+1 a cada 3 níveis** (chute pra testar).
- Decisão:isso mais modificadores de classes e raças
- Playtest:NT (nao testado)

### 5.3 🧪 Recarga
Padrão: descanso curto recupera **1**; descanso longo recupera **tudo**; mestre ainda dá ponto por cena memorável.
- Decisão:isso mesmo

### 5.4 Falha Catastrófica (Segunda Chance que falha) — 3 exemplos concretos
Por que importa: se o mestre improvisar, pode ser injusto ou fraco demais.
Preencher 1 exemplo por pilar:
- Combate:a arma se prender ou ser derrubada ,um tropeço ou falha ridicula como errar e fazer algo que feerre o proprio time 
- Social:a pessoa sabe que o outro esta metendio , algo acontece que ferra a pessao que esta falando e ela interaje de forma que o outro nao entende 
- Exploração:encontarar armadilha , se acidentar e quebara algo importante sem querer

---

## BLOCO 6 — Borda do Abismo (Morte)

### 6.1 🎯 Protocolo público vs secreto
Padrão:
- A 0 HP: estado **Morrendo**, 1 ação limitada/turno (rastejar, poção, falar).
- Rola d20 vs CD **anunciada naquele turno**.
- **3 falhas públicas** no máximo; mestre pode ter número menor **secreto**.
- Cura acima de 0 tira de Morrendo.
- Decisão:isso mas a ação noa é limita a essas é uma açao principal seja andar ou atacar mas se pode atacar tudo com dificuldade a pessoa so morre com tres falhas  mas a cura é dano exedente ... a não ser que a pessoa tenha mais da metade da vida em ferimeto ai é morrendo morrendo mesmo , se alguem tiver kit medico ou souber cura pode estabilizar sem precisar curar o dano exedente , e uma outra mecanica mais da metade da vida em dano perde membro ou ganah umadano do caralho e entra em morrendo mais ai sim mais de 0 de cura levanta com a vida que sobra 

### 6.2 Impulso compra rerrolagem de morte?
Padrão: **sim**, mas se a rerrolagem falhar → Falha Catastrófica (Bloco 5.4).
- Decisão:isso se rerolar e errar morre com 1 natural morre na hora a nao ser que esteja sendo curando masi essa segunda parte é um segredo
- Playtest:testei e morri depois de 6 turnos com dua falhas seguidas no começo entao tensao total é assim que eu quero e se eu acertace ia aumentando minha vida ate o infinito 

### 6.3 VTT: campo `death_fails_secret` invisível ao jogador?
Padrão: **sim** — jogador só vê falhas públicas.
- Decisão: isso eu mexo nesse campo avontade e o jogador nao ve ele de enm uma forma 

---

## BLOCO 7 — Classes (escrever antes de codar botão)

### 7.1 🎯 Quantas classes no "lançamento" do playtest?
Padrão: **4** — Espadachim (assinatura), Guerreiro, Mago, Ladino. Junco entra depois.
- Decisão:blz eles serao as bases e o resto vira deles igaul D&D

### Espadachim (prioridade — é a assinatura)
Primeiro: apagar "Capitão" dos doc de regras pois ele é um personagem na lore que é um espadachin

#### 7.2 🎯 Dado de vida do Espadachim
Padrão: **d10**.
- Decisão: 10 mais 2D10

#### 7.3 🎯 Marcas — como ganha e teto
Padrão: ao acertar com arma leve/rápida, **+1 Marca** no alvo. Teto **5**.
- Decisão:isso é uam arma de um personagem e nao da classe  enato ignore... o espadachin tera apenas a habilidade de aparar ele pode com uma reação atacar o ataque do adiversario para diminuir o dano
- Playtest:NT

#### 7.4 🎯 "Explodir" — fórmula do dano
Problema: o HANDOVER usava `marcas × (1+INT) × 2`, que puxa INT num durão de DEX.
Opções:
- (a) `marcas × dado da arma`
- (b) `marcas + DEX` (mais estável)
- (c) manter INT só se for "espadachim analista de duelo"
Padrão: **(a) marcas × dado da arma**.
- Decisão:outra habilidade para a classe e nao personagem , habilidade e essas sao para escolher ele tem a habilidade de contra ataque se o inimigo errar poder gastar uma reação para dar um contra ataque
- Playtest:NT

#### 7.5 🎯 "Olho" — escolher UM efeito
Por que importa: hoje é um toggle vazio.
Opções: (a) enxerga fraqueza → +2 acerto no alvo marcado · (b) amplia crítico (19–20) · (c) vê HP/estado do alvo.
Padrão: **(a)**.
- Decisão: de novo literal a lore de um personagem , postura de defesa gasta uma ação principal para entara em postura de defesa e adicionar a dex na CA ai fica CA + armadura + DEX
- Playtest:NT

#### 7.6 Contra-ataque (reação extra)
Padrão: nível 3, 1×/rodada, quando esquiva com folga (≥5) devolve dano leve.
- Decisão: refiz essa habilidade

### Guerreiro / Mago / Ladino (resumo, não copiar 5e inteiro)
#### 7.7 Cada um: dado de vida + 2 talentos nível 1 + 1 encruzilhada no nível 3?
Padrão: **sim**, esse formato mínimo.
- Guerreiro (ideia de traço nível 1):se de armadura reduz o dano em 2 permanentemente, da mais 1d4 de dano corpo a corpo
- Mago (idem):assinatura arcana escolhe um elemnto e gast menos 1 de mana para conjurara essas magias, ele sente passivemnte a media da vida de um oponente (eu separo truques como mensagem de talentos esses eu considero magias)
- Ladino (idem):tem bonus em testes de char (+2), pode agarrar um inimigo se for pego de forma furtiva e contra um teste de const do inimigo agarrado ele pode desmaiar o inimigo se ele errar uma vez mas se acertar uma vez eel se liberta

### Junco (💤 pode ficar pra depois do 1º playtest)
#### 7.8 Fantasia em 1 frase + recurso + dado de vida
Padrão: samurai; recurso **Postura** (troca de postura = bônus situacional); d10.
- Decisão:mobilidade e dano em area com golpes fortes de espada e tecnicas e posturas igual o espadachin que dao habilidades no combate

---

## BLOCO 8 — Raças (templates, não hardcode)

### 8.1 🎯 Quais raças jogáveis no playtest?
Padrão: **Humano + 1 exótica** (Raça do Fogo OU Povo-Lagosta). Gigante/Deus só como NPC.
- Decisão:maho(uma raça que vamos falar melhor deposi ), humano, elfo , zacar(uma raça de guerreiros feitos para o combate ), anão e meio zacar

### 8.2 Template mínimo de raça (o que toda raça preenche)
Padrão de campos:
- deslocamento
- tamanho / multiplicador de carga (humano 1, grande 2, gigante puro 4)
- +HP ou +MP por nível
- 1 traço de nível 1
- 1 nó de "Despertar" (nível 5+), vazio até chegar lá
- Decisão:ok, so mudaria o mp é por classe mas a raça que pode ter um modificador para ganho de mp, e o traço é para raças expecificas,e o despertar é para algumas raças e nao vamos falar de despertar mas sim um bonus de nivel , exemplo os maho no nivel dois ganahm um traço a mais e vai melhorando esse traço ao nivei ganhando novos, esse depertar vamos chamar de habilidades de raça algumas raças ganahm habilidades por nivel 

### 8.3 Origens/Variantes: quantas por raça no playtest?
Por que importa: evita virar 40 origens humanas (overdesign).
Padrão: **no máximo 2 origens** por raça agora.
- Decisão:3 por raça ... mentira vamos deixar nas duas mas algumas raças eu faço a terceira 

---

## BLOCO 9 — Inventário e Carga

### 9.1 🎯 Fórmula de carga
Padrão: `capacidade kg = FOR × 5 × multiplicador de tamanho`. Sobrecarga = sem reação + deslocamento pela metade.
- Decisão:perfeito
- Playtest:igual D&D e é a melhor escolha

### 9.2 Peso real em kg ou slots?
Por que importa: kg é imersivo mas dá contabilidade; slots é rápido no VTT.
Padrão: **kg** (já está no livro), mas aberto a mudar pra slots se irritar na mesa.
- Decisão:vamso por slot dai podemos mudar um pouco a formula de carga ou falar que um aespada gigante ocupa 5 slots ou 3 dependendo ja que dois de força dao 10 slots 
- Playtest:acho que slots por kg e ter itens que nao ocupam slots seja a mlhor soluçaõ

---

## BLOCO 10 — Magia e Mana

### 10.1 🎯 Fórmula de Mana pro playtest (unificar as 2 verdades do livro)
Padrão:
- Só conjuradores têm MP.
- Nível 1: `dado de magia da classe + mod (INT/SAB/CAR conforme a classe)`.
- **Sem ×3** no MP (o ×3 é fantasia de sobrevivência, não de spam).
- Decisão:isso e as magias ja vao estar meio que vinculadas as tipos de classe entao as magias que vao carregar o modificador  tipo bola de fogo é do mago e usa int ja controle de fogo do ferticeiro é mais versatila usa mp conforme o desejo dele e usa Car
- Playtest:NT

### 10.2 🎯 Custo das magias (anti "mago inútil" e anti "mago metralhadora")
Padrão:
- Truque/cantrip: **0 MP**, dano pequeno.
- Magia de combate padrão: **2–4 MP**.
- Magia de cena grande: **Impulso + MP**.
- Decisão:magia padrao 1-4 de mp , maagias narrativas mp por uma tabela e magias potencializadas gastam foco (que é o impulso agora)
- Playtest:

### 10.3 Qual atributo puxa mana por classe?
Padrão: Mago → INT; devoto/espiritual → SAB; inato/bardo → CAR.
- Decisão:isso

### 10.4 💤 De onde vem a mana neste universo? (lore, 1 página)
Por que importa: não trava o VTT, mas define a identidade do mago. Portais? Estrelas? Sangue de semideus?
- Ideia inicial:ta temos a fonte de toda a magia que se perdeu como acesala pois o grande conselho burocratizou a magia ... entao magos sao obrigados a usar 102 selos e runas diferentes em ordem diferentes para utilizar saus magia como um id de magia porem menos travado (é isso que seria aqueles ciculos magicos que ops magos invocam antes de lançar uma magia) porem a outras formas de acessar a magia utilizando elemnto naturais coma mana que op corpo produz , capturando resquisios de magia dop ambinete e moldando como bem entender ou utilizando uma fonte externa coma a natureza outro ser com magia ou a alma .. que é um conceito que almas sao a esencia da mana em forma concienet e elas afetao o plano fisico e utilizadas de certyas formas (como o olho do capitao que é a sunjao das almas de um povo inteiro), existem runas perdidas e antigas que dao acesso mais direto a grande fonte de mana e runas que sao feita com p´re feitiços com uma runa de fogo que é carregada com uma tramutação de mana em fogo , as escolas de magias seguem a base do D&D com a diferença que ela nao sao ficças no mago mas magias de magos sao mais regradas com pouca variação a não ser que a ruas os simbolos/runas sejao recombinados para melhorara a magia , basicamenet a milenios exitiu um conselho que colocou regras na magia na sua base e ninguem ams sabe desfazer isso e toda a magia que existe cresceu a partir disso 

### 10.5 Escolas de magia: manter rótulo D&D temporário?
Padrão: **sim**, rótulo temporário; lore própria vem depois.
- Decisão:sim a base é a mesam mas vem de um local diferente 

---

## Fora de escopo por agora (não gastar energia)
- Física naval completa · 40 origens humanas · árvore visual de 80 nós ·
  economia/marketplace de moedas · balancear Gigante Puro no nível 1 (o Despertar resolve)(por mai sque um gigante puro nao seja jogavel ).

---

## Depois que você preencher
Me devolve este arquivo (ou só os blocos com 🎯). A ordem que vou escrever no livro:
1. Loop de combate + CA + CD → `combate_e_morte.md` + `INDEX.md`
2. Impulso (números) → `INDEX.md`
3. HP/XP 1–5 → `classes_e_progressao.md`
4. Espadachim → novo `classes/espadachim.md`
5. Mana playtest → `atributos.md` + `notas_de_design.md`
6. Carga → `inventario_e_itens.md`
7. Junco + Guerreiro/Mago/Ladino resumidos
8. Atualizar `INDEX.md` (hoje mente sobre o que está pendente)
