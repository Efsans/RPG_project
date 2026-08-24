"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type TokenData = {
  id: string;
  pos_x: number;
  pos_y: number;
  token_color: string;
  label: string;
  hp: number;
  max_hp: number;
  name: string;
  type: "character" | "entity"; // para saber qual tabela atualizar
};

export default function Sala() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = params.roomId as string;
  const role = searchParams.get("role") as "dev" | "cliente" | null;
  const roomCode = searchParams.get("code");

  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [draggingTokenId, setDraggingTokenId] = useState<string | null>(null);
  
  const boardRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  
  const tokensRef = useRef<TokenData[]>([]);

  useEffect(() => {
    if (!roomId || !role) {
      router.push("/lobby");
    }
  }, [roomId, role, router]);

  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  useEffect(() => {
    if (!roomId) return;

    const fetchInitialData = async () => {
      const [charsRes, entitiesRes] = await Promise.all([
        supabase.from("characters").select("*").eq("room_id", roomId),
        supabase.from("entities").select("*").eq("room_id", roomId)
      ]);
      
      const allTokens: TokenData[] = [];
      
      if (charsRes.data) {
        allTokens.push(...charsRes.data.map(c => ({
          id: c.id, pos_x: c.pos_x, pos_y: c.pos_y, 
          token_color: c.token_color, label: c.label || c.name.substring(0,3), 
          hp: c.hp, max_hp: c.max_hp, name: c.name, type: "character" as const
        })));
      }
      
      if (entitiesRes.data) {
        allTokens.push(...entitiesRes.data.map(e => ({
          id: e.id, pos_x: e.pos_x, pos_y: e.pos_y, 
          token_color: e.token_color, label: e.label || e.name.substring(0,3), 
          hp: e.hp, max_hp: e.max_hp, name: e.name, type: "entity" as const
        })));
      }

      setTokens(allTokens);
      setLoading(false);
    };

    fetchInitialData();
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !role) return;

    const channelName = `room-${roomId}`;
    const channel = supabase.channel(channelName, {
      config: { broadcast: { ack: false } },
    });

    channel
      .on("broadcast", { event: "token_move" }, (payload) => {
        const { id, x, y } = payload.payload;
        setTokens((prev) =>
          prev.map((t) => (t.id === id ? { ...t, pos_x: x, pos_y: y } : t))
        );
      })
      .on("broadcast", { event: "sync_request" }, () => {
        if (role === "dev") {
          channel.send({
            type: "broadcast",
            event: "sync_response",
            payload: tokensRef.current,
          });
        }
      })
      .on("broadcast", { event: "sync_response" }, (payload) => {
        if (role === "cliente") {
          setTokens(payload.payload);
        }
      })
      .on("broadcast", { event: "room_closed" }, () => {
        alert("A sessão foi encerrada pelo Mestre.");
        router.push("/lobby");
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED" && role === "cliente") {
          channel.send({ type: "broadcast", event: "sync_request" });
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, role, router]);

  const savePositionToDatabase = async (token: TokenData) => {
    const table = token.type === "character" ? "characters" : "entities";
    await supabase
      .from(table)
      .update({ pos_x: token.pos_x, pos_y: token.pos_y })
      .eq("id", token.id);
  };

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

  const handlePointerDown = (e: React.PointerEvent, token: TokenData) => {
    // Cliente só mexe seus próprios characters, não mexe entities
    if (role === "cliente" && token.type === "entity") return;

    const target = e.currentTarget as HTMLDivElement;
    target.setPointerCapture(e.pointerId);
    
    setDraggingTokenId(token.id);
    dragStartPos.current = {
      x: e.clientX - token.pos_x,
      y: e.clientY - token.pos_y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingTokenId) return;

    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;

    setTokens((prev) =>
      prev.map((t) => (t.id === draggingTokenId ? { ...t, pos_x: newX, pos_y: newY } : t))
    );
    
    broadcastMove(draggingTokenId, newX, newY, false);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggingTokenId) return;
    
    const target = e.currentTarget as HTMLDivElement;
    target.releasePointerCapture(e.pointerId);
    
    const token = tokensRef.current.find(t => t.id === draggingTokenId);
    if (token) {
      broadcastMove(token.id, token.pos_x, token.pos_y, true);
      savePositionToDatabase(token);
    }
    
    setDraggingTokenId(null);
  };

  const handleCloseRoom = async () => {
    if (!confirm("Tem certeza que deseja encerrar a sala? Tudo será deletado.")) return;

    if (channelRef.current) {
      channelRef.current.send({ type: "broadcast", event: "room_closed" });
    }

    await fetch(`/api/rooms/${roomId}`, { method: "DELETE" });
    router.push("/preparar");
  };

  if (!role || loading) {
    return <div className="flex h-screen w-screen bg-zinc-900 items-center justify-center text-zinc-500">Carregando tabuleiro...</div>;
  }

  return (
    <div className="flex h-screen w-screen bg-zinc-900 overflow-hidden relative">
      
      {/* HEADER DO MESTRE */}
      {role === "dev" && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
          {roomCode && (
            <div className="bg-zinc-800 text-zinc-200 px-4 py-2 rounded shadow border border-zinc-700 flex items-center gap-2">
              <span>Cód:</span>
              <strong className="text-xl text-red-400 tracking-wider">{roomCode}</strong>
            </div>
          )}
          <button onClick={handleCloseRoom} className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded shadow font-bold">
            ENCERRAR SALA
          </button>
        </div>
      )}

      {/* ÁREA DO GRID */}
      <div className="flex-1 flex items-center justify-center relative p-2 md:p-8 touch-none">
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
              className={`absolute flex items-center justify-center w-[40px] h-[40px] rounded-full select-none touch-none shadow-lg text-xs font-bold text-white border-2 group ${
                draggingTokenId === token.id 
                  ? "cursor-grabbing opacity-80 z-50" 
                  : "cursor-grab z-10 transition-transform duration-75"
              }`}
              style={{
                transform: `translate(${token.pos_x}px, ${token.pos_y}px)`,
                backgroundColor: token.token_color,
                borderColor: token.type === 'character' ? '#ffffff44' : '#00000044',
                cursor: role === "cliente" && token.type === "entity" ? "not-allowed" : undefined
              }}
            >
              {token.label}
              
              {/* TOOLTIP DE FICHA (Só aparece pro mestre no hover) */}
              {role === "dev" && !draggingTokenId && (
                <div className="hidden group-hover:flex absolute top-12 left-1/2 -translate-x-1/2 bg-zinc-950 border border-zinc-700 text-white p-2 rounded shadow-xl flex-col min-w-[120px] pointer-events-none z-[100]">
                  <strong className="text-sm truncate">{token.name}</strong>
                  <div className="text-xs text-zinc-400 flex justify-between mt-1">
                    <span>HP:</span>
                    <span className={token.hp < token.max_hp / 2 ? "text-red-400" : "text-green-400"}>
                      {token.hp}/{token.max_hp}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
