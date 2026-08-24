"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Lobby() {
  const router = useRouter();
  const [mode, setMode] = useState<"menu" | "master" | "join">("menu");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // States for Master
  const [masterPassword, setMasterPassword] = useState("");

  // States for Join
  const [roomCode, setRoomCode] = useState("");
  const [joinPassword, setJoinPassword] = useState("");

  const handleMasterLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPassword === "amemdoim23") {
      router.push("/preparar");
    } else {
      setError("Senha de mestre incorreta.");
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

  if (mode === "master") {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-zinc-900 p-4">
        <form onSubmit={handleMasterLogin} className="flex flex-col gap-4 w-full max-w-sm bg-zinc-800 p-6 rounded-md border border-zinc-700">
          <h2 className="text-2xl text-zinc-200 text-center mb-2 font-bold">Acesso do Mestre</h2>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <input required type="password" placeholder="Senha do Mestre" className="p-3 bg-zinc-900 text-zinc-200 border border-zinc-700 rounded" value={masterPassword} onChange={e => setMasterPassword(e.target.value)} />
          <button disabled={loading} className="mt-4 p-3 bg-red-900 hover:bg-red-800 text-zinc-200 font-bold rounded">
            ENTRAR NO HUB
          </button>
          <button type="button" onClick={() => setMode("menu")} className="p-3 text-zinc-400 hover:text-zinc-200">Voltar</button>
        </form>
      </div>
    );
  }

  if (mode === "join") {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-zinc-900 p-4">
        <form onSubmit={handleJoin} className="flex flex-col gap-4 w-full max-w-sm bg-zinc-800 p-6 rounded-md border border-zinc-700">
          <h2 className="text-2xl text-zinc-200 text-center mb-2 font-bold">Entrar na Sala</h2>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <input required placeholder="Código da Sala" className="p-3 bg-zinc-900 text-zinc-200 border border-zinc-700 rounded uppercase" maxLength={6} value={roomCode} onChange={e => setRoomCode(e.target.value.toUpperCase())} />
          <input required type="password" placeholder="Senha da Sala" className="p-3 bg-zinc-900 text-zinc-200 border border-zinc-700 rounded" value={joinPassword} onChange={e => setJoinPassword(e.target.value)} />
          <button disabled={loading} className="mt-4 p-3 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 font-bold rounded">
            {loading ? "Entrando..." : "ENTRAR COMO JOGADOR"}
          </button>
          <button type="button" onClick={() => setMode("menu")} className="p-3 text-zinc-400 hover:text-zinc-200">Voltar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-zinc-900 gap-8 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl text-zinc-200 font-bold tracking-tight">Mesa RPG</h1>
        <p className="text-zinc-500 mt-2">VTT Privada</p>
      </div>
      <button 
        onClick={() => setMode("master")}
        style={{ touchAction: 'manipulation' }}
        className="px-12 py-6 bg-red-900/80 text-zinc-200 text-xl rounded-md border border-red-800 hover:bg-red-800 active:bg-red-700 transition-colors select-none w-full max-w-xs font-bold"
      >
        SOU O MESTRE
      </button>
      <button 
        onClick={() => setMode("join")}
        style={{ touchAction: 'manipulation' }}
        className="px-12 py-6 bg-zinc-800 text-zinc-300 text-xl rounded-md border border-zinc-700 hover:bg-zinc-700 active:bg-zinc-600 transition-colors select-none w-full max-w-xs font-bold"
      >
        ENTRAR
      </button>
    </div>
  );
}
