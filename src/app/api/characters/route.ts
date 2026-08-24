import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");

    let query = supabaseServer.from("characters").select("*");
    
    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ characters: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const charData = await req.json();
    
    // Calcula HP Inicial: 3 x Dado de Vida (assumindo d10 base para MVP = 30) + (CON - 10)/2
    // Se não quisermos complexidade, deixamos pro cliente passar o HP, ou usamos o default.
    // Vamos confiar no payload enviado para o MVP.

    const { data, error } = await supabaseServer
      .from("characters")
      .insert([charData])
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ character: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
