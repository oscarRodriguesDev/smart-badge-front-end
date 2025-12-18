"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Plus, AlertTriangle, Calendar } from "lucide-react"

export default function AccidentesPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const acidentes = [
    {
      id: "ac-001",
      titulo: "Queda de objeto",
      colaborador: "João Silva",
      data: "2025-12-05",
      gravidade: "leve",
      descricao: "Queda de ferramenta em pé do colaborador",
      status: "registrado",
    },
    {
      id: "ac-002",
      titulo: "Batida/Pancada",
      colaborador: "Maria Santos",
      data: "2025-11-20",
      gravidade: "moderada",
      descricao: "Batida contra máquina durante operação",
      status: "investigado",
    },
    {
      id: "ac-003",
      titulo: "Ferimento por corte",
      colaborador: "Pedro Oliveira",
      data: "2025-10-15",
      gravidade: "leve",
      descricao: "Ferimento em mão durante manipulação",
      status: "encerrado",
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Registro de Acidentes</h1>
            <p className="text-foreground-secondary">Acompanhamento de ocorrências e investigações</p>
          </div>
          <button className="px-4 py-2 bg-danger hover:bg-danger/90 text-white rounded-lg transition-colors flex items-center gap-2 font-medium hidden sm:flex">
            <Plus className="w-4 h-4" />
            Novo Acidente
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-danger">{acidentes.length}</p>
            <p className="text-xs text-foreground-secondary mt-1">Total</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {acidentes.filter((a) => a.gravidade === "moderada").length}
            </p>
            <p className="text-xs text-foreground-secondary mt-1">Moderados</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-info">{acidentes.filter((a) => a.status === "encerrado").length}</p>
            <p className="text-xs text-foreground-secondary mt-1">Encerrados</p>
          </div>
        </div>

        {/* Accidents List */}
        <div className="space-y-4">
          {acidentes.map((acidente) => {
            const gravityColor =
              acidente.gravidade === "leve"
                ? "bg-info/10 text-info border-info/30"
                : acidente.gravidade === "moderada"
                  ? "bg-warning/10 text-warning border-warning/30"
                  : "bg-danger/10 text-danger border-danger/30"

            return (
              <div
                key={acidente.id}
                className={`border rounded-lg p-6 ${
                  acidente.status === "encerrado" ? "bg-surface/50 opacity-75" : "bg-surface border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">{acidente.titulo}</h3>
                      <p className="text-sm text-foreground-secondary">{acidente.colaborador}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`text-xs font-medium px-2 py-1 rounded border ${gravityColor}`}>
                      {acidente.gravidade === "leve"
                        ? "Leve"
                        : acidente.gravidade === "moderada"
                          ? "Moderado"
                          : "Grave"}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-surface-light border border-border text-foreground-secondary">
                      {acidente.status === "registrado"
                        ? "Registrado"
                        : acidente.status === "investigado"
                          ? "Investigado"
                          : "Encerrado"}
                    </span>
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b border-border">
                  <p className="text-sm text-foreground-secondary mb-2">{acidente.descricao}</p>
                  <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                    <Calendar className="w-4 h-4" />
                    {new Date(acidente.data).toLocaleDateString("pt-BR")}
                  </div>
                </div>

                <button className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                  Ver Detalhes e Investigação
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
