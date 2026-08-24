"use client";

import { useState } from "react";
import TabBar from "@/components/ui/TabBar";
import Accordion from "@/components/ui/Accordion";
import DiceReliquary from "@/components/dados/DiceReliquary";

export default function MestreDashboard() {
  const [activeTab, setActiveTab] = useState("entities");

  const tabs = [
    { id: "cenas", label: "Cenas" },
    { id: "entities", label: "Entities" },
    { id: "characters", label: "Characters" },
    { id: "midias", label: "Mídias" },
    { id: "config", label: "Config" },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ color: "var(--bone)" }}>
      {/* Top Bar / Tab Bar */}
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar (Gavetas) */}
        <aside className="w-64 border-r border-zinc-800 bg-zinc-900 flex flex-col overflow-y-auto">
          {activeTab === "entities" && (
            <>
              <Accordion title="NPCs da Vila" defaultOpen>
                <div className="space-y-1">
                  <div className="p-2 text-sm bg-zinc-800 rounded cursor-grab">Ferreiro Bob</div>
                  <div className="p-2 text-sm bg-zinc-800 rounded cursor-grab">Prefeito</div>
                </div>
              </Accordion>
              <Accordion title="Monstros">
                <div className="space-y-1">
                  <div className="p-2 text-sm bg-zinc-800 rounded cursor-grab">Goblin</div>
                  <div className="p-2 text-sm bg-zinc-800 rounded cursor-grab">Chefe Tribal</div>
                </div>
              </Accordion>
            </>
          )}
          {activeTab === "characters" && (
            <Accordion title="Jogadores" defaultOpen>
              <div className="space-y-1">
                <div className="p-2 text-sm bg-zinc-800 rounded cursor-pointer">Capitão (Thiago)</div>
                <div className="p-2 text-sm bg-zinc-800 rounded cursor-pointer">Mago (João)</div>
              </div>
            </Accordion>
          )}
          {activeTab === "cenas" && (
            <Accordion title="Cenas Salvas" defaultOpen>
              <div className="space-y-1">
                <div className="p-2 text-sm bg-zinc-800 rounded">Taverna</div>
                <div className="p-2 text-sm bg-zinc-800 rounded">Floresta</div>
              </div>
            </Accordion>
          )}
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 bg-zinc-950 relative overflow-hidden flex flex-col items-center justify-center p-4">
           {/* Placeholder for the actual map/grid */}
           <div className="w-full h-full border-2 border-dashed border-zinc-800 flex items-center justify-center rounded-lg bg-[linear-gradient(#3f3f46_1px,transparent_1px),linear-gradient(90deg,#3f3f46_1px,transparent_1px)] bg-[size:50px_50px]">
              <span className="text-zinc-500 font-mono text-lg bg-zinc-950 px-4 py-2 rounded">
                CANVAS PRINCIPAL ({activeTab.toUpperCase()})
              </span>
           </div>
        </main>

        {/* Right Sidebar (Inspetor/Ficha) */}
        <aside className="w-80 border-l border-zinc-800 bg-zinc-900 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="font-bold text-lg">Inspetor</h2>
            <p className="text-xs text-zinc-400">Selecione um item no canvas ou na gaveta.</p>
          </div>
          <Accordion title="Ficha do Token" defaultOpen>
            <div className="text-sm space-y-2">
               <div><strong>Nome:</strong> Goblin</div>
               <div><strong>HP:</strong> 12/12</div>
            </div>
          </Accordion>
          <Accordion title="Atributos">
            <div className="text-sm">FOR 10 | DEX 14 | CON 12</div>
          </Accordion>
          <Accordion title="Ações">
             <button className="w-full p-2 bg-red-900/50 hover:bg-red-900 rounded text-left text-sm mb-1">🗡️ Ataque Curto (1d6)</button>
          </Accordion>
        </aside>

      </div>

      {/* Footer Bar */}
      <footer className="h-[7.5rem] md:h-28 border-t border-[#3a3226] flex items-center px-3 md:px-6 shrink-0 justify-between gap-3" style={{ background: "#14110d" }}>
        <div className="text-xs md:text-sm flex-1 truncate min-w-0" style={{ color: "#9c8b6e" }}>
          [LOG] Chefe Tribal entrou na sala.
        </div>
        <div className="-mt-8 md:-mt-10">
          <DiceReliquary sides={20} size="pocket" />
        </div>
        <div className="flex-1 flex justify-end">
          <button className="px-4 py-1 btn-brass text-sm">
            Abrir Sala
          </button>
        </div>
      </footer>
    </div>
  );
}
