"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Filter } from "lucide-react"

export default function EquipePage() {
  const [user, setUser] = useState<User | null>(null)
  const [filterStatus, setFilterStatus] = useState<"todos" | "apto" | "restrito" | "inativo">("todos")

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const team = [
    {
      id: 1,
      nome: "João Silva",
      cargo: "Operador",
      status: "apto",
      aso: "ativo",
      treinamentos: 3,
      nrs: 5,
      maquinas: 4,
    },
    {
      id: 2,
      nome: "Maria Santos",
      cargo: "QA",
      status: "apto",
      aso: "ativo",
      treinamentos: 2,
      nrs: 3,
      maquinas: 0,
    },
    {
      id: 3,
      nome: "Carlos Ferreira",
      cargo: "Manutentor",
      status: "restrito",
      aso: "vencido",
      treinamentos: 1,
      nrs: 2,
      maquinas: 0,
    },
    {
      id: 4,
      nome: "Ana Costa",
      cargo: "Operadora",
      status: "apto",
      aso: "ativo",
      treinamentos: 3,
      nrs: 5,
      maquinas: 3,
    },
    {
      id: 5,
      nome: "Pedro Gomes",
      cargo: "Operador",
      status: "apto",
      aso: "ativo",
      treinamentos: 3,
      nrs: 4,
      maquinas: 3,
    },
  ]

  const filtered = filterStatus === "todos" ? team : team.filter((t) => t.status === filterStatus)

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Minha Equipe</h1>
          <p className="text-foreground-secondary">Gestão e acompanhamento de colaboradores</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 items-center flex-wrap">
          <Filter className="w-5 h-5 text-foreground-secondary" />
          {(["todos", "apto", "restrito", "inativo"] as const).map((status) => (
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
                : status === "apto"
                  ? "Aptos"
                  : status === "restrito"
                    ? "Restritos"
                    : "Inativos"}
            </button>
          ))}
        </div>

        {/* Team Table */}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-light border-b border-border">
                <tr className="text-xs text-foreground-secondary uppercase font-semibold">
                  <th className="px-6 py-3 text-left">Colaborador</th>
                  <th className="px-6 py-3 text-left">Cargo</th>
                  <th className="px-6 py-3 text-center">ASO</th>
                  <th className="px-6 py-3 text-center">Trein.</th>
                  <th className="px-6 py-3 text-center">NRs</th>
                  <th className="px-6 py-3 text-center">Máquinas</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((member) => (
                  <tr key={member.id} className="hover:bg-surface-light transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{member.nome}</td>
                    <td className="px-6 py-4 text-sm text-foreground-secondary">{member.cargo}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          member.aso === "ativo" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                        }`}
                      >
                        {member.aso === "ativo" ? "✓" : "✗"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-foreground">{member.treinamentos}</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-foreground">{member.nrs}</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-foreground">{member.maquinas}</td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          member.status === "apto"
                            ? "bg-success/10 text-success"
                            : member.status === "restrito"
                              ? "bg-warning/10 text-warning"
                              : "bg-danger/10 text-danger"
                        }`}
                      >
                        {member.status === "apto" ? "Apto" : member.status === "restrito" ? "Restrito" : "Inativo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
