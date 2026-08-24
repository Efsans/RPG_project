import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, password, masterName, masterPassword } = await req.json();

    if (!name || !password || !masterName) {
      return NextResponse.json(
        { error: "Nome, senha e mestre são obrigatórios." },
        { status: 400 }
      );
    }
    
    // 0. (Opcional extra) Verificar senha do mestre de novo por segurança
    if (masterPassword && masterPassword !== "amemdoim23") {
       return NextResponse.json({ error: "Senha de mestre incorreta." }, { status: 403 });
    }

    // 1. Limpeza de salas velhas (mais de 24h) para não lotar o banco
    // Usamos uma data de 24 horas atrás
    const yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 24);
    await supabaseServer
      .from("rooms")
      .delete()
      .lt("created_at", yesterday.toISOString());

    // Gerar código de 6 caracteres aleatórios
    const code = crypto.randomBytes(3).toString("hex").toUpperCase();
    
    // Hash da senha
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    // 2. Inserir na tabela rooms
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

    // 3. Clonar templates de personagens (PCs) para a sala
    const { data: charTemplates } = await supabaseServer
      .from("characters")
      .select("*")
      .is("room_id", null);
      
    if (charTemplates && charTemplates.length > 0) {
      const clonedChars = charTemplates.map(t => {
        const { id, created_at, ...rest } = t;
        return { ...rest, room_id: room.id };
      });
      await supabaseServer.from("characters").insert(clonedChars);
    }

    // 4. Clonar templates de entidades (NPCs) para a sala
    const { data: entityTemplates } = await supabaseServer
      .from("entities")
      .select("*")
      .is("room_id", null);
      
    if (entityTemplates && entityTemplates.length > 0) {
      const clonedEntities = entityTemplates.map(t => {
        const { id, created_at, updated_at, ...rest } = t;
        return { ...rest, room_id: room.id };
      });
      await supabaseServer.from("entities").insert(clonedEntities);
    }

    // 5. Criar estado do mapa (sem tokens)
    await supabaseServer
      .from("map_states")
      .insert({
        room_id: room.id,
      });

    return NextResponse.json({ roomId: room.id, code });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
