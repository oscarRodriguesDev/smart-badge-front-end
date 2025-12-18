"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../components/layouts/dashboard-layout"
import { Users, Lock, Database } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const adminStats = [
    { label: "Usuários do Sistema", value: "156", icon: Users, color: "text-primary" },
    { label: "Máquinas Cadastradas", value: "24", icon: Database, color: "text-info" },
    { label: "Perfis de Acesso", value: "6", icon: Lock, color: "text-warning" },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-danger/20 to-danger/10 border border-danger/30 rounded-lg p-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Administração do Sistema</h1>
          <p className="text-foreground-secondary">Gerenciamento completo e configurações</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Usuários", href: "/dashboard/admin/usuarios", icon: "👤" },
            { label: "Máquinas", href: "/dashboard/admin/maquinas", icon: "⚙️" },
            { label: "Configurações", href: "/dashboard/admin/config", icon: "🔧" },
            { label: "Auditoria", href: "/dashboard/admin/auditoria", icon: "📋" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-left"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-foreground">{item.label}</h3>
            </button>
          ))}
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {adminStats.map((stat) => {
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

        {/* System Health */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Saúde do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Status do Servidor", status: "Online", color: "success" },
              { label: "Banco de Dados", status: "Conectado", color: "success" },
              { label: "Integração SST", status: "Ativo", color: "success" },
              { label: "Backups", status: "Última: há 2h", color: "info" },
            ].map((item, i) => (
              <div key={i} className="bg-surface border border-border rounded-lg p-4">
                <p className="text-xs text-foreground-secondary uppercase mb-1">{item.label}</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color === "success" ? "bg-success" : "bg-info"}`}></div>
                  <p className="font-medium text-foreground">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
