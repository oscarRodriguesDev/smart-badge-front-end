"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Plus, CheckCircle, AlertCircle, Users } from "lucide-react"

export default function TreinamentosPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const trainings = [
    {
      id: "tr-001",
      nome: "NR-6 - Equipamento de Proteção Individual",
      descricao: "Treinamento obrigatório para uso de EPIs",
      dataInicio: "2025-01-15",
      dataVencimento: "2025-12-31",
      participantes: 45,
      status: "ativo",
    },
    {
      id: "tr-002",
      nome: "NR-12 - Máquinas e Equipamentos",
      descricao: "Operação segura de máquinas industriais",
      dataInicio: "2025-02-01",
      dataVencimento: "2025-12-31",
      participantes: 32,
      status: "ativo",
    },
    {
      id: "tr-003",
      nome: "Segurança Geral - Introdução",
      descricao: "Treinamento introdutório de segurança do trabalho",
      dataInicio: "2024-12-01",
      dataVencimento: "2025-06-30",
      participantes: 120,
      status: "vencendo",
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Treinamentos Obrigatórios</h1>
            <p className="text-foreground-secondary">Gerenciamento de capacitações e certificações</p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2 font-medium hidden sm:flex">
            <Plus className="w-4 h-4" />
            Novo Treinamento
          </button>
        </div>

        {/* Training Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainings.map((training) => (
            <div
              key={training.id}
              className="bg-surface border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-primary uppercase font-semibold">Treinamento</p>
                  <h3 className="font-semibold text-foreground mt-1">{training.nome}</h3>
                </div>
                {training.status === "ativo" ? (
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                )}
              </div>

              <p className="text-sm text-foreground-secondary mb-4">{training.descricao}</p>

              <div className="space-y-2 text-sm mb-4 pb-4 border-b border-border">
                <p>
                  <span className="text-foreground-secondary">Vigência:</span>
                  <span className="text-foreground ml-2">
                    {new Date(training.dataVencimento).toLocaleDateString("pt-BR")}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-foreground-secondary" />
                  <span className="text-foreground">{training.participantes} participantes</span>
                </p>
              </div>

              <button className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium text-sm">
                Gerenciar
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
