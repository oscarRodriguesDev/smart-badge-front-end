"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Download } from "lucide-react"

export default function RelatoriosPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const reports = [
    {
      titulo: "Desempenho da Equipe",
      descricao: "Análise de produtividade e cumprimento de metas",
      periodo: "Dezembro 2025",
      tipo: "Operacional",
    },
    {
      titulo: "Segurança do Trabalho",
      descricao: "Relatório de incidentes e conformidade com NRs",
      periodo: "Dezembro 2025",
      tipo: "Segurança",
    },
    {
      titulo: "Documentação",
      descricao: "Status de ASO, treinamentos e certificações",
      periodo: "Dezembro 2025",
      tipo: "RH",
    },
    {
      titulo: "Máquinas e Equipamentos",
      descricao: "Autorização de operadores e manutenção",
      periodo: "Dezembro 2025",
      tipo: "Operacional",
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Relatórios</h1>
          <p className="text-foreground-secondary">Análises e dados operacionais da equipe</p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{report.titulo}</h3>
                  <p className="text-sm text-foreground-secondary">{report.descricao}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-foreground-secondary mb-1">Período</p>
                  <p className="text-sm font-medium text-foreground">{report.periodo}</p>
                </div>
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
                  <Download className="w-4 h-4" />
                  Gerar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Dados Operacionais</h2>
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="h-64 flex items-center justify-center bg-surface-light rounded-lg border border-border">
              <p className="text-foreground-secondary">Gráfico de Produtividade</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
