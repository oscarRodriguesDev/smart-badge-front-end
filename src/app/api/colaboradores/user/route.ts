import { NextResponse } from "next/server";

// Essa rota busca um colaborador pelo ID na API de perfis de usuários

/* 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const cpf = searchParams.get("cpf");

    if (!id && !cpf) {
      return NextResponse.json(
        { error: "ID ou CPF do colaborador não informado" },
        { status: 400 }
      );
    }

    let userApiUrl: string;
    if (id) {
      // Busca usuário por ID
      userApiUrl = `${process.env.API_URL}/api/users/profile?id=${id}`;
    } else {
      // Busca usuário por CPF
      userApiUrl = `${process.env.API_URL}/api/users/profile?cpf=${cpf}`;
    }

    const resp = await fetch(userApiUrl, {
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

 */


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const cpf = searchParams.get("cpf")

    if (!id && !cpf) {
      return NextResponse.json(
        { error: "ID ou CPF do colaborador não informado" },
        { status: 400 }
      )
    }

    const userApiUrl = id
      ? `${process.env.API_URL}/api/users/profile?id=${id}`
      : `${process.env.API_URL}/api/users/profile?cpf=${cpf}`

    const resp = await fetch(userApiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })

    if (!resp.ok) {
      return NextResponse.json(
        { error: "Colaborador não encontrado" },
        { status: resp.status }
      )
    }

    const colaborador = await resp.json()

    // 🔴 retorno direto, sem wrapper
    return NextResponse.json(colaborador)
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar colaborador" },
      { status: 500 }
    )
  }
}
