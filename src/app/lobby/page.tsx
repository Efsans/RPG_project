"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Lobby() {
  const router = useRouter();
  const [mode, setMode] = useState<"menu" | "create" | "join">("menu");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // States for Create
  const [roomName, setRoomName] = useState("");
  const [masterName, setMasterName] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  // States for Join
  const [roomCode, setRoomCode] = useState("");
  const [joinPassword, setJoinPassword] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: roomName, password: createPassword, masterName }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Redireciona como dev (mestre)
      router.push(`/sala/${data.roomId}?role=dev&code=${data.code}`);
    } catch (err: any) {
      setError(err.message || "Erro ao criar sala");
      setLoading(false);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rooms/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: roomCode, password: joinPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Redireciona como cliente (jogador)
      router.push(`/sala/${data.roomId}?role=cliente`);
    } catch (err: any) {
      setError(err.message || "Erro ao entrar na sala");
      setLoading(false);
    }
  };

  if (mode === "create") {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
        <form onSubmit={handleCreate} className="flex flex-col gap-4 w-full max-w-sm surface-panel p-6">
          <h2 className="font-display text-2xl text-center mb-2">Criar Sala</h2>
          {error && <p className="text-sm" style={{ color: "#b01c22" }}>{error}</p>}
          <input required placeholder="Nome da Sala" className="p-3 surface-input" value={roomName} onChange={e => setRoomName(e.target.value)} />
          <input required placeholder="Seu Nome (Mestre)" className="p-3 surface-input" value={masterName} onChange={e => setMasterName(e.target.value)} />
          <input required type="password" placeholder="Senha" className="p-3 surface-input" value={createPassword} onChange={e => setCreatePassword(e.target.value)} />
          <button disabled={loading} className="mt-4 p-3 btn-blood">
            {loading ? "Criando..." : "CRIAR COMO MESTRE"}
          </button>
          <button type="button" onClick={() => setMode("menu")} className="p-3 btn-ghost-rpg">Voltar</button>
        </form>
      </div>
    );
  }

  if (mode === "join") {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
        <form onSubmit={handleJoin} className="flex flex-col gap-4 w-full max-w-sm surface-panel p-6">
          <h2 className="font-display text-2xl text-center mb-2">Entrar na Sala</h2>
          {error && <p className="text-sm" style={{ color: "#b01c22" }}>{error}</p>}
          <input required placeholder="Código da Sala" className="p-3 surface-input uppercase" maxLength={6} value={roomCode} onChange={e => setRoomCode(e.target.value.toUpperCase())} />
          <input required type="password" placeholder="Senha" className="p-3 surface-input" value={joinPassword} onChange={e => setJoinPassword(e.target.value)} />
          <button disabled={loading} className="mt-4 p-3 btn-brass">
            {loading ? "Entrando..." : "ENTRAR COMO JOGADOR"}
          </button>
          <button type="button" onClick={() => setMode("menu")} className="p-3 btn-ghost-rpg">Voltar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8 p-4">
      <div className="text-center mb-4">
        <p className="font-display text-xs tracking-[0.4em] uppercase mb-2" style={{ color: "#9c8b6e" }}>
          NPC
        </p>
        <h1 className="font-display text-3xl md:text-4xl max-w-md mx-auto leading-tight">
          O Navio do Pirata que Cai
        </h1>
      </div>
      <button 
        onClick={() => setMode("create")}
        style={{ touchAction: 'manipulation' }}
        className="px-12 py-5 btn-blood text-xl select-none w-full max-w-xs"
      >
        CRIAR SALA
      </button>
      <button 
        onClick={() => setMode("join")}
        style={{ touchAction: 'manipulation' }}
        className="px-12 py-5 btn-brass text-xl select-none w-full max-w-xs"
      >
        ENTRAR
      </button>
      <Link href="/reliquia" className="btn-ghost-rpg text-sm mt-4">
        Relicário dos dados
      </Link>
    </div>
  );
}
