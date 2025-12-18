"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Plus } from "lucide-react"

export default function EPIsPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const epis = [
    {
      id: "epi-001",
      nome: "Capacete de Segurança",
      descricao: "Proteção para cabeça em zonas de risco",
      setor: "Produção",
      nrAplicavel: "NR-6",
      status: "disponível",
      quantidade: 45,
      dataUltimaInspeção: "2025-12-01",
    },
    {
      id: "epi-002",
      nome: "Colete de Segurança Reflexivo",
      descricao: "Visibilidade em área de movimentação",
      setor: "Portaria",
      nrAplicavel: "NR-6",
      status: "disponível",
      quantidade: 30,
      dataUltimaInspeção: "2025-12-01",
    },
    {
      id: "epi-003",
      nome: "Luva de Couro",
      descricao: "Proteção manual para trabalhos de manipulação",
      setor: "Manutenção",
      nrAplicavel: "NR-6",
      status: "baixo_estoque",
      quantidade: 12,
      dataUltimaInspeção: "2025-11-15",
    },
    {
      id: "epi-004",
      nome: "Óculos de Proteção",
      descricao: "Proteção ocular em ambiente industrial",
      setor: "Produção",
      nrAplicavel: "NR-6",
      status: "disponível",
      quantidade: 60,
      dataUltimaInspeção: "2025-12-05",
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Equipamentos de Proteção Individual (EPIs)</h1>
            <p className="text-foreground-secondary">Inventário e controle de EPIs</p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2 font-medium hidden sm:flex">
            <Plus className="w-4 h-4" />
            Novo EPI
          </button>
        </div>

        {/* EPI List */}
        <div className="space-y-4">
          {epis.map((epi) => (
            <div
              key={epi.id}
              className={`border rounded-lg p-6 flex items-start justify-between ${
                epi.status === "disponível" ? "bg-surface border-border" : "bg-warning/5 border-warning/30"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{epi.nome}</h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      epi.status === "disponível" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}
                  >
                    {epi.status === "disponível" ? "Disponível" : "Baixo Estoque"}
                  </span>
                </div>
                <p className="text-sm text-foreground-secondary mb-3">{epi.descricao}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-foreground-secondary uppercase font-semibold mb-1">Setor</p>
                    <p className="text-foreground">{epi.setor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-secondary uppercase font-semibold mb-1">NR Aplicável</p>
                    <p className="text-foreground font-medium text-primary">{epi.nrAplicavel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-secondary uppercase font-semibold mb-1">Quantidade</p>
                    <p className="text-foreground font-bold">{epi.quantidade}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-secondary uppercase font-semibold mb-1">Última Inspeção</p>
                    <p className="text-foreground">{new Date(epi.dataUltimaInspeção).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
