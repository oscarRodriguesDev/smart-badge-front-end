"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "../../../../../components/layouts/dashboard-layout"
import { ArrowLeft, Edit2, FileText, CheckCircle } from "lucide-react"

type Colaborador = {
  id: string
  nome: string
  matricula: string
  cargo: string
  setor?: string | null
  email?: string | null
  foto?: string | null
  telefone?: string | null
  endereco?: string | null
  status?: string
  dataAdmissao?: string | null
  treinamentos?: Array<{
    nome: string
    venceEm?: string | null
    status: string
  }>
}

export default function ColaboradorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [colaborador, setColaborador] = useState<Colaborador | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchColaborador = async () => {
      setLoading(true)
      setError(null)

      try {
        const resp = await fetch(`/api/colaboradores/user?id=${params.id}`)
        if (!resp.ok) throw new Error("Colaborador não encontrado")

        const data = await resp.json()

        const raw = Array.isArray(data.colaborador)
          ? data.colaborador.find((c: any) => c.id === params.id)
          : data.colaborador

        if (!raw) throw new Error("Colaborador não encontrado")

        setColaborador({
          id: raw.id,
          nome: raw.nome,
          matricula: raw.matricula,
          cargo: raw.cargo,
          setor: raw.setor,
          email: raw.email,
          foto: raw.foto || raw.urlPhoto,
          telefone: raw.telefone,
          endereco: raw.endereco,
          status: raw.situacaoGeral?.toLowerCase(),
          dataAdmissao: raw.createdAt,
          treinamentos: raw.treinamentos || [],
        })
      } catch {
        setError("Erro ao buscar colaborador")
        setColaborador(null)
      } finally {
        setLoading(false)
      }
    }

    fetchColaborador()
  }, [params.id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-12">
          <p className="animate-pulse text-foreground-secondary">
            Carregando colaborador...
          </p>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !colaborador) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-12">
          <p className="text-red-500">{error || "Colaborador não encontrado"}</p>
        </div>
      </DashboardLayout>
    )
  }

  const documents = [
    { nome: "CPF", status: "ativo", data: "2025-12-31" },
    { nome: "RG", status: "ativo", data: "2025-12-31" },
  ]

  const certifications =
    colaborador.treinamentos && colaborador.treinamentos.length > 0
      ? colaborador.treinamentos.map((t) => ({
          nome: t.nome,
          dataVencimento: t.venceEm || "",
          status: t.status,
        }))
      : []

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex gap-6 items-start mb-6">
            <img
              src={colaborador.foto || "/placeholder.svg"}
              alt={colaborador.nome}
              className="w-24 h-24 rounded-lg object-cover border border-border"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {colaborador.nome}
              </h1>
              <p className="text-foreground-secondary mb-4">
                {colaborador.cargo}
              </p>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  colaborador.status === "ativo"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {colaborador.status === "ativo" ? "Ativo" : "Inativo"}
              </span>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-6">
            {[
              { label: "Matrícula", value: colaborador.matricula },
              { label: "Email", value: colaborador.email },
              { label: "Telefone", value: colaborador.telefone },
              { label: "Setor", value: colaborador.setor },
              {
                label: "Admissão",
                value: colaborador.dataAdmissao
                  ? new Date(colaborador.dataAdmissao).toLocaleDateString("pt-BR")
                  : null,
              },
              { label: "Endereço", value: colaborador.endereco },
            ].map((field, i) => (
              <div key={i}>
                <label className="text-xs text-foreground-secondary uppercase font-semibold block mb-1">
                  {field.label}
                </label>
                <p className="text-foreground">
                  {field.value || (
                    <span className="italic">Não informado</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Documentação
          </h2>
          <div className="space-y-2">
            {documents.map((doc, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{doc.nome}</p>
                    <p className="text-xs text-foreground-secondary">
                      Válido até {doc.data}
                    </p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Treinamentos e Certificações
          </h2>
          <div className="space-y-2">
            {certifications.length > 0 ? (
              certifications.map((cert, i) => (
                <div
                  key={i}
                  className={`border rounded-lg p-4 flex items-center justify-between ${
                    cert.status === "ativo"
                      ? "bg-success/5 border-success/30"
                      : "bg-danger/5 border-danger/30"
                  }`}
                >
                  <div>
                    <p className="font-medium text-foreground">{cert.nome}</p>
                    <p className="text-xs text-foreground-secondary">
                      {cert.dataVencimento
                        ? `Válido até ${cert.dataVencimento}`
                        : "Data não informada"}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      cert.status === "ativo"
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {cert.status === "ativo" ? "Ativo" : "Vencido"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-foreground-secondary italic">
                Nenhum treinamento registrado.
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
