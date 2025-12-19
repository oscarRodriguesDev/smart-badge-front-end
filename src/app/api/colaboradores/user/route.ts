import { NextResponse } from "next/server";

// Essa rota busca um colaborador pelo ID na API de perfis de usuários
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID do colaborador não informado" },
        { status: 400 }
      );
    }

    // Busca usuário por ID na API
    const resp = await fetch(`http://localhost:3000/api/users/profile?id=${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      return NextResponse.json(
        { error: "Colaborador não encontrado" },
        { status: resp.status }
      );
    }

    const colaborador = await resp.json();

    return NextResponse.json({ colaborador });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar colaborador" },
      { status: 500 }
    );
  }
}
