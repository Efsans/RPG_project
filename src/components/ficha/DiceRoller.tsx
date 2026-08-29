"use client";

import { useState } from "react";

export default function DiceRoller() {
  const [result, setResult] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const rollD20 = () => {
    setRolling(true);
    setResult(null);
    setTimeout(() => {
      setResult(Math.floor(Math.random() * 20) + 1);
      setRolling(false);
    }, 600);
  };

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={rollD20}
        disabled={rolling}
        className="flex items-center px-3 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 rounded text-sm transition-colors"
      >
        <span className={`mr-2 ${rolling ? 'animate-spin' : ''}`}>🎲</span>
        {rolling ? '...' : 'd20'}
      </button>
      
      {result !== null && (
        <div className={`px-2 py-1 rounded text-sm font-bold animate-pulse ${result === 20 ? 'bg-green-900 text-green-400' : result === 1 ? 'bg-red-900 text-red-400' : 'bg-zinc-800 text-white'}`}>
          {result}
        </div>
      )}
    </div>
  );
}
