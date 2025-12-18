"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Lock, Unlock, Plus, X } from "lucide-react"
import { mockColaboradores } from "@/lib/mock-data"

interface BlockRequest {
  usuarioId: string
  razao: "suspensao" | "ferias" | "outro"
  descricao: string
  dataLivracao?: string
}

export default function BloqueiosRHPage() {
  const [blockedUsers, setBlockedUsers] = useState<Record<string, string[]>>({
    "colaborador-001": ["Suspensão disciplinar"],
  })
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<BlockRequest>({
    usuarioId: "",
    razao: "suspensao",
    descricao: "",
  })

  const handleBlockUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.usuarioId || !formData.descricao) return

    setBlockedUsers((prev) => ({
      ...prev,
      [formData.usuarioId]: [...(prev[formData.usuarioId] || []), formData.descricao],
    }))

    setFormData({ usuarioId: "", razao: "suspensao", descricao: "" })
    setShowForm(false)
  }

  const handleUnblockUser = (usuarioId: string, reason: string) => {
    setBlockedUsers((prev) => ({
      ...prev,
      [usuarioId]: prev[usuarioId].filter((r) => r !== reason),
    }))
  }

  const getReasonColor = (reason: string) => {
    if (reason.includes("Suspensão")) return "bg-danger/10 border-danger/30 text-danger"
    if (reason.includes("Férias")) return "bg-info/10 border-info/30 text-info"
    return "bg-warning/10 border-warning/30 text-warning"
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Bloqueios de Crachá</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Bloquear Colaborador
          </button>
        </div>

        {/* Block Form */}
        {showForm && (
          <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-foreground">Novo Bloqueio</h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBlockUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Colaborador</label>
                <select
                  value={formData.usuarioId}
                  onChange={(e) => setFormData({ ...formData, usuarioId: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground"
                >
                  <option value="">Selecione um colaborador</option>
                  {mockColaboradores.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Motivo</label>
                <select
                  value={formData.razao}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      razao: e.target.value as "suspensao" | "ferias" | "outro",
                    })
                  }
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground"
                >
                  <option value="suspensao">Suspensão</option>
                  <option value="ferias">Férias</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Ex: Suspensão disciplinar - 5 dias"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Data de Liberação (opcional)</label>
                <input
                  type="date"
                  value={formData.dataLivracao || ""}
                  onChange={(e) => setFormData({ ...formData, dataLivracao: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded-lg transition-colors"
              >
                Bloquear
              </button>
            </form>
          </div>
        )}

        {/* Blocked Users List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Colaboradores Bloqueados</h2>

          {Object.entries(blockedUsers).length === 0 ? (
            <div className="bg-surface border border-border rounded-lg p-8 text-center">
              <p className="text-muted">Nenhum colaborador bloqueado no momento</p>
            </div>
          ) : (
            Object.entries(blockedUsers).map(([usuarioId, reasons]) =>
              reasons.length > 0 ? (
                <div key={usuarioId} className="bg-surface border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-foreground">
                        {mockColaboradores.find((c) => c.id === usuarioId)?.nome || usuarioId}
                      </p>
                      <p className="text-sm text-muted">
                        {mockColaboradores.find((c) => c.id === usuarioId)?.matricula}
                      </p>
                    </div>
                    <Lock className="w-5 h-5 text-danger" />
                  </div>

                  <div className="space-y-2">
                    {reasons.map((reason, idx) => (
                      <div
                        key={idx}
                        className={`border rounded-lg p-3 flex justify-between items-center ${getReasonColor(reason)}`}
                      >
                        <span className="text-sm font-medium">{reason}</span>
                        <button
                          onClick={() => handleUnblockUser(usuarioId, reason)}
                          className="hover:opacity-80 transition-opacity"
                        >
                          <Unlock className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null,
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
