import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { action, username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Usuário e senha são obrigatórios" }, { status: 400 });
    }

    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    if (action === "register") {
      const { data, error } = await supabaseServer
        .from("users")
        .insert([{ username, password_hash: passwordHash }])
        .select("id, username")
        .single();

      if (error) {
        if (error.code === "23505") return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ user: data });
    } 
    
    if (action === "login") {
      const { data, error } = await supabaseServer
        .from("users")
        .select("id, username")
        .eq("username", username)
        .eq("password_hash", passwordHash)
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
      }

      return NextResponse.json({ user: data });
    }

    return NextResponse.json({ error: "Ação inválida" }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
