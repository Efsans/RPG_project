"use client";

import { useState } from "react";

export default function AttributeRoller({ onComplete }: { onComplete: (attrs: any) => void }) {
  const [rolling, setRolling] = useState(false);
  const [results, setResults] = useState<{ [key: string]: number } | null>(null);

  const rollDice = () => {
    // 3d6 per stat (classic) or 4d6 drop lowest. Let's do a simple random for the MVP.
    const roll = () => Math.floor(Math.random() * 16) + 3; // 3 to 18
    
    setRolling(true);
    setResults(null);
    
    // Fake delay for animation
    setTimeout(() => {
      const newStats = {
        FOR: roll(),
        DEX: roll(),
        CON: roll(),
        INT: roll(),
        SAB: roll(),
        CAR: roll()
      };
      setResults(newStats);
      setRolling(false);
      onComplete(newStats);
    }, 1500);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-sm mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Rolar Atributos</h2>
      <p className="text-sm text-zinc-400 mb-6">Jogue os dados para definir as capacidades do seu personagem.</p>
      
      {results ? (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {Object.entries(results).map(([key, val]) => (
            <div key={key} className="bg-zinc-950 p-2 rounded border border-zinc-700">
              <span className="text-zinc-500 text-xs font-bold block">{key}</span>
              <span className="text-xl font-bold text-red-400">{val}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center mb-6">
          {rolling ? (
            <div className="animate-spin text-4xl">🎲</div>
          ) : (
            <div className="text-4xl opacity-50">🎲</div>
          )}
        </div>
      )}
      
      <button 
        onClick={rollDice}
        disabled={rolling}
        className="w-full py-3 bg-red-900 hover:bg-red-800 text-white font-bold rounded disabled:opacity-50 transition-colors"
      >
        {rolling ? "Rolando..." : results ? "Rolar Novamente" : "Rolar Dados"}
      </button>
    </div>
  );
}
