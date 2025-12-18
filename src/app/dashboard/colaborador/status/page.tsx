"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react"

export default function StatusPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const releases = [
    {
      title: "Atestado de Saúde Ocupacional (ASO)",
      status: "liberado",
      date: "Válido até: 31/12/2025",
      description: "Exame médico periódico obrigatório",
    },
    {
      title: "Treinamentos Obrigatórios",
      status: "completo",
      count: "3 de 3 completos",
      description: "NR-6 (EPI), NR-12 (Máquinas), Segurança Geral",
    },
    {
      title: "Normas Regulamentadoras (NRs)",
      status: "completo",
      count: "5 de 5",
      description: "NR-1, NR-6, NR-12, NR-17, NR-35",
    },
    {
      title: "Liberação para Máquinas",
      status: "liberado",
      count: "4 máquinas autorizadas",
      description: "Prensa Hidráulica, Torno CNC, Esmerilhadeira, Furadeira",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "liberado":
      case "completo":
        return <CheckCircle className="w-6 h-6 text-success" />
      case "pendente":
        return <Clock className="w-6 h-6 text-warning" />
      case "vencido":
        return <AlertCircle className="w-6 h-6 text-danger" />
      case "bloqueado":
        return <XCircle className="w-6 h-6 text-danger" />
      default:
        return null
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "liberado":
      case "completo":
        return "bg-success/10 border-success/30"
      case "pendente":
        return "bg-warning/10 border-warning/30"
      case "vencido":
      case "bloqueado":
        return "bg-danger/10 border-danger/30"
      default:
        return "bg-surface-light border-border"
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Status de Liberação</h1>
          <p className="text-foreground-secondary">Verifique seus documentos e autorizações</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-success/10 border border-success/30 rounded-lg p-4">
            <p className="text-sm text-foreground-secondary mb-1">Status Geral</p>
            <p className="text-2xl font-bold text-success">APTO</p>
            <p className="text-xs text-success/70 mt-2">Todas as liberações em dia</p>
          </div>
          <div className="bg-info/10 border border-info/30 rounded-lg p-4">
            <p className="text-sm text-foreground-secondary mb-1">Próxima Revisão</p>
            <p className="text-2xl font-bold text-info">31/12/2025</p>
            <p className="text-xs text-info/70 mt-2">ASO - Atestado Ocupacional</p>
          </div>
        </div>

        {/* Release Items */}
        <div className="space-y-4">
          {releases.map((release, i) => (
            <div key={i} className={`border rounded-lg p-6 ${getStatusBg(release.status)}`}>
              <div className="flex items-start gap-4">
                <div className="mt-1">{getStatusIcon(release.status)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{release.title}</h3>
                  <p className="text-sm text-foreground-secondary mb-2">{release.description}</p>
                  <p className="text-xs text-foreground-secondary">{release.date || release.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Histórico de Atualizações</h2>
          <div className="space-y-4">
            {[
              { date: "13/12/2025", event: "ASO renovado com sucesso", type: "success" },
              { date: "01/12/2025", event: "Treinamento NR-12 concluído", type: "success" },
              { date: "20/11/2025", event: "Máquina Torno CNC desbloqueada", type: "success" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${item.type === "success" ? "bg-success" : "bg-warning"}`}
                  ></div>
                  {i < 2 && <div className="w-0.5 h-12 bg-border mt-2"></div>}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-foreground">{item.event}</p>
                  <p className="text-xs text-foreground-secondary">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
