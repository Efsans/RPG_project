# Visual, relicário e dados 3D

Data: 24/08/2026  
Objetivo: sair da tela “dashboard Tailwind” e chegar no **nível de um VTT / site de RPG**, sem ainda depender de artes finais.

## O que “nível Roll20” realmente é

O Roll20 **dentro da sessão** também é utilitário (grid, painéis, cinza). O que parece “site de RPG” é o **cromo**:

- tipografia de pergaminho (display com serifa / cinzel), não sans de startup
- paleta de **madeira, latão, sangue, osso** — não zinc-900 genérico
- um **objeto ritual** no centro da ação (no Roll20: a bandeja de dados; aqui: o relicário)
- textura e vinheta; bordas de metal; pouco neon, pouco card arredondado idêntico

Artes desenhadas (rosto do demônio, mapas, tokens) entram **depois**, no mesmo encaixe. O padrão agora é o **material**; a arte só troca o SVG/PNG.

Não ornar o tabuleiro inteiro. O grid continua limpo. O teatro fica no relicário + overlay de dados.

## Padrão atual do app (código)

Tokens em `src/app/globals.css` (`--void`, `--brass`, `--blood`, `--bone`).  
Fontes: **Cinzel** (títulos) + **Source Serif 4** (texto).  
Peça: `src/components/dados/DemonRelicButton.tsx` + `ThreeDiceTray.tsx`.  
Laboratório: rota `/reliquia`.

Quando a arte chegar: substituir o SVG do rosto e, se quiser, as texturas das faces dos dados. Não redesenhar o layout.

## O botão (PC e celular)

Mesmo componente, dois tamanhos (`size="table" | "pocket"`).

1. **Aro dourado** — botão / moldura (latão).
2. **Anel vermelho** — esmalte que **gira** no idle (lento); no hover acelera; no clique dispara.
3. **Rosto de demônio cerrando os dentes** no miolo — placeholder SVG até a arte.

Interações previstas (não precisa todas no dia 1):

| Gesto | Efeito |
|---|---|
| Idle | Anel gira ~12s/volta, brilho fraco |
| Hover / toque |
| Clique | Anel dispara, relicário afunda, **cuspe** de dados |
| Segurar | Carga (escolhe d20 / 2d6 / etc. depois) |
| Resultado 20 / 1 | Anel sangra dourado ou negro |

No **PC** (mestre): relicário no centro da barra inferior da mesa.  
No **celular** (jogador): relicário no centro do HUD, polegar, acima da ficha — o tabuleiro não precisa ser o palco dos dados.

## Three.js vai ficar pesado?

**Não**, se os dados **não forem o app inteiro**.

Pesado: Three.js no mapa 24/7, sombras macias, física Cannon a 60 fps, 12 dados, `devicePixelRatio` 3 em celular.

Leve (o que o código faz):

- montar o WebGL **só na rolagem** (~2 s) e **destruir** cena, geometria, renderer
- 1–5 dados low-poly (icosaedro = d20)
- `setPixelRatio` limitado a 1.5
- sem física contínua; fundo transparente por cima da mesa
- se WebGL falhar → fallback 2D (placa de latão com o número)

Roll20 usa física 3D na **bandeja**, não no mundo. Foundry idem. Três amigos rolando de vez em quando cabe no celular médio.

Não use Three.js no grid. Tokens 2D. Dados 3D num overlay.

## Dados reais vs número cravado depois

**Não faça o dado “mudo” e só estampar o número no fim** como sistema principal. Parece caça-níquel, quebra a fé na rolagem.

**Faça isto (padrão de VTT de verdade):**

1. O número é sorteado **antes** (e no futuro: no servidor + broadcast). A física/animação **não decide** o resultado. Assim a mesa inteira vê o mesmo 17, sem dado preso na quina.
2. O mesh **já é um dado**: d6 com pips, d20 com números nas faces (textura). Durante o voo as faces existem; o olho não lê; na parada a face certa está para cima.
3. O “cravar” pode ser **tempero**: no pouso, um numeral de fogo/sangue **reforça** o que já está na face — não substitui.

Fase de arte: texturas 512px por tipo de dado (d4, d6, d8, d10, d12, d20). Até lá: icosaedro metálico + placa de resultado (honesto: o 3D é teatro, o número é a regra).

**Não use física para gerar o número.** Use física (ou um spin interpolado) só para **chegar** na rotação da face sorteada. Menos CPU, sync trivial, zero “caiu em pé”.

## Ordem de visual (não inverter)

1. Tokens + fontes + relicário (agora)
2. Overlay 3D que nasce e morre (agora, leve)
3. Sua arte no miolo e nas faces
4. Física opcional se a mesa pedir mais peso cinematográfico
