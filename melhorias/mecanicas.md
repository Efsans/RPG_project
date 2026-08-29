# Melhorias de Mecânicas — Piratas e Cavaleiros

Livro atual: `../piratas_e_cavaleiros/`.  
Isto **não** reescreve o sistema. Fecha buracos para a mesa e para o VTT.

## O que já está bom (não mexer na filosofia)

- d20 + atributo, sem lista engessada de perícias.
- Impulso como combustível heróico (vantagem / reroll perigoso / narrativa).
- Defesa ativa: Esquiva (DEX) e Bloqueio (CON/FOR).
- Economia de ações estilo D&D + reação valorizada.
- HP de protagonista no nível 1 (×3).
- Árvores semi-lineares em vez de spell list livre.
- Raças épicas “despertam”; não começam titãs no nível 1.
- Borda do Abismo narrativa, CD ditada pelo mestre.

## Números para fechar (sessão de design)

Cada item precisa de **uma frase + um exemplo** no livro. Sem isso o VTT chuta.

### 1. CA Passiva (Guarda)

Hoje: `8 + bônus da armadura`.

**Problema:** DEX não entra; sem reação o personagem é um saco de pancada. Armadura vira o único “não ser acertado”.

**Propostas (escolher uma):**

- **A (recomendada):** `10 + armadura + min(DEX, teto da armadura)` — familiar, teto nas pesadas.
- **B:** `8 + armadura` só contra quem você **não viu**; contra ataque visto, ou reage ou leva na Guarda `10 + armadura`.
- **C:** manter 8+armadura se o combate for “anime de troca de golpe” e o dano vier baixo.

Escreva a escolha em `INDEX.md` e `inventario_e_itens.md`.

### 2. Tabela de CD

Sem perícias, o mestre precisa de âncora:

| CD | Significado |
|---|---|
| 8 | Rotina sob pressão leve |
| 12 | Desafio normal de aventureiro |
| 16 | Difícil / especializado |
| 20 | Heroico |
| 24 | Lendário / Impulso narrativo |

Opcional: **kit** (+2) se o personagem tem ferramenta/treinamento óbvio (não é perícia nomeada; é tag na ficha).

### 3. Impulso — teto e recarga

Definir por arquétipo, exemplo:

| Origem | Impulso máx. nível 1 |
|---|---|
| Humano versátil | 3 |
| Classe marcial (Guerreiro/Espadachim/Junco) | 3 |
| Conjurador | 2 |
| Raça “sangue quente” (orcs, fogo) | +1 |

Recarga: descanso curto recupera 1; descanso longo recupera tudo; mestre ainda pode **dar** ponto extra por cena memorável (já está no livro).

Segunda Chance: se o reroll falhar → Falha Catastrófica. **Escrever 3 exemplos** (combate, social, exploração) para o mestre não improvisar pior que a falha.

### 4. Mana (pendência oficial)

`notas_de_design.md` diz “revisar depois”. `atributos.md` já dá fórmula. Unificar.

**Proposta para playtest:**

- Só classes conjuradoras têm MP.
- Nível 1: `(dado de magia da classe) + modificador (INT/SAB/CAR)`.
- Sem ×3 no MP (o ×3 é fantasia de sobrevivência, não de spam de magia).
- Cantrip / truque: 0 MP, dano menor.
- Magia de combate padrão: 2–4 MP.
- Magia de cena ( Impulso + MP ): o “heroísmo narrativo” do Impulso.

Isso atende o medo do mago inútil **e** o medo do mago metralhadora.

### 5. Progressão e XP

Falta tabela. Para campanha curta (1–10) ou longa (1–20)?

**Playtest rápido:** níveis 1–5 com XP por marco (missão = 1 nível, combate difícil = fração). Não precisa da curva 5e no dia um.

HP após nível 1: confirmar se usa **média do dado** (mais estável no VTT) ou rolagem na mesa.

### 6. Combate — ordem e ataque

Escrever o loop em `combate_e_morte.md`:

