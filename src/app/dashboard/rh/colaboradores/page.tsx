"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Search, Filter } from "lucide-react"

type Colaborador = {
  id: string
  nome: string
  matricula: string
  cargo: string
  setor?: string
  email?: string
  foto?: string | null
  telefone?: string
  endereco?: string
  status?: string
  dataAdmissao?: string
}

export default function ColaboradoresPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"todos" | "ativo" | "inativo">(
    "todos"
  )

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch("/api/colaboradores/users")
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar colaboradores")
        const data = await res.json()
        setColaboradores(data.colaboradores || [])
      })
      .catch((err) => setError(err.message || "Erro inesperado"))
      .finally(() => setLoading(false))
  }, [])

  const normalizedStatus = (status?: string) => {
    if (!status) return "outro"
    const s = status.toLowerCase()
    if (s === "ativo") return "ativo"
    if (s === "inativo") return "inativo"
    return "outro"
  }

  const filtered = colaboradores.filter((col) => {
    const matchesSearch =
      !searchTerm ||
      col.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      col.matricula?.includes(searchTerm) ||
      col.cargo?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      filterStatus === "todos" ||
      normalizedStatus(col.status) === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Lista de Colaboradores
            </h1>
            <p className="text-foreground-secondary">
              Total: {filtered.length} colaboradores
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/rh/novo")}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium hidden sm:block"
          >
            + Novo Colaborador
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, matrícula ou cargo..."
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-foreground-secondary focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <Filter className="w-5 h-5 text-foreground-secondary" />
            {(["todos", "ativo", "inativo"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  filterStatus === status
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-foreground hover:bg-surface-light"
                }`}
              >
                {status === "todos"
                  ? "Todos"
                  : status === "ativo"
                  ? "Ativos"
                  : "Inativos"}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <p className="animate-pulse text-foreground-secondary">
              Carregando colaboradores...
            </p>
          </div>
        )}

        {error && (
          <div className="flex justify-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((col) => (
              <div
                key={col.id}
                className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
                onClick={() =>
                  router.push(`/dashboard/rh/colaboradores/${col.id}`)
                }
              >
                <div className="flex gap-4 mb-4">
                  <img
                    src={col.foto || "/placeholder.svg"}
                    alt={col.nome}
                    className="w-16 h-16 rounded-lg object-cover border border-border bg-white"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {col.nome || (
                        <span className="italic text-foreground-secondary">
                          Sem nome
                        </span>
                      )}
                    </h3>

                    <p className="text-xs text-foreground-secondary mb-2">
                      {col.matricula || (
                        <span className="italic">Sem matrícula</span>
                      )}
                    </p>

                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        normalizedStatus(col.status) === "ativo"
                          ? "bg-success/10 text-success"
                          : normalizedStatus(col.status) === "inativo"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {normalizedStatus(col.status) === "ativo"
                        ? "Ativo"
                        : normalizedStatus(col.status) === "inativo"
                        ? "Inativo"
                        : col.status || "?"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm text-foreground-secondary">
                  <p>
                    <strong>Cargo:</strong>{" "}
                    {col.cargo || (
                      <span className="italic">Não informado</span>
                    )}
                  </p>

                  <p>
                    <strong>Setor:</strong>{" "}
                    {col.setor || (
                      <span className="italic">Não informado</span>
                    )}
                  </p>

                  <p>
                    <strong>Admissão:</strong>{" "}
                    {col.dataAdmissao
                      ? new Date(col.dataAdmissao).toLocaleDateString("pt-BR")
                      : <span className="italic">Não informada</span>}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {col.email || (
                      <span className="italic">Não informado</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground-secondary">
              Nenhum colaborador encontrado
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
