# 🎲 Mesa Virtual RPG - Handover (Resumo do Projeto)

Este documento resume o estado atual da Mesa Virtual RPG (VTT) privada, construída sob medida para 3 pessoas (1 Mestre, 2 Jogadores). Use este arquivo como contexto principal para qualquer IA que for continuar o desenvolvimento.

## 🏗 Arquitetura Atual
- **Frontend / Framework:** Next.js 15+ (App Router), React, TypeScript, TailwindCSS.
- **Backend / Realtime / DB:** Supabase. **Não há servidor Node.js/Socket.io dedicado**. Todo o estado ao vivo é feito via `Supabase Realtime (Broadcast)`.
- **Hospedagem Alvo:** Vercel (Frontend) + Supabase (Backend/Database gratuito).

## 🚀 O que já está funcionando (MVP Fase 1)
1. **Conexão em Tempo Real:** 
   - Supabase configurado (chaves presentes no `.env`). 
   - Sincronização de Tokens ativa usando canais (`supabase.channel("table-1")`).
   - Drag and drop de tokens funcionando, com envio de coordenadas x/y em tempo real para os clientes.
2. **Interface Base:**
   - Tela de "Login" seca, definindo papel (`dev` = Mestre, `cliente` = Jogador).
   - Sidebar do Mestre (permite adicionar "bolas" pretas e vermelhas arrastando para o grid).
   - Área de grid responsiva para desktop e mobile.
3. **Suporte Mobile (Rede Local):**
   - O `package.json` foi configurado para rodar `next dev -H 0.0.0.0` e `next start -H 0.0.0.0`, permitindo acesso por IP local.
   - Foram corrigidos os botões (`onClick`, `touchAction: 'manipulation'`) para dispositivos touch screen.
   - **Importante:** Para testar no celular via rede local, é necessário rodar `npm run build` e depois `npm run start`, pois o modo dev (`Turbopack`) bloqueia o WebSocket de hidratação na porta do celular.

## 🗄️ Esquema do Banco de Dados (Supabase)
O banco foi configurado com RLS permissivo (focado em mesa privada) e as seguintes tabelas e buckets já existem:
- `rooms`: Salas da partida.
- `characters`: Fichas com stats de RPG (HP, Força, Destreza, atributos, URL de token).
- `map_states`: Estado fixo do mapa (grid, background).
- `storage.buckets`: Bucket `media` público criado para imagens, sons e vídeos.

## 🎯 Próximos Passos Sugeridos
1. **Evolução do Tabuleiro:** O tabuleiro atual usa simples `div` com posição absoluta. O próximo passo é fazer as fichas "snaparem" num Grid real, trocar as cores sólidas pelas imagens enviadas para o bucket `media`, ou talvez migrar a área do grid para `react-konva` para melhor performance 2D (FOW - Fog of War).
2. **Sistema de Fichas (Sheet):** Criar o componente de Fichas que vai puxar e editar os dados da tabela `characters` (HP atual, máximo, rolagem de dados baseada em atributos).
3. **Mídia Sincronizada:** Sincronizar trilhas sonoras e efeitos usando Supabase Broadcast, para que quando o mestre der play em um áudio, ele toque no navegador dos jogadores.
4. **Rolagem de Dados 3D (Opcional):** Um box de rolagem de dados (pode ser com `@react-three/fiber` e `use-cannon` ou apenas 2D simples com log de chat).

## ⚠️ Regras e Peculiaridades Adotadas
- O foco é simplicidade. Se der pra fazer pelo Supabase (DB, Auth, Storage, Realtime), a gente usa o Supabase.
- A experiência tem que ser fluida no mobile, com botões grandes e drag-and-drop otimizado para o toque (use `onPointerDown`/`onPointerUp` em vez de hooks de mouse restritos).
