import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { code, password } = await req.json();

    if (!code || !password) {
      return NextResponse.json(
        { error: "Código e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    const { data: room, error } = await supabaseServer
      .from("rooms")
      .select("id, name")
      .eq("code", code.toUpperCase())
      .eq("password_hash", passwordHash)
      .single();

    if (error || !room) {
      return NextResponse.json(
        { error: "Código ou senha incorretos." },
        { status: 401 }
      );
    }

    return NextResponse.json({ roomId: room.id, roomName: room.name });
  } catch (err) {
    console.error("Erro inesperado no login:", err);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
