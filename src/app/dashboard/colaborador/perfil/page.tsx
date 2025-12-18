"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Edit2, Save, X } from "lucide-react"

export default function PerfilPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Meu Perfil</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                Cancelar
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Editar
              </>
            )}
          </button>
        </div>

        {/* Profile Info */}
        <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
          {/* Photo */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={user.foto || "/placeholder.svg"}
              alt={user.nome}
              className="w-24 h-24 rounded-lg object-cover border border-border"
            />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs text-foreground-secondary uppercase mb-1">Foto de Perfil</p>
              <p className="text-lg font-semibold text-foreground mb-2">{user.nome}</p>
              {isEditing && (
                <button className="text-sm text-primary hover:text-primary-dark transition-colors">Alterar Foto</button>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            {[
              { label: "Nome Completo", value: user.nome },
              { label: "Email", value: user.email },
              { label: "Matrícula", value: user.matricula },
              { label: "Cargo", value: user.cargo },
              { label: "Setor", value: user.setor },
              { label: "Status", value: user.status },
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-xs font-medium text-foreground-secondary mb-1 uppercase">
                  {field.label}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="w-full bg-surface-light border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:border-primary"
                    disabled={field.label !== "Nome Completo"}
                  />
                ) : (
                  <p className="text-foreground">{field.value}</p>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Salvar Alterações
            </button>
          )}
        </div>

        {/* Account Security */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Segurança da Conta</h2>
          <button className="w-full text-left px-4 py-3 bg-surface-light hover:bg-surface rounded-lg transition-colors border border-border">
            <p className="font-medium text-foreground">Alterar Senha</p>
            <p className="text-xs text-foreground-secondary mt-1">Última alteração há 30 dias</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
