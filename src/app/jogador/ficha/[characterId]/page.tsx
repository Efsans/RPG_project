"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CharacterSheet from "@/components/ficha/CharacterSheet";
import AttributeRoller from "@/components/ficha/AttributeRoller";

export default function FichaPage({ params }: { params: { characterId: string } }) {
  const router = useRouter();
  const isNew = params.characterId === "novo";
  
  const [step, setStep] = useState(1);
  const [charData, setCharData] = useState({ name: "", class: "", race: "", attributes: null });

  if (!isNew) {
    return (
      <div className="min-h-screen bg-zinc-950 p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl flex justify-between mb-4">
          <button onClick={() => router.push("/jogador")} className="text-zinc-400 hover:text-white">← Voltar</button>
          <div className="text-zinc-500 text-sm">Salvamento Automático Ativado</div>
        </div>
        <CharacterSheet characterId={params.characterId} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 flex flex-col items-center justify-center text-zinc-100">
      <div className="w-full max-w-md">
        <button onClick={() => router.push("/jogador")} className="text-zinc-400 hover:text-white mb-6 block">← Cancelar</button>
        
        {step === 1 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Criar Novo Personagem</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input 
                  type="text" 
                  className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded text-white" 
                  value={charData.name}
                  onChange={e => setCharData({...charData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Classe</label>
                  <input 
                    type="text" 
                    className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded text-white" 
                    value={charData.class}
                    onChange={e => setCharData({...charData, class: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Raça</label>
                  <input 
                    type="text" 
                    className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded text-white" 
                    value={charData.race}
                    onChange={e => setCharData({...charData, race: e.target.value})}
                  />
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                disabled={!charData.name || !charData.class}
                className="w-full py-2 bg-red-900 hover:bg-red-800 rounded font-bold mt-4 disabled:opacity-50"
              >
                Próximo Passo →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <AttributeRoller onComplete={(attrs) => setCharData({...charData, attributes: attrs})} />
            {charData.attributes && (
              <button 
                onClick={async () => {
                  const userStr = localStorage.getItem("rpg_user");
                  if (userStr) {
                    const user = JSON.parse(userStr);
                    // Formula PV (Level 1 Protagonista): 3 * d10 (media 10) + CON mod. Para MVP vamos fixar.
                    const maxHp = 30 + Math.floor((charData.attributes.CON - 10) / 2);
                    await fetch("/api/characters", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ...charData,
                        user_id: user.id,
                        level: 1,
                        max_hp: maxHp,
                        hp: maxHp
                      })
                    });
                  }
                  router.push("/jogador");
                }}
                className="w-full py-3 bg-green-700 hover:bg-green-600 rounded font-bold mt-4"
              >
                Finalizar Criação
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
