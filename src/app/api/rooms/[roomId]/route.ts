import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function DELETE(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const roomId = params.roomId;
    
    if (!roomId) {
      return NextResponse.json({ error: "ID da sala obrigatório." }, { status: 400 });
    }

    const { error } = await supabaseServer
      .from("rooms")
      .delete()
      .eq("id", roomId);

    if (error) {
      console.error("Erro ao deletar sala:", error);
      return NextResponse.json({ error: "Erro interno ao deletar sala." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