1. Iniciativa: `1d20 + DEX` (ou + Impulso declarado).
2. Atacar: `1d20 + atributo da arma` vs **Guarda** do alvo.
3. Alvo **pode** gastar Reação: Esquiva (substitui CA por rolagem) **ou** Bloqueio (reduz dano).
4. Dano: dado da arma + atributo.
5. Crítico: natural 20 → dobra dados de dano (clássico, fácil de programar).

Decidir: Esquiva compete com a rolagem de ataque **depois** de ver o d20 do atacante? (recomendado: sim, senão ninguém gasta reação.)

### 7. Borda do Abismo — protocolo honesto

Manter o segredo do mestre, mas **publicar as regras que o jogador conhece**:

- A 0 HP: estado Morrendo; 1 ação limitada por turno (rastejar, poção, falar).
- Rola d20 vs CD anunciada **naquele turno**.
- 3 falhas visíveis no máximo; o mestre pode ter um número menor **secreto**.
- Cura acima de 0 tira de Morrendo.
- Impulso **pode** comprar uma rerrolagem de morte, com o risco catastrófico já definido.

Opcional VTT: o mestre tem um campo `death_fails_secret` que o jogador não vê; o jogador só vê falhas públicas.

### 8. Carga

Fórmula simples: `capacidade kg = FOR × 5 × multiplicador de tamanho` (humano 1, grande 2, gigante puro 4). Sobrecarga: sem reação + deslocamento pela metade. Fecha `inventario_e_itens.md`.

## Classes — o que escrever antes de codear botões

### Espadachim (prioridade; é a assinatura)

Tirar “Capitão” de todos os docs de produto.

Kit mínimo nível 1–3:

- Dado de vida (sugestão: d10 — mais duro que ladino d8, menos que guerreiro d12 se guerreiro for tanque).
- Marcas: ao acertar com arma leve/rápida, +1 Marca no alvo (máx. 5?).
- Estocada: ataque DEX.
- Explodir: gasta as marcas; dano `marcas × (algo)`. A fórmula `marcas × (1+INT) × 2` no HANDOVER puxa INT num durão de DEX — **revisar**. Alternativas: `marcas × dado da arma` ou `marcas + DEX`. INT só se for “espadachim estudioso / duelo analítico”.
- Olho: toggle de classe (visão, crítico, ou “ver fraqueza”) — definir **um** efeito, não um botão vazio.
- Contra-ataque: reação extra restrita (já citado no INDEX).

### Junco

Uma frase de fantasia + um recurso (Postura? Honra?) + dado de vida. Sem isso, não aparece no VTT.

### Guerreiro / Mago / Ladino

Não copiar 5e inteiro. Cada um: dado de vida, 2 talentos de nível 1, 1 encruzilhada no 3.

## Raças no VTT

Concordo com “não hardcodar no código”. Precisa de **template** no painel do mestre:

- deslocamento
- tamanho / multiplicador de carga
- +HP ou +MP por nível
- 1 traço nível 1
- 1 nó de Despertar (nível 5+), vazio até a campanha chegar lá

Playtest com **Humano + 1 raça exótica** (Lagosta ou Fogo). Gigantes/Deuses só como NPC até a árvore existir.

## Magia e lore

Escolas D&D como **rótulo temporário** está ok. Antes da segunda sessão, uma página: de onde vem a mana neste universo (portais? estrelas? sangue de semideus?). Isso não bloqueia o VTT; bloqueia a identidade do mago.

## O que não melhorar agora (overdesign)

- Simular física naval completa.
- 40 origens humanas.
- Árvore visual com 80 nós.
- Economia de moedas e marketplace (o HANDOVER já vetou).
- Balancear Gigante Puro vs Humano no nível 1 — o Despertar já é a resposta; só não acordar o colosso cedo.

## Ordem de escrita no livro

1. Loop de combate + CA + CD (`INDEX` + `combate_e_morte`)
2. Impulso números (`INDEX`)
3. HP/XP 1–5 (`classes_e_progressao`)
4. Espadachim 1 página nova `classes/espadachim.md`
5. Mana playtest (`atributos` + notas)
6. Carga (`inventario`)
7. Junco + Guerreiro resumidos
8. Atualizar INDEX (hoje mente sobre o que está pendente)
