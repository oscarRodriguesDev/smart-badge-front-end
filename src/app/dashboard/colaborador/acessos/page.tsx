"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Download, Filter } from "lucide-react"

export default function AcessosPage() {
  const [user, setUser] = useState<User | null>(null)
  const [filterType, setFilterType] = useState<"todos" | "entrada" | "saida">("todos")

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const acessos = [
    { data: "13/12/2025", hora: "17:45", tipo: "saida", local: "Portaria Principal", status: "Permitido" },
    { data: "13/12/2025", hora: "13:15", tipo: "entrada", local: "Portaria Principal", status: "Permitido" },
    { data: "13/12/2025", hora: "12:30", tipo: "saida", local: "Portaria Principal", status: "Permitido" },
    { data: "13/12/2025", hora: "08:15", tipo: "entrada", local: "Portaria Principal", status: "Permitido" },
    { data: "12/12/2025", hora: "17:50", tipo: "saida", local: "Portaria Principal", status: "Permitido" },
    { data: "12/12/2025", hora: "08:00", tipo: "entrada", local: "Portaria Principal", status: "Permitido" },
    { data: "11/12/2025", hora: "18:00", tipo: "saida", local: "Portaria Principal", status: "Permitido" },
    { data: "11/12/2025", hora: "07:30", tipo: "entrada", local: "Portaria Principal", status: "Bloqueado" },
  ]

  const filtered = filterType === "todos" ? acessos : acessos.filter((a) => a.tipo === filterType)

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Histórico de Acessos</h1>
            <p className="text-foreground-secondary">Registros dos últimos 30 dias</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">{acessos.length}</p>
            <p className="text-xs text-foreground-secondary mt-1">Total de Acessos</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-success">{acessos.filter((a) => a.status === "Permitido").length}</p>
            <p className="text-xs text-foreground-secondary mt-1">Permitidos</p>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-danger">{acessos.filter((a) => a.status === "Bloqueado").length}</p>
            <p className="text-xs text-foreground-secondary mt-1">Bloqueados</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <Filter className="w-5 h-5 text-foreground-secondary mt-2" />
          <div className="flex gap-2 flex-wrap">
            {(["todos", "entrada", "saida"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  filterType === type
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-foreground hover:bg-surface-light"
                }`}
              >
                {type === "todos" ? "Todos" : type === "entrada" ? "Entrada" : "Saída"}
              </button>
            ))}
          </div>
        </div>

        {/* Access Records */}
        <div className="space-y-2">
          {filtered.map((acesso, i) => (
            <div
              key={i}
              className={`border rounded-lg p-4 flex items-center justify-between ${
                acesso.status === "Permitido" ? "bg-success/5 border-success/30" : "bg-danger/5 border-danger/30"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${acesso.tipo === "entrada" ? "bg-info" : "bg-warning"}`}></div>
                  <div>
                    <p className="font-medium text-foreground">
                      {acesso.tipo === "entrada" ? "Entrada" : "Saída"} - {acesso.local}
                    </p>
                    <p className="text-xs text-foreground-secondary">
                      {acesso.data} às {acesso.hora}
                    </p>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  acesso.status === "Permitido" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                }`}
              >
                {acesso.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
