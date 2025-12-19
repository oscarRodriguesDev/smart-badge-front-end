import { NextResponse } from "next/server";

// Essa rota envia os dados do novo colaborador para o endpoint externo
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Envia os dados para o endpoint externo
    const resp = await fetch("http://localhost:3000/api/users/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Você pode repassar a resposta externa ou criar uma própria
    if (!resp.ok) {
      return NextResponse.json(
        { error: "Falha ao cadastrar colaborador externo" },
        { status: resp.status }
      );
    }

    const respData = await resp.json();

    return NextResponse.json({
      message: "Colaborador cadastrado com sucesso",
      colaborador: respData,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro no processamento do cadastro" },
      { status: 500 }
    );
  }
}

