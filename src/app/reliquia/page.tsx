import DiceReliquary from "@/components/dados/DiceReliquary";
import Link from "next/link";

export default function ReliquiaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <p className="font-display text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#9c8b6e" }}>
        O Navio do Pirata que Cai
      </p>
      <h1 className="font-display text-3xl md:text-5xl text-center mb-2">
        Relicário
      </h1>
      <p className="max-w-md text-center mb-12" style={{ color: "#9c8b6e" }}>
        Toque o demônio. O anel gira, o dado é cuspido em 3D e o número já foi
        sorteado — a cena só apresenta o resultado da regra.
      </p>
      <DiceReliquary sides={20} size="table" />
      <Link href="/lobby" className="btn-ghost-rpg mt-16 text-sm">
        Voltar à mesa
      </Link>
    </div>
  );
}
