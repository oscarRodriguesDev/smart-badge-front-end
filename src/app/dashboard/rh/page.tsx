"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { mockColaboradores } from "@/lib/mock-data"
import { DashboardLayout } from "../../../components/layouts/dashboard-layout"
import { UserPlus, Users, FileText } from "lucide-react"

export default function RHDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const stats = [
    { label: "Total Colaboradores", value: "120", icon: Users, color: "text-primary" },
    { label: "Novos (30 dias)", value: "8", icon: UserPlus, color: "text-success" },
    { label: "Admissões Pendentes", value: "3", icon: FileText, color: "text-warning" },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Gestão de Recursos Humanos</h1>
          <p className="text-foreground-secondary">Administre colaboradores e documentação</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/dashboard/rh/colaboradores")}
            className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold text-foreground mb-1">Colaboradores</h3>
            <p className="text-sm text-foreground-secondary">Lista completa e perfis</p>
          </button>

          <button
            onClick={() => router.push("/dashboard/rh/novo")}
            className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-2xl mb-2">➕</div>
            <h3 className="font-semibold text-foreground mb-1">Novo Colaborador</h3>
            <p className="text-sm text-foreground-secondary">Cadastro de admissão</p>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-foreground-secondary uppercase mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Employees */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Colaboradores Recentes</h2>
          <div className="space-y-2">
            {mockColaboradores.slice(0, 5).map((col) => (
              <div
                key={col.id}
                className="bg-surface border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary cursor-pointer transition-colors"
                onClick={() => router.push(`/dashboard/rh/colaboradores/${col.id}`)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={col.foto || "/placeholder.svg"}
                    alt={col.nome}
                    className="w-10 h-10 rounded-lg object-cover border border-border"
                  />
                  <div>
                    <p className="font-medium text-foreground">{col.nome}</p>
                    <p className="text-xs text-foreground-secondary">
                      {col.matricula} • {col.cargo}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  {col.status === "ativo" ? "Ativo" : "Inativo"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
