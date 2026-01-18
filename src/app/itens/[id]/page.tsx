"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "../../../components/layouts/dashboard-layout"
import { ArrowLeft, Plus, CheckCircle, AlertTriangle } from "lucide-react"

type Item = {
  id?: string
  nome: string
  tipo?: string
  Equipamento?: string
  Marca?: string
  Modelo?: string
  numeroSerie?: string
  descricao?: string
}

type Usuario = {
  id: string
  nome: string
  itensCracha: Item[]
}

export default function AdicionarItensCrachaPage() {
  const params = useParams()
  const router = useRouter()

  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [itens, setItens] = useState<Item[]>([])
  const [adicionando, setAdicionando] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const [form, setForm] = useState<Item>({
    nome: "",
    tipo: "",
    Equipamento: "",
    Marca: "",
    Modelo: "",
    numeroSerie: "",
    descricao: ""
  })

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const resp = await fetch(`/api/items?userId=${params.id}`)
        if (!resp.ok) throw new Error()

        const data = await resp.json()

        setUsuario({
          id: data.usuario.id,
          nome: data.usuario.nome,
          itensCracha: data.itens || []
        })
        setItens(data.itens || [])
      } catch {
        setError("Erro ao buscar usuário")
      } finally {
        setLoading(false)
      }
    }

    fetchUsuario()
  }, [params.id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleAdicionarItem = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdicionando(true)
    setSucesso(false)
    setError(null)

    try {
      const resp = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: usuario?.id,
          item: {
            nome: form.nome,
            tipo: form.tipo,
            Equipamento: form.Equipamento,
            Marca: form.Marca,
            Modelo: form.Modelo,
            numeroSerie: form.numeroSerie,
            descricao: form.descricao
          }
        })
      })

      if (!resp.ok) throw new Error()

      const data = await resp.json()

      setItens((prev) => [...prev, data.resultado])
      setForm({
        nome: "",
        tipo: "",
        Equipamento: "",
        Marca: "",
        Modelo: "",
        numeroSerie: "",
        descricao: ""
      })
      setSucesso(true)
    } catch {
      setError("Erro ao adicionar item")
    } finally {
      setAdicionando(false)
    }
  }

  // Função para deletar/desvincular um item do usuário
  const handleDeletarItem = async (itemId: string) => {
    if (!usuario?.id || !itemId) return

    if (!window.confirm("Tem certeza que deseja remover este item?")) return

    setAdicionando(true)
    setError(null)
    setSucesso(false)

    try {
      const resp = await fetch(`/api/items?userId=${usuario.id}&itemId=${itemId}`, {
        method: "DELETE"
      })

      if (!resp.ok) throw new Error()

      setItens(prev => prev.filter(item => item.id !== itemId))
      setSucesso(true)
    } catch {
      setError("Erro ao remover item")
    } finally {
      setAdicionando(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-12">
          <p>Carregando...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !usuario) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center py-20">
          <AlertTriangle className="w-10 h-10 text-red-500 mb-4" />
          <p className="text-red-500">{error}</p>
          <button onClick={() => router.back()} className="mt-6">
            <ArrowLeft className="w-4 h-4 inline" /> Voltar
          </button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto mt-8 p-8 border rounded-lg">
        <button onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 inline" /> Voltar
        </button>

        <h2 className="text-2xl mb-6">
          Itens do crachá — {usuario.nome}
        </h2>

        <form onSubmit={handleAdicionarItem} className="space-y-3 mb-8">
          {[
            ["nome", "Nome *"],
            ["tipo", "Tipo"],
            ["Equipamento", "Equipamento"],
            ["Marca", "Marca"],
            ["Modelo", "Modelo"],
            ["numeroSerie", "Número de série"]
          ].map(([name, label]) => (
            <input
              key={name}
              name={name}
              placeholder={label}
              value={(form as any)[name]}
              onChange={handleChange}
              required={name === "nome"}
              className="w-full border px-3 py-2 rounded"
            />
          ))}

          <textarea
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={2}
          />

          <button
            type="submit"
            disabled={adicionando || !form.nome}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            <Plus className="w-4 h-4" />
            {adicionando ? "Adicionando..." : "Adicionar item"}
          </button>

          {sucesso && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              Item adicionado
            </div>
          )}
        </form>

        <ul className="space-y-3">
          {itens.map((item, i) => (
            <li key={i} className="border-b pb-2">
              <strong>{item.nome}</strong>
              {item.numeroSerie && <div>Nº Série: {item.numeroSerie}</div>}
              {item.descricao && <div>{item.descricao}</div>}
              <button
                onClick={() => item.id && handleDeletarItem(String(item.id))}
                className="text-red-500"
              >
                {/* Replace <Trash /> with a fallback icon or text if Trash is unavailable */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  )
}
