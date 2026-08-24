"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JogadorLogin() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isRegister ? "register" : "login",
          username,
          password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ocorreu um erro");
        setLoading(false);
        return;
      }

      // Save user to localStorage for simple auth in private VTT
      localStorage.setItem("rpg_user", JSON.stringify(data.user));
      router.push("/jogador");
    } catch (err) {
      setError("Erro de conexão");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-100 p-4">
      <div className="w-full max-w-sm p-6 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Criar Conta" : "Login de Jogador"}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded text-zinc-100 focus:outline-none focus:border-red-900"
              placeholder="Nome de usuário"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded text-zinc-100 focus:outline-none focus:border-red-900"
              placeholder="Sua senha"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-red-900 hover:bg-red-800 text-white font-bold rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Carregando..." : (isRegister ? "Registrar" : "Entrar")}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-zinc-400 hover:text-zinc-200"
          >
            {isRegister ? "Já tem uma conta? Faça login" : "Não tem conta? Registre-se"}
          </button>
        </div>
      </div>
    </div>
  );
}
