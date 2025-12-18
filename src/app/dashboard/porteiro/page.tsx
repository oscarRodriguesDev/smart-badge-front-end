"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../components/layouts/dashboard-layout"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

export default function PorteiroDashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const stats = [
    { label: "Entradas Hoje", value: "42", icon: CheckCircle, color: "text-success" },
    { label: "Saídas Hoje", value: "38", icon: CheckCircle, color: "text-success" },
    { label: "Bloqueados", value: "3", icon: XCircle, color: "text-danger" },
    { label: "Pendentes", value: "1", icon: AlertCircle, color: "text-warning" },
  ]

  const recentAccess = [
    { nome: "João Silva", matrícula: "MAT-001", tipo: "entrada", hora: "17:45", status: "permitido" },
    { nome: "Maria Santos", matrícula: "MAT-006", tipo: "saida", hora: "17:40", status: "permitido" },
    { nome: "Carlos Ferreira", matrícula: "MAT-007", tipo: "entrada", hora: "17:35", status: "bloqueado" },
    { nome: "Ana Garcia", matrícula: "MAT-005", tipo: "saida", hora: "17:30", status: "permitido" },
    { nome: "Pedro Oliveira", matrícula: "MAT-004", tipo: "entrada", hora: "17:25", status: "permitido" },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Dashboard de Controle de Acesso</h1>
          <p className="text-foreground-secondary">Monitore as entradas e saídas em tempo real</p>
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() =>
              document.querySelector("a[href='/dashboard/porteiro/validar']")?.dispatchEvent(new Event("click"))
            }
            className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-foreground mb-1">Validar Crachá</h3>
            <p className="text-sm text-foreground-secondary">Ler QR Code para validação</p>
          </button>

          <button
            onClick={() =>
              document.querySelector("a[href='/dashboard/porteiro/registro']")?.dispatchEvent(new Event("click"))
            }
            className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-2xl mb-2">✓</div>
            <h3 className="font-semibold text-foreground mb-1">Registrar Acesso</h3>
            <p className="text-sm text-foreground-secondary">Entrada/Saída manual</p>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-foreground-secondary uppercase">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Access */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Acessos Recentes</h2>
          <div className="space-y-2">
            {recentAccess.map((access, i) => (
              <div
                key={i}
                className={`border rounded-lg p-4 flex items-center justify-between ${
                  access.status === "permitido"
                    ? "bg-success/5 border-success/30"
                    : access.status === "bloqueado"
                      ? "bg-danger/5 border-danger/30"
                      : "bg-warning/5 border-warning/30"
                }`}
              >
                <div>
                  <p className="font-medium text-foreground">{access.nome}</p>
                  <p className="text-xs text-foreground-secondary">
                    {access.matrícula} • {access.tipo === "entrada" ? "Entrada" : "Saída"} • {access.hora}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    access.status === "permitido" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                  }`}
                >
                  {access.status === "permitido" ? "Permitido" : "Bloqueado"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
