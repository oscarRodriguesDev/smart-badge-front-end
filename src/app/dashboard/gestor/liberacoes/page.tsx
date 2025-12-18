"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { CheckCircle, Clock } from "lucide-react"

export default function LiberacoesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [filterStatus, setFilterStatus] = useState<"pendentes" | "aprovadas" | "rejeitadas">("pendentes")

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const approvals = [
    {
      id: 1,
      tipo: "Operação de Máquina",
      colaborador: "João Silva",
      maquina: "Prensa Hidráulica A2",
      data: "13/12/2025",
      status: "pendente",
    },
    {
      id: 2,
      tipo: "Atividade Especial",
      colaborador: "Maria Santos",
      descricao: "Trabalho em altura - Setor de Manutenção",
      data: "13/12/2025",
      status: "pendente",
    },
    {
      id: 3,
      tipo: "Operação de Máquina",
      colaborador: "Carlos Ferreira",
      maquina: "Esmerilhadeira E1",
      data: "12/12/2025",
      status: "aprovada",
    },
    {
      id: 4,
      tipo: "Atividade Especial",
      colaborador: "Pedro Oliveira",
      descricao: "Solda - Setor de Fabricação",
      data: "10/12/2025",
      status: "rejeitada",
    },
  ]

  const filtered = approvals.filter((a) => a.status === filterStatus)

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Aprovações Operacionais</h1>
          <p className="text-foreground-secondary">Liberações de máquinas e atividades especiais</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {(["pendentes", "aprovadas", "rejeitadas"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                filterStatus === status
                  ? "bg-primary text-white"
                  : "bg-surface border border-border text-foreground hover:bg-surface-light"
              }`}
            >
              {status === "pendentes" ? "Pendentes" : status === "aprovadas" ? "Aprovadas" : "Rejeitadas"}
            </button>
          ))}
        </div>

        {/* Approvals List */}
        <div className="space-y-4">
          {filtered.map((approval) => (
            <div
              key={approval.id}
              className={`border rounded-lg p-6 ${
                approval.status === "pendente"
                  ? "bg-warning/5 border-warning/30"
                  : approval.status === "aprovada"
                    ? "bg-success/5 border-success/30"
                    : "bg-danger/5 border-danger/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{approval.tipo}</h3>
                    <span className="text-xs bg-surface px-2 py-1 rounded text-foreground-secondary">
                      {approval.data}
                    </span>
                  </div>
                  <p className="text-sm text-foreground-secondary mb-2">{approval.colaborador}</p>
                  <p className="text-sm text-foreground">{approval.maquina || approval.descricao}</p>
                </div>
                <div className="flex gap-2">
                  {approval.status === "pendente" ? (
                    <>
                      <button className="px-4 py-2 bg-success hover:bg-success/90 text-white rounded-lg transition-colors font-medium text-sm">
                        Aprovar
                      </button>
                      <button className="px-4 py-2 bg-danger hover:bg-danger/90 text-white rounded-lg transition-colors font-medium text-sm">
                        Rejeitar
                      </button>
                    </>
                  ) : approval.status === "aprovada" ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <Clock className="w-6 h-6 text-danger" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
