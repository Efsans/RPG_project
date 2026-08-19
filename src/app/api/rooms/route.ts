import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, password, masterName } = await req.json();

    if (!name || !password || !masterName) {
      return NextResponse.json(
        { error: "Nome, senha e mestre são obrigatórios." },
        { status: 400 }
      );
    }

    // Gerar código de 6 caracteres aleatórios
    const code = crypto.randomBytes(3).toString("hex").toUpperCase();
    
    // Hash muito simples para a senha (não recomendado para sistemas reais de auth, mas serve pro MVP privado)
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    // 1. Inserir na tabela rooms
    const { data: room, error: roomError } = await supabaseServer
      .from("rooms")
      .insert({
        code,
        password_hash: passwordHash,
        name,
        master_name: masterName,
      })
      .select("id")
      .single();

    if (roomError) {
      console.error("Erro ao criar sala:", roomError);
      return NextResponse.json({ error: "Erro interno ao criar sala." }, { status: 500 });
    }

    // 2. Criar estado inicial do mapa (map_states)
    const INITIAL_TOKENS = [
      { id: "npc-1", x: 100, y: 100, color: "bg-black", owner: "dev" },
      { id: "npc-2", x: 200, y: 100, color: "bg-black", owner: "dev" },
      { id: "npc-3", x: 300, y: 100, color: "bg-black", owner: "dev" },
      { id: "player-1", x: 200, y: 300, color: "bg-[#3b0918]", owner: "cliente" },
    ];

    const { error: mapError } = await supabaseServer
      .from("map_states")
      .insert({
        room_id: room.id,
        tokens: INITIAL_TOKENS,
      });

    if (mapError) {
      console.error("Erro ao criar map_state:", mapError);
      // Tentamos continuar mesmo assim, o pior que acontece é começar vazio
    }

    return NextResponse.json({ roomId: room.id, code });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
