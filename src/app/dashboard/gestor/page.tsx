"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../components/layouts/dashboard-layout"
import { TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react"

export default function GestorDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const teamStats = [
    { label: "Equipe Total", value: "35", icon: Users, color: "text-primary" },
    { label: "Aptos para Trabalho", value: "32", icon: CheckCircle, color: "text-success" },
    { label: "Com Restrições", value: "2", icon: AlertCircle, color: "text-warning" },
    { label: "Produtividade", value: "94%", icon: TrendingUp, color: "text-info" },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Dashboard de Gestão</h1>
          <p className="text-foreground-secondary">Acompanhamento da equipe e desempenho operacional</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => router.push("/dashboard/gestor/equipe")}
            className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold text-foreground mb-1">Minha Equipe</h3>
            <p className="text-sm text-foreground-secondary">Status de colaboradores</p>
          </button>

          <button
            onClick={() => router.push("/dashboard/gestor/relatorios")}
            className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-foreground mb-1">Relatórios</h3>
            <p className="text-sm text-foreground-secondary">Análise de desempenho</p>
          </button>

          <button
            onClick={() => router.push("/dashboard/gestor/liberacoes")}
            className="bg-surface border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-left"
          >
            <div className="text-2xl mb-2">✓</div>
            <h3 className="font-semibold text-foreground mb-1">Aprovações</h3>
            <p className="text-sm text-foreground-secondary">Liberações operacionais</p>
          </button>
        </div>

        {/* Team Stats */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Status da Equipe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamStats.map((stat) => {
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
        </div>

        {/* Team Overview */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Equipe - Visão Geral</h2>
          <div className="space-y-2">
            {[
              { nome: "João Silva", status: "apto", operacoes: "Prensa Hidráulica, Torno CNC" },
              { nome: "Maria Santos", status: "apto", operacoes: "Controle de Qualidade, Embalagem" },
              { nome: "Carlos Ferreira", status: "restrito", operacoes: "Manutenção (sem máquinas)" },
              { nome: "Ana Costa", status: "apto", operacoes: "Torno CNC, Esmerilhadeira" },
              { nome: "Pedro Gomes", status: "apto", operacoes: "Produção Geral" },
            ].map((item, i) => (
              <div
                key={i}
                className={`border rounded-lg p-4 flex items-center justify-between ${
                  item.status === "apto" ? "bg-surface border-border" : "bg-warning/5 border-warning/30"
                }`}
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.nome}</p>
                  <p className="text-xs text-foreground-secondary">{item.operacoes}</p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    item.status === "apto" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}
                >
                  {item.status === "apto" ? "Apto" : "Restrito"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
