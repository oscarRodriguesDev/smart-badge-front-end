import { NextResponse } from "next/server";

/**
 * Esta rota serve para VINCULAR um novo item ao colaborador (crachá).
 * Espera receber: { userId: string, item: { nome, descricao, numeroSerie } }
 * Esta função vai propagar para o endpoint de vinculação: 
 *     POST http://localhost:3000/api/vincula
 * e repassar os dados do body.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, item } = body

    if (!userId || !item || !item.nome) {
      return NextResponse.json(
        { error: "Parâmetros obrigatórios ausentes (userId, item.nome)" },
        { status: 400 }
      )
    }

    const resp = await fetch(`${process.env.API_URL}/api/users/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        nome: item.nome,
        tipo: item.tipo ?? "PADRAO",
        Equipamento: item.Equipamento ?? "NAO_INFORMADO",
        Marca: item.Marca ?? "NAO_INFORMADO",
        Modelo: item.Modelo ?? "NAO_INFORMADO",
        numeroSerie: item.numeroSerie ?? "SEM_SERIE",
        descricao: item.descricao ?? null
      })
    })

    if (!resp.ok) {
      const errResp = await resp.json().catch(() => ({}))
      return NextResponse.json(
        { error: "Erro ao vincular item", detalhes: errResp },
        { status: resp.status }
      )
    }

    const resultado = await resp.json()

    return NextResponse.json({ vinculado: true, resultado })
  } catch (err) {
    return NextResponse.json(
      { error: "Erro interno ao vincular item", detalhes: err },
      { status: 500 }
    )
  }
}


/**
 * GET /api/items?userId=...
 * Retorna { usuario: {...}, itens: [ ... ] }
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('userId')

  if (!id) {
    return NextResponse.json(
      { message: 'Parâmetro userId é obrigatório' },
      { status: 400 }
    )
  }

  const resp = await fetch(
    `${process.env.API_URL}/api/users/items?userId=${id}`,
    { headers: { "Content-Type": "application/json" } }
  )

  if (!resp.ok) {
    return NextResponse.json(
      { message: 'Usuário nao encontrado' },
      { status: 404 }
    )
  }

  const data = await resp.json()

  return NextResponse.json({
    usuario: {
      id,
    },
    itens: data.itensViculados ?? data
  })
}


//deletar item
/**
 * DELETE /api/items?userId=...&itemId=...
 * Exclui/desvincula o item do usuário.
 */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const itemId = searchParams.get('itemId')

  if (!userId || !itemId) {
    return NextResponse.json(
      { message: 'Parâmetros userId e itemId são obrigatórios' },
      { status: 400 }
    )
  }

  // Requisição para deletar/desvincular o item
  const resp = await fetch(
    `${process.env.API_URL}/api/users/items?userId=${userId}&itemId=${itemId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  )

  if (!resp.ok) {
    return NextResponse.json(
      { message: 'Falha ao remover item do usuário' },
      { status: resp.status }
    )
  }

  const result = await resp.json()

  return NextResponse.json({
    message: "Item removido com sucesso",
    resultado: result
  })
}
