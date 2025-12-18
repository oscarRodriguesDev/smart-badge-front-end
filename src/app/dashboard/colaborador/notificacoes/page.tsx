"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Bell, AlertCircle, CheckCircle, Info, Trash2 } from "lucide-react"

export default function NotificacoesPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const notificacoes = [
    {
      id: 1,
      tipo: "success",
      titulo: "ASO Renovado",
      mensagem: "Seu atestado de saúde ocupacional foi renovado com sucesso",
      data: "13/12/2025 14:30",
      icon: CheckCircle,
    },
    {
      id: 2,
      tipo: "warning",
      titulo: "Treinamento Vencendo",
      mensagem: "Seu treinamento NR-6 vence em 15 dias",
      data: "12/12/2025 10:15",
      icon: AlertCircle,
    },
    {
      id: 3,
      tipo: "info",
      titulo: "Nova Máquina Liberada",
      mensagem: "Você foi liberado para operar a Prensa Hidráulica A2",
      data: "10/12/2025 09:00",
      icon: Info,
    },
    {
      id: 4,
      tipo: "info",
      titulo: "Atualização de Políticas",
      mensagem: "Políticas de segurança foram atualizadas, revise em seu perfil",
      data: "08/12/2025 16:45",
      icon: Info,
    },
  ]

  const getColor = (tipo: string) => {
    switch (tipo) {
      case "success":
        return "bg-success/10 border-success/30 text-success"
      case "warning":
        return "bg-warning/10 border-warning/30 text-warning"
      case "info":
        return "bg-info/10 border-info/30 text-info"
      default:
        return "bg-surface-light border-border text-foreground"
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Notificações</h1>
            <p className="text-foreground-secondary">Fique atualizado sobre seu status</p>
          </div>
          <button className="px-4 py-2 bg-surface border border-border hover:bg-surface-light rounded-lg transition-colors text-sm font-medium">
            Marcar como lido
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {notificacoes.map((notif) => {
            const Icon = notif.icon
            return (
              <div key={notif.id} className={`border rounded-lg p-4 flex items-start gap-4 ${getColor(notif.tipo)}`}>
                <div className="mt-1">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{notif.titulo}</h3>
                  <p className="text-sm text-foreground-secondary mb-2">{notif.mensagem}</p>
                  <p className="text-xs opacity-75">{notif.data}</p>
                </div>
                <button className="text-foreground-secondary hover:text-foreground transition-colors flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>

        {/* Empty State Info */}
        <div className="bg-info/10 border border-info/30 rounded-lg p-6 text-center mt-8">
          <Bell className="w-8 h-8 text-info mx-auto mb-3" />
          <p className="text-sm text-foreground">
            Você receberá notificações sobre mudanças de status, vencimentos de documentos e novas liberações.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
