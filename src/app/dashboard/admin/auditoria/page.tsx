"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Filter } from "lucide-react"

export default function AuditoriaPage() {
  const [user, setUser] = useState<User | null>(null)
  const [filterType, setFilterType] = useState<"todos" | "login" | "criacao" | "edicao" | "delecao">("todos")

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const logs = [
    {
      id: 1,
      tipo: "login",
      usuario: "João Silva",
      acao: "Login realizado",
      recurso: "Sistema",
      data: "13/12/2025 17:45",
    },
    {
      id: 2,
      tipo: "criacao",
      usuario: "Maria Costa",
      acao: "Novo colaborador criado",
      recurso: "Pedro Gomes - MAT-2024-010",
      data: "13/12/2025 14:30",
    },
    {
      id: 3,
      tipo: "edicao",
      usuario: "Pedro Oliveira",
      acao: "Documentação atualizada",
      recurso: "João Silva - ASO",
      data: "13/12/2025 10:15",
    },
    {
      id: 4,
      tipo: "login",
      usuario: "Ana Garcia",
      acao: "Login realizado",
      recurso: "Sistema",
      data: "12/12/2025 18:00",
    },
  ]

  const typeColor: Record<string, string> = {
    login: "bg-info/10 text-info",
    criacao: "bg-success/10 text-success",
    edicao: "bg-primary/10 text-primary",
    delecao: "bg-danger/10 text-danger",
  }

  const filtered = filterType === "todos" ? logs : logs.filter((l) => l.tipo === filterType)

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Log de Auditoria</h1>
          <p className="text-foreground-secondary">Rastreamento de ações no sistema</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 items-center flex-wrap">
          <Filter className="w-5 h-5 text-foreground-secondary" />
          {(["todos", "login", "criacao", "edicao", "delecao"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                filterType === type
                  ? "bg-primary text-white"
                  : "bg-surface border border-border text-foreground hover:bg-surface-light"
              }`}
            >
              {type === "todos"
                ? "Todos"
                : type === "login"
                  ? "Logins"
                  : type === "criacao"
                    ? "Criações"
                    : type === "edicao"
                      ? "Edições"
                      : "Exclusões"}
            </button>
          ))}
        </div>

        {/* Audit Log */}
        <div className="space-y-2">
          {filtered.map((log) => (
            <div key={log.id} className="bg-surface border border-border rounded-lg p-4 flex items-start gap-4">
              <span className={`text-xs font-medium px-2 py-1 rounded ${typeColor[log.tipo]}`}>
                {log.tipo.toUpperCase()}
              </span>
              <div className="flex-1">
                <p className="font-medium text-foreground">{log.acao}</p>
                <p className="text-sm text-foreground-secondary">
                  Por: {log.usuario} • Recurso: {log.recurso}
                </p>
                <p className="text-xs text-foreground-secondary mt-1">{log.data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
