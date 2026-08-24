"use client";

import React, { useState, useEffect } from "react";

interface CharacterSheetProps {
  characterId: string;
}

export default function CharacterSheet({ characterId }: CharacterSheetProps) {
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [hp, setHp] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [marcas, setMarcas] = useState(0);
  const [impulso, setImpulso] = useState([true, true, false]);
  const [olhoAtivo, setOlhoAtivo] = useState(false);

  useEffect(() => {
    const fetchChar = async () => {
      try {
        const res = await fetch(`/api/characters/${characterId}`);
        const data = await res.json();
        if (data.character) {
          setCharacter(data.character);
          setHp(data.character.hp);
          setMaxHp(data.character.max_hp);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (characterId && characterId !== "novo") {
      fetchChar();
    }
  }, [characterId]);

  const updateHp = async (newHp: number) => {
    setHp(newHp);
    await fetch(`/api/characters/${characterId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hp: newHp })
    });
  };

  const toggleImpulso = (index: number) => {
    const newImpulso = [...impulso];
    newImpulso[index] = !newImpulso[index];
    setImpulso(newImpulso);
  };

  const handleAction = (actionName: string) => {
    alert(`Rolando ${actionName}... Log de combate seria gerado!`);
  };

  if (loading) return <div className="text-zinc-500 text-center py-10">Carregando ficha...</div>;
  if (!character) return <div className="text-red-500 text-center py-10">Ficha não encontrada.</div>;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-2xl mx-auto w-full">
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-zinc-700 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-red-500">{character.name}</h1>
          <p className="text-zinc-400">Classe: {character.class} | Raça: {character.race}</p>
        </div>
        <div className="text-right">
          <div className="font-bold">Nível {character.level || 1}</div>
        </div>
      </div>

      {/* STATUS BARS & TRACKERS */}
      <div className="bg-zinc-950 p-4 rounded mb-6 border border-zinc-800">
        <div className="mb-4">
          <div className="flex justify-between text-sm font-bold mb-1">
            <span>HP</span>
            <div className="flex space-x-2 items-center">
               <button onClick={() => updateHp(Math.max(0, hp - 1))} className="px-2 bg-zinc-800 rounded">-</button>
               <span>{hp} / {maxHp}</span>
               <button onClick={() => updateHp(Math.min(maxHp, hp + 1))} className="px-2 bg-zinc-800 rounded">+</button>
            </div>
          </div>
          <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 transition-all" style={{ width: `${(hp/maxHp)*100}%` }}></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="font-bold">IMPULSO:</span>
            <div className="flex space-x-1">
              {impulso.map((ativo, i) => (
                <button 
                  key={i} 
                  onClick={() => toggleImpulso(i)}
                  className={`w-6 h-6 rounded flex items-center justify-center border ${ativo ? 'bg-red-900 border-red-500' : 'bg-zinc-800 border-zinc-600'}`}
                >
                  {ativo ? '●' : '○'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold">MARCAS:</span>
            <button onClick={() => setMarcas(Math.max(0, marcas - 1))} className="px-2 bg-zinc-800 rounded">-</button>
            <span className="w-6 text-center font-bold text-red-400">{marcas}</span>
            <button onClick={() => setMarcas(marcas + 1)} className="px-2 bg-zinc-800 rounded">+</button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold">OLHO:</span>
            <button 
              onClick={() => setOlhoAtivo(!olhoAtivo)}
              className={`px-3 py-1 rounded text-xs font-bold ${olhoAtivo ? 'bg-purple-900 text-white' : 'bg-zinc-800 text-zinc-400'}`}
            >
              {olhoAtivo ? 'ATIVO' : 'DESATIVADO'}
            </button>
          </div>
        </div>
      </div>

      {/* ATTRIBUTES */}
      <div className="mb-6">
        <h3 className="font-bold text-zinc-300 border-b border-zinc-700 pb-1 mb-3">▼ ATRIBUTOS</h3>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          {['FOR', 'DEX', 'CON', 'INT', 'SAB', 'CAR'].map(attr => {
             const val = character.attributes?.[attr] || 10;
             const mod = Math.floor((val - 10) / 2);
             return (
               <div key={attr} className="bg-zinc-800 p-2 rounded">
                 {attr} <span className="font-bold block text-lg">{val} ({mod > 0 ? `+${mod}` : mod})</span>
               </div>
             )
          })}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mb-6">
        <h3 className="font-bold text-zinc-300 border-b border-zinc-700 pb-1 mb-3">▼ AÇÕES DE COMBATE</h3>
        <div className="space-y-2">
          <button onClick={() => handleAction("Estocada")} className="w-full text-left p-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-red-900 rounded flex justify-between items-center transition-colors">
            <span className="font-bold">🗡️ ESTOCADA</span>
            <span className="text-xs text-zinc-400">Rolar 1d8 + FOR</span>
          </button>
          <button onClick={() => { setMarcas(marcas + 1); handleAction("Marcar"); }} className="w-full text-left p-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-red-900 rounded flex justify-between items-center transition-colors">
            <span className="font-bold">🎯 MARCAR</span>
            <span className="text-xs text-zinc-400">+1 stack de Marcas</span>
          </button>
          <button onClick={() => handleAction("Explodir")} className="w-full text-left p-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-red-900 rounded flex justify-between items-center transition-colors">
            <span className="font-bold text-orange-400">💥 EXPLODIR</span>
            <span className="text-xs text-zinc-400">marcas × (1+INT) × 2</span>
          </button>
        </div>
      </div>

      {/* LORE & INVENTORY (Placeholders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold text-zinc-300 border-b border-zinc-700 pb-1 mb-2">▼ INVENTÁRIO</h3>
          <ul className="text-sm space-y-1 text-zinc-400 bg-zinc-950 p-2 rounded border border-zinc-800 h-24 overflow-y-auto">
            <li>• Espada Longa</li>
            <li>• Poção de Cura x3</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-zinc-300 border-b border-zinc-700 pb-1 mb-2">▼ LORE</h3>
          <textarea 
            className="w-full text-sm bg-zinc-950 text-zinc-400 p-2 rounded border border-zinc-800 h-24 resize-none focus:outline-none focus:border-red-900" 
            placeholder="História do personagem..."
            defaultValue="Um veterano de guerra focado em táticas de marcação."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
