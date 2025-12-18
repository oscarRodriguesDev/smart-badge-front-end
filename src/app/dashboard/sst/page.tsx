"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../components/layouts/dashboard-layout"
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"

export default function SSTDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const riskItems = [
    { titulo: "NRs Próximas de Vencer", qtd: "2", icon: AlertTriangle, color: "text-warning" },
    { titulo: "Colaboradores Sem ASO", qtd: "5", icon: AlertCircle, color: "text-danger" },
    { titulo: "Máquinas em Manutenção", qtd: "1", icon: CheckCircle, color: "text-info" },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-warning/20 to-warning/10 border border-warning/30 rounded-lg p-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Segurança do Trabalho</h1>
          <p className="text-foreground-secondary">Gestão de conformidade e saúde ocupacional</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { label: "NRs", href: "/dashboard/sst/nrs", icon: "📋" },
            { label: "Treinamentos", href: "/dashboard/sst/treinamentos", icon: "🎓" },
            { label: "Máquinas", href: "/dashboard/sst/maquinas", icon: "⚙️" },
            { label: "EPIs", href: "/dashboard/sst/epis", icon: "🦺" },
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

        {/* Risk Alerts */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Alertas e Riscos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riskItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.titulo} className="bg-surface border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                    <span className="text-2xl font-bold text-foreground">{item.qtd}</span>
                  </div>
                  <p className="text-sm text-foreground-secondary">{item.titulo}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* NR Overview */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Normas Regulamentadoras Ativas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { numero: "NR-1", titulo: "Disposições Gerais", status: "ativo" },
              { numero: "NR-6", titulo: "Equipamento de Proteção Individual", status: "ativo" },
              { numero: "NR-12", titulo: "Máquinas e Equipamentos", status: "ativo" },
              { numero: "NR-17", titulo: "Ergonomia", status: "ativo" },
            ].map((nr) => (
              <div key={nr.numero} className="bg-surface border border-border rounded-lg p-4">
                <p className="text-xs text-primary font-semibold uppercase mb-1">{nr.numero}</p>
                <h3 className="font-semibold text-foreground mb-2">{nr.titulo}</h3>
                <span className="text-xs px-2 py-1 bg-success/10 text-success rounded">Ativo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
