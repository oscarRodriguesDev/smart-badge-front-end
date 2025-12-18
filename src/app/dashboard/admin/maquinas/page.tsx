"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { mockMaquinas } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Plus, Edit2 } from "lucide-react"

export default function MaquinasAdminPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Cadastro de Máquinas</h1>
            <p className="text-foreground-secondary">Registro de equipamentos e NRs</p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2 font-medium hidden sm:flex">
            <Plus className="w-4 h-4" />
            Nova Máquina
          </button>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockMaquinas.map((maq) => (
            <div
              key={maq.id}
              className="bg-surface border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{maq.nome}</h3>
                  <p className="text-xs text-foreground-secondary">{maq.setor}</p>
                </div>
                <button className="p-2 hover:bg-surface-light rounded transition-colors text-foreground-secondary hover:text-foreground">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-foreground-secondary uppercase mb-1">Status</p>
                  <p
                    className={`text-sm font-medium ${
                      maq.statusOperacional === "ativa"
                        ? "text-success"
                        : maq.statusOperacional === "manutencao"
                          ? "text-warning"
                          : "text-danger"
                    }`}
                  >
                    {maq.statusOperacional === "ativa"
                      ? "Ativa"
                      : maq.statusOperacional === "manutencao"
                        ? "Manutenção"
                        : "Inativa"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary uppercase mb-1">NRs</p>
                  <div className="flex flex-wrap gap-1">
                    {maq.nrsRequeridas.map((nr) => (
                      <span key={nr} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        {nr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                Gerenciar Operadores
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
