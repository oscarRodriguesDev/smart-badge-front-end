"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Download, Filter } from "lucide-react"

export default function HistoricoPage() {
  const [user, setUser] = useState<User | null>(null)
  const [filterStatus, setFilterStatus] = useState<"todos" | "permitido" | "bloqueado">("todos")

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const historico = [
    { nome: "João Silva", matricula: "MAT-001", tipo: "saida", hora: "17:45", status: "permitido", data: "13/12" },
    { nome: "Maria Santos", matricula: "MAT-006", tipo: "entrada", hora: "17:35", status: "permitido", data: "13/12" },
    { nome: "Carlos Ferreira", matricula: "MAT-007", tipo: "saida", hora: "17:30", status: "bloqueado", data: "13/12" },
    { nome: "Ana Garcia", matricula: "MAT-005", tipo: "entrada", hora: "17:25", status: "permitido", data: "13/12" },
    {
      nome: "Pedro Oliveira",
      matricula: "MAT-004",
      tipo: "entrada",
      hora: "08:00",
      status: "permitido",
      data: "13/12",
    },
    {
      nome: "João Silva",
      matricula: "MAT-001",
      tipo: "saida",
      hora: "17:50",
      status: "permitido",
      data: "12/12",
    },
    { nome: "Maria Santos", matricula: "MAT-006", tipo: "entrada", hora: "08:15", status: "permitido", data: "12/12" },
  ]

  const filtered = filterStatus === "todos" ? historico : historico.filter((h) => h.status === filterStatus)

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Histórico de Acessos</h1>
            <p className="text-foreground-secondary">Todos os acessos registrados</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">{historico.length}</p>
            <p className="text-xs text-foreground-secondary mt-1">Total</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {historico.filter((h) => h.status === "permitido").length}
            </p>
            <p className="text-xs text-foreground-secondary mt-1">Permitidos</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-danger">{historico.filter((h) => h.status === "bloqueado").length}</p>
            <p className="text-xs text-foreground-secondary mt-1">Bloqueados</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 items-center flex-wrap">
          <Filter className="w-5 h-5 text-foreground-secondary" />
          <div className="flex gap-2 flex-wrap">
            {(["todos", "permitido", "bloqueado"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  filterStatus === status
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-foreground hover:bg-surface-light"
                }`}
              >
                {status === "todos" ? "Todos" : status === "permitido" ? "Permitidos" : "Bloqueados"}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-light border-b border-border">
                <tr className="text-xs text-foreground-secondary uppercase font-semibold">
                  <th className="px-6 py-3 text-left">Colaborador</th>
                  <th className="px-6 py-3 text-left">Matrícula</th>
                  <th className="px-6 py-3 text-left">Tipo</th>
                  <th className="px-6 py-3 text-left">Data/Hora</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((record, i) => (
                  <tr key={i} className="hover:bg-surface-light transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{record.nome}</td>
                    <td className="px-6 py-4 text-sm text-foreground-secondary">{record.matricula}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={record.tipo === "entrada" ? "text-info" : "text-warning"}>
                        {record.tipo === "entrada" ? "Entrada" : "Saída"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground-secondary">
                      {record.data} {record.hora}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          record.status === "permitido" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                        }`}
                      >
                        {record.status === "permitido" ? "Permitido" : "Bloqueado"}
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
