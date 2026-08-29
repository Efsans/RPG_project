"use client";

import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
      >
        <span
          className={`mr-2 transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
        {title}
      </button>
      {isOpen && <div className="p-3 bg-zinc-900/50">{children}</div>}
    </div>
  );
}
