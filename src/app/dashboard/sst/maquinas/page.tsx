"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { mockMaquinas } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Plus, AlertCircle, CheckCircle } from "lucide-react"

export default function MaquinasPage() {
  const router = useRouter()
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
            <h1 className="text-2xl font-bold text-foreground mb-2">Máquinas e Equipamentos</h1>
            <p className="text-foreground-secondary">Gestão de máquinas e NRs associadas</p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2 font-medium hidden sm:flex">
            <Plus className="w-4 h-4" />
            Nova Máquina
          </button>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockMaquinas.map((maquina) => (
            <div
              key={maquina.id}
              className={`border rounded-lg p-6 ${
                maquina.statusOperacional === "ativa" ? "bg-surface border-border" : "bg-warning/5 border-warning/30"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-foreground-secondary uppercase font-semibold">Máquina</p>
                  <h3 className="font-semibold text-foreground mt-1">{maquina.nome}</h3>
                </div>
                {maquina.statusOperacional === "ativa" ? (
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-foreground-secondary uppercase font-semibold mb-1">Setor</p>
                  <p className="text-foreground">{maquina.setor}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary uppercase font-semibold mb-2">NRs Requeridas</p>
                  <div className="flex flex-wrap gap-2">
                    {maquina.nrsRequeridas.map((nr) => (
                      <span key={nr} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-medium">
                        {nr}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary uppercase font-semibold mb-1">Última Manutenção</p>
                  <p className="text-foreground">{new Date(maquina.ultimaManutencao).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <button className="flex-1 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium text-sm">
                  Autorizar Operadores
                </button>
                <button className="flex-1 px-3 py-2 bg-surface-light hover:bg-surface border border-border rounded-lg transition-colors font-medium text-sm text-foreground">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
