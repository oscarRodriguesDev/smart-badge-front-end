"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../components/layouts/dashboard-layout"
import { useIsMobile } from "@/hooks/use-mobile"
import { CheckCircle } from "lucide-react"

export default function ColaboradorHome() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const statusCards = [
    {
      label: "ASO",
      status: "liberado",
      icon: CheckCircle,
      color: "bg-success/10 text-success",
    },
    {
      label: "Treinamentos",
      status: "completo",
      icon: CheckCircle,
      color: "bg-success/10 text-success",
    },
    {
      label: "NRs",
      status: "completo",
      icon: CheckCircle,
      color: "bg-success/10 text-success",
    },
    {
      label: "Máquinas",
      status: "liberado",
      icon: CheckCircle,
      color: "bg-success/10 text-success",
    },
  ]

  return (
    <DashboardLayout>
      <div className={`${isMobile ? "p-4 pb-24" : "p-4 lg:p-6"} max-w-6xl mx-auto space-y-6`}>
        {/* Welcome Section */}
        <div
          className={`bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-${isMobile ? "4" : "6"}`}
        >
          <h1 className={`font-bold text-foreground mb-2 ${isMobile ? "text-xl" : "text-2xl lg:text-3xl"}`}>
            Bem-vindo, {user.nome}!
          </h1>
          <p className="text-foreground-secondary text-sm">{user.matricula}</p>
        </div>

        {/* Quick Access Cards - 2 columns on mobile, 4 on desktop */}
        <div className={`grid gap-4 ${isMobile ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}>
          <button
            onClick={() => router.push("/dashboard/colaborador/cracha")}
            className="bg-surface border border-border rounded-lg p-4 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-xl mb-2">🏷️</div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">Meu Crachá</h3>
            <p className="text-xs text-foreground-secondary">Digital</p>
          </button>

          <button
            onClick={() => router.push("/dashboard/colaborador/status")}
            className="bg-surface border border-border rounded-lg p-4 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-xl mb-2">📋</div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">Status</h3>
            <p className="text-xs text-foreground-secondary">Liberações</p>
          </button>

          <button
            onClick={() => router.push("/dashboard/colaborador/acessos")}
            className="bg-surface border border-border rounded-lg p-4 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-xl mb-2">📍</div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">Histórico</h3>
            <p className="text-xs text-foreground-secondary">Acessos</p>
          </button>

          <button
            onClick={() => router.push("/dashboard/colaborador/notificacoes")}
            className="bg-surface border border-border rounded-lg p-4 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-xl mb-2">🔔</div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">Avisos</h3>
            <p className="text-xs text-foreground-secondary">Notificações</p>
          </button>
        </div>

        {/* Status Overview - Simplified on mobile */}
        {!isMobile && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Status de Liberação</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statusCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.label} className={`${card.color} border border-current/20 rounded-lg p-4 text-center`}>
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">{card.label}</p>
                    <p className="text-xs opacity-75 mt-1 capitalize">{card.status}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Recent Access - Simplified on mobile */}
        <div>
          <h2 className={`font-bold text-foreground mb-4 ${isMobile ? "text-base" : "text-xl"}`}>Acessos Recentes</h2>
          <div className="space-y-2">
            {[
              { data: "13/12/2025", hora: "08:15", local: "Portaria Principal", status: "Permitido" },
              { data: "13/12/2025", hora: "12:30", local: "Portaria Principal", status: "Permitido" },
              { data: "13/12/2025", hora: "13:15", local: "Portaria Principal", status: "Permitido" },
            ].map((access, i) => (
              <div key={i} className="bg-surface border border-border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium text-sm">{access.local}</p>
                  <p className="text-xs text-foreground-secondary">
                    {access.data} às {access.hora}
                  </p>
                </div>
                <span className="px-2 py-1 bg-success/10 text-success rounded text-xs font-medium">
                  {access.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
