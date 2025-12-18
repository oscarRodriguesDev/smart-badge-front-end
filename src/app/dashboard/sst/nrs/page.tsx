"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { mockNRs } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Plus, Edit2, Eye } from "lucide-react"

export default function NRsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [expandedNR, setExpandedNR] = useState<string | null>(null)

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
            <h1 className="text-2xl font-bold text-foreground mb-2">Normas Regulamentadoras</h1>
            <p className="text-foreground-secondary">Cadastro e gerenciamento de NRs</p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2 font-medium hidden sm:flex">
            <Plus className="w-4 h-4" />
            Nova NR
          </button>
        </div>

        {/* NR List */}
        <div className="space-y-4">
          {mockNRs.map((nr) => (
            <div
              key={nr.id}
              className="bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
            >
              <button
                onClick={() => setExpandedNR(expandedNR === nr.id ? null : nr.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-surface-light transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded">
                      {nr.numero}
                    </span>
                    <h3 className="font-semibold text-foreground">{nr.titulo}</h3>
                  </div>
                  <p className="text-sm text-foreground-secondary">{nr.descricao}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-xs px-2 py-1 bg-success/10 text-success rounded">Ativa</span>
                  <span className="text-foreground-secondary">{expandedNR === nr.id ? "▼" : "▶"}</span>
                </div>
              </button>

              {expandedNR === nr.id && (
                <div className="border-t border-border bg-surface-light px-6 py-4 space-y-4">
                  <div>
                    <p className="text-xs text-foreground-secondary uppercase font-semibold mb-2">Descrição Completa</p>
                    <p className="text-sm text-foreground">{nr.descricao}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-foreground-secondary uppercase font-semibold mb-1">Vigência</p>
                      <p className="text-sm text-foreground">{new Date(nr.dataVigencia).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-secondary uppercase font-semibold mb-1">Status</p>
                      <p className="text-sm text-success font-medium">Ativa</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-foreground-secondary uppercase font-semibold mb-2">
                      Colaboradores com essa NR
                    </p>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary"
                        >
                          {i}
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-xs text-foreground-secondary">
                        +2
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 px-3 py-2 bg-surface border border-border hover:bg-surface-light rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                      <Eye className="w-4 h-4" />
                      Detalhes
                    </button>
                    <button className="flex-1 px-3 py-2 bg-surface border border-border hover:bg-surface-light rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
