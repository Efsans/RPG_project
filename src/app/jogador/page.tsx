"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JogadorDashboard() {
  const router = useRouter();
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      const userStr = localStorage.getItem("rpg_user");
      if (!userStr) {
        router.push("/login");
        return;
      }
      const user = JSON.parse(userStr);

      try {
        const res = await fetch(`/api/characters?user_id=${user.id}`);
        const data = await res.json();
        if (data.characters) setCharacters(data.characters);
      } catch (err) {
        console.error("Erro ao buscar personagens", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold">Meus Personagens</h1>
          <button 
            onClick={() => router.push("/jogador/ficha/novo")}
            className="px-4 py-2 bg-red-900 hover:bg-red-800 rounded font-bold"
          >
            + Criar Personagem
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500">
            Carregando personagens...
          </div>
        ) : characters.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            Você ainda não tem personagens. Crie um para começar!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map(char => (
              <div key={char.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-red-900 transition-colors">
                <h2 className="text-xl font-bold text-red-400">{char.name}</h2>
                <p className="text-sm text-zinc-400 mb-4">Nível {char.level} | {char.class}</p>
                <div className="mb-4">
                  <div className="text-xs text-zinc-500 mb-1">HP ({char.hp}/{char.max_hp})</div>
                  <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full" style={{ width: `${(char.hp/char.max_hp)*100}%` }}></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href={`/jogador/ficha/${char.id}`}
                    className="flex-1 text-center py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm font-medium"
                  >
                    Abrir Ficha
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
