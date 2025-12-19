import { NextResponse } from "next/server";

// Essa rota recupera todos os colaboradores do endpoint externo
export async function GET() {
  try {
    const resp = await fetch("http://localhost:3000/api/users/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      return NextResponse.json(
        { error: "Falha ao buscar colaboradores externos" },
        { status: resp.status }
      );
    }

    const colaboradores = await resp.json();

    return NextResponse.json({ colaboradores });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar colaboradores" },
      { status: 500 }
    );
  }
}
