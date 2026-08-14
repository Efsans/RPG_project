"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

type TokenData = {
  id: string;
  x: number;
  y: number;
  color: string;
  owner: "dev" | "cliente";
};

type Role = "dev" | "cliente" | null;

const INITIAL_TOKENS: TokenData[] = [
  { id: "npc-1", x: 100, y: 100, color: "bg-black", owner: "dev" },
  { id: "npc-2", x: 200, y: 100, color: "bg-black", owner: "dev" },
  { id: "npc-3", x: 300, y: 100, color: "bg-black", owner: "dev" },
  { id: "player-1", x: 200, y: 300, color: "bg-[#3b0918]", owner: "cliente" },
];

export default function Home() {
  const [role, setRole] = useState<Role>(null);
  const [tokens, setTokens] = useState<TokenData[]>(INITIAL_TOKENS);
  
  // Estado de Drag de Tokens Existentes
  const [draggingTokenId, setDraggingTokenId] = useState<string | null>(null);
  
  // Estado de Drag de Novos Tokens (Template sendo puxado da barra)
  const [dragTemplate, setDragTemplate] = useState<{ color: string; owner: "dev" | "cliente"; clientX: number; clientY: number } | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  
  const tokensRef = useRef<TokenData[]>(INITIAL_TOKENS);

  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  useEffect(() => {
    if (!role) return;

    const channel = supabase.channel("table-1", {
      config: { broadcast: { ack: false } },
    });

    channel
      .on("broadcast", { event: "token_move" }, (payload) => {
        const { id, x, y } = payload.payload;
        setTokens((prev) =>
          prev.map((t) => (t.id === id ? { ...t, x, y } : t))
        );
      })
      .on("broadcast", { event: "sync_request" }, () => {
        channel.send({
          type: "broadcast",
          event: "sync_response",
          payload: tokensRef.current,
        });
      })
      .on("broadcast", { event: "sync_response" }, (payload) => {
        setTokens(payload.payload);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channel.send({ type: "broadcast", event: "sync_request" });
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [role]);

  const lastBroadcast = useRef(0);
  const broadcastMove = useCallback((id: string, x: number, y: number, force = false) => {
    const now = Date.now();
    if (force || now - lastBroadcast.current > 50) {
      if (channelRef.current && channelRef.current.state === 'joined') {
        channelRef.current.send({
          type: "broadcast",
          event: "token_move",
          payload: { id, x, y },
        });
      }
      lastBroadcast.current = now;
    }
  }, []);

  // ====== LOGICA DE TOKENS EXISTENTES NO BOARD ======
  const handlePointerDown = (e: React.PointerEvent, token: TokenData) => {
    if (role === "cliente" && token.owner !== "cliente") return;

    const target = e.currentTarget as HTMLDivElement;
    target.setPointerCapture(e.pointerId);
    
    setDraggingTokenId(token.id);
    dragStartPos.current = {
      x: e.clientX - token.x,
      y: e.clientY - token.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingTokenId) return;

    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;

    setTokens((prev) =>
      prev.map((t) => (t.id === draggingTokenId ? { ...t, x: newX, y: newY } : t))
    );
    
    broadcastMove(draggingTokenId, newX, newY, false);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggingTokenId) return;
    
    const target = e.currentTarget as HTMLDivElement;
    target.releasePointerCapture(e.pointerId);
    
    const token = tokensRef.current.find(t => t.id === draggingTokenId);
    if (token) {
      broadcastMove(token.id, token.x, token.y, true);
    }
    
    setDraggingTokenId(null);
  };

  // ====== LÓGICA DE SPAWN (PUXAR DA BARRA PARA O BOARD) ======
  const handleTemplateDown = (e: React.PointerEvent, owner: "dev" | "cliente", color: string) => {
    const target = e.currentTarget as HTMLDivElement;
    target.setPointerCapture(e.pointerId);
    
    setDragTemplate({ color, owner, clientX: e.clientX, clientY: e.clientY });
  };

  const handleTemplateMove = (e: React.PointerEvent) => {
    if (!dragTemplate) return;
    setDragTemplate({ ...dragTemplate, clientX: e.clientX, clientY: e.clientY });
  };

  const handleTemplateUp = (e: React.PointerEvent) => {
    if (!dragTemplate) return;
    const target = e.currentTarget as HTMLDivElement;
    target.releasePointerCapture(e.pointerId);

    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      
      // Checa se soltou em cima do tabuleiro
      if (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom
      ) {
        // Calcula posição relativa dentro do tabuleiro
        const dropX = e.clientX - rect.left - 20; // 20 para centralizar
        const dropY = e.clientY - rect.top - 20;

        const newToken: TokenData = {
          id: `token-${Date.now()}`,
          x: dropX,
          y: dropY,
          color: dragTemplate.color,
          owner: dragTemplate.owner,
        };
        
        const newTokens = [...tokensRef.current, newToken];
        setTokens(newTokens);

        if (channelRef.current && channelRef.current.state === "joined") {
          channelRef.current.send({
            type: "broadcast",
            event: "sync_response",
            payload: newTokens,
          });
        }
      }
    }
    
    setDragTemplate(null);
  };

  // TELA DE LOGIN (Seca/Discreta)
  if (!role) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-zinc-900 gap-8">
        <button 
          onClick={() => setRole("dev")}
          style={{ touchAction: 'manipulation' }}
          className="px-12 py-6 bg-zinc-800 text-zinc-400 text-xl rounded-md border border-zinc-700 hover:bg-zinc-700 active:bg-zinc-600 transition-colors select-none"
        >
          DEV
        </button>
        <button 
          onClick={() => setRole("cliente")}
          style={{ touchAction: 'manipulation' }}
          className="px-12 py-6 bg-zinc-800 text-zinc-400 text-xl rounded-md border border-zinc-700 hover:bg-zinc-700 active:bg-zinc-600 transition-colors select-none"
        >
          CLIENTE
        </button>
      </div>
    );
  }

  // TELA DA MESA
  return (
    <div className="flex h-screen w-screen bg-zinc-900 overflow-hidden relative">
      
      {/* FANTASMA DO TEMPLATE SENDO ARRASTADO */}
      {dragTemplate && (
        <div 
          className={`fixed flex items-center justify-center w-[40px] h-[40px] rounded-full shadow-lg ${dragTemplate.color} z-[100] opacity-90`}
          style={{
            left: dragTemplate.clientX - 20,
            top: dragTemplate.clientY - 20,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* PAINEL DO MESTRE (SIDEBAR SECA SEM TEXTO) */}
      {role === "dev" && (
        <div className="w-16 md:w-20 h-full bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-4 md:py-8 gap-6 md:gap-8 shadow-xl z-20">
          <div 
            onPointerDown={(e) => handleTemplateDown(e, "dev", "bg-black")}
            onPointerMove={handleTemplateMove}
            onPointerUp={handleTemplateUp}
            onPointerCancel={handleTemplateUp}
            className="w-[40px] h-[40px] rounded-full bg-black shadow-md cursor-grab active:cursor-grabbing touch-none"
            title="Adicionar bola preta (Dev)"
          />

          <div 
            onPointerDown={(e) => handleTemplateDown(e, "cliente", "bg-[#3b0918]")}
            onPointerMove={handleTemplateMove}
            onPointerUp={handleTemplateUp}
            onPointerCancel={handleTemplateUp}
            className="w-[40px] h-[40px] rounded-full bg-[#3b0918] shadow-md cursor-grab active:cursor-grabbing touch-none"
            title="Adicionar bola vermelha (Cliente)"
          />
        </div>
      )}

      {/* ÁREA DO GRID (CENTRALIZADA) */}
      <div className="flex-1 flex items-center justify-center relative p-2 md:p-8 touch-none">
        {/* O Grid (Tabuleiro) discreto */}
        <div 
          ref={boardRef}
          className="relative bg-zinc-800 border border-zinc-700 w-full max-w-[800px] h-full max-h-[600px] overflow-hidden shadow-sm rounded-sm"
          style={{
            backgroundImage: 'linear-gradient(#3f3f46 1px, transparent 1px), linear-gradient(90deg, #3f3f46 1px, transparent 1px)',
            backgroundSize: '50px 50px' 
          }}
        >
          
          {tokens.map((token) => (
            <div
              key={token.id}
              onPointerDown={(e) => handlePointerDown(e, token)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`absolute flex items-center justify-center w-[40px] h-[40px] rounded-full select-none touch-none shadow-md ${token.color} ${
                draggingTokenId === token.id 
                  ? "cursor-grabbing opacity-80 z-50" 
                  : "cursor-grab z-10 transition-transform duration-75"
              }`}
              style={{
                transform: `translate(${token.x}px, ${token.y}px)`,
                cursor: role === "cliente" && token.owner !== "cliente" ? "not-allowed" : undefined
              }}
            />
          ))}

        </div>
      </div>
    </div>
  );
}
