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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-6 surface-panel">
        <h1 className="font-display text-2xl mb-6 text-center">Acesso do Mestre</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Senha Mestra</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 surface-input"
              placeholder="Digite a senha..."
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-2 px-4 btn-blood"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
