"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Preparar() {
  const router = useRouter();
  
  const [pcs, setPcs] = useState<any[]>([]);
  const [npcs, setNpcs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para abrir sala
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    const [resPcs, resNpcs] = await Promise.all([
      supabase.from("characters").select("*").is("room_id", null),
      supabase.from("entities").select("*").is("room_id", null)
    ]);
    if (resPcs.data) setPcs(resPcs.data);
    if (resNpcs.data) setNpcs(resNpcs.data);
    setLoading(false);
  };

  const handleCreatePC = async () => {
    const name = prompt("Nome do Jogador/Personagem:");
    if (!name) return;
    await supabase.from("characters").insert({
      name,
      label: name.substring(0, 3).toUpperCase(),
      token_color: "#aa0000",
      pos_x: 100,
      pos_y: 100
    });
    fetchTemplates();
  };

  const handleCreateNPC = async () => {
    const name = prompt("Nome do NPC/Monstro:");
    if (!name) return;
    await supabase.from("entities").insert({
      name,
      label: name.substring(0, 3).toUpperCase(),
      token_color: "#333333",
      pos_x: 200,
      pos_y: 100
    });
    fetchTemplates();
  };

  const handleDeletePC = async (id: string) => {
    await supabase.from("characters").delete().eq("id", id);
    fetchTemplates();
  };

  const handleDeleteNPC = async (id: string) => {
    await supabase.from("entities").delete().eq("id", id);
    fetchTemplates();
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingRoom(true);
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: roomName, password: roomPassword, masterName: "Mestre", masterPassword: "amemdoim23" })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Abre a sala em nova aba
      window.open(`/sala/${data.roomId}?role=dev&code=${data.code}`, '_blank');
    } catch (err: any) {
      alert(err.message);
    }
    setCreatingRoom(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold">Aposentos do Mestre</h1>
          <button onClick={() => router.push("/lobby")} className="text-zinc-500 hover:text-zinc-300">Sair</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lado Esquerdo: Criação de Sala */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold text-red-500 mb-4">Abrir Sessão</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Ao abrir a sessão, todos os templates ao lado serão clonados e jogados no tabuleiro da nova sala.
            </p>
            <form onSubmit={handleCreateRoom} className="flex flex-col gap-4">
              <input required placeholder="Nome da Sala" className="p-3 bg-zinc-950 border border-zinc-800 rounded" value={roomName} onChange={e => setRoomName(e.target.value)} />
              <input required type="password" placeholder="Senha para jogadores" className="p-3 bg-zinc-950 border border-zinc-800 rounded" value={roomPassword} onChange={e => setRoomPassword(e.target.value)} />
              <button disabled={creatingRoom} className="p-3 bg-red-900 hover:bg-red-800 font-bold rounded mt-2">
                {creatingRoom ? "GERANDO..." : "ABRIR SALA (Nova Guia)"}
              </button>
            </form>
          </div>

          {/* Lado Direito: Templates */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Seção Jogadores */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Elenco Principal (PCs)</h2>
                <button onClick={handleCreatePC} className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-sm">+ Novo Jogador</button>
              </div>
              
              {loading ? <p className="text-zinc-500">Carregando...</p> : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pcs.map(pc => (
                    <div key={pc.id} className="bg-zinc-950 border border-zinc-800 p-3 rounded flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: pc.token_color }} />
                        <span className="font-medium">{pc.name}</span>
                      </div>
                      <button onClick={() => handleDeletePC(pc.id)} className="text-zinc-600 hover:text-red-500">✕</button>
                    </div>
                  ))}
                  {pcs.length === 0 && <p className="text-sm text-zinc-500 col-span-3">Nenhum jogador cadastrado.</p>}
                </div>
              )}
            </div>

            {/* Seção NPCs */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Bestiário / NPCs</h2>
                <button onClick={handleCreateNPC} className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-sm">+ Novo Monstro</button>
              </div>
              
              {loading ? <p className="text-zinc-500">Carregando...</p> : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {npcs.map(npc => (
                    <div key={npc.id} className="bg-zinc-950 border border-zinc-800 p-3 rounded flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: npc.token_color }} />
                        <span className="font-medium">{npc.name}</span>
                      </div>
                      <button onClick={() => handleDeleteNPC(npc.id)} className="text-zinc-600 hover:text-red-500">✕</button>
                    </div>
                  ))}
                  {npcs.length === 0 && <p className="text-sm text-zinc-500 col-span-3">Nenhum monstro cadastrado.</p>}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
