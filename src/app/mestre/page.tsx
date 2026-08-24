"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MestreLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "amemdoim23") {
      router.push("/mestre/dashboard");
    } else {
      setError("Senha incorreta.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-100 p-4">
      <div className="w-full max-w-sm p-6 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Acesso do Mestre</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Senha Mestra</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded text-zinc-100 focus:outline-none focus:border-red-900"
              placeholder="Digite a senha..."
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-900 hover:bg-red-800 text-white font-bold rounded transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
