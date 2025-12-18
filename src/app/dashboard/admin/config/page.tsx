"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Save } from "lucide-react"

export default function ConfigPage() {
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
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Configurações do Sistema</h1>
          <p className="text-foreground-secondary">Parâmetros e políticas gerais</p>
        </div>

        {/* Configuration Sections */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informações da Empresa</h2>
            <div className="space-y-4">
              {[
                { label: "Nome da Empresa", value: "Indústria Example Ltda" },
                { label: "CNPJ", value: "00.000.000/0000-00" },
                { label: "Email Corporativo", value: "admin@company.com" },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-foreground mb-1">{field.label}</label>
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Security Policies */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Políticas de Segurança</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Expiração de Sessão (minutos)</label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 border border-border rounded bg-surface-light cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">Autenticação de Dois Fatores Obrigatória</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 border border-border rounded bg-surface-light cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">Registrar Auditoria Completa</span>
                </label>
              </div>
            </div>
          </div>

          {/* Integration Settings */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Integrações</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">API Key - Sistema SST</label>
                <input
                  type="password"
                  defaultValue="••••••••••••••••"
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 border border-border rounded bg-surface-light cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">Email Notifications Enabled</span>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Configurações
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
