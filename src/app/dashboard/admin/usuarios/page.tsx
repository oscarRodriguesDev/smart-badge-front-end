"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { mockUsers } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Plus, Edit2, Shield } from "lucide-react"

export default function UsuariosPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const users = Object.values(mockUsers)

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Gerenciamento de Usuários</h1>
            <p className="text-foreground-secondary">Acesso e permissões do sistema</p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2 font-medium hidden sm:flex">
            <Plus className="w-4 h-4" />
            Novo Usuário
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-light border-b border-border">
                <tr className="text-xs text-foreground-secondary uppercase font-semibold">
                  <th className="px-6 py-3 text-left">Nome</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Perfil</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-light transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{u.nome}</td>
                    <td className="px-6 py-4 text-sm text-foreground-secondary">{u.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium capitalize">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          u.status === "ativo"
                            ? "bg-success/10 text-success"
                            : u.status === "inativo"
                              ? "bg-warning/10 text-warning"
                              : "bg-danger/10 text-danger"
                        }`}
                      >
                        {u.status === "ativo" ? "Ativo" : u.status === "inativo" ? "Inativo" : "Bloqueado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex gap-2 justify-end">
                      <button className="p-2 hover:bg-surface-light rounded transition-colors text-foreground-secondary hover:text-foreground">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-surface-light rounded transition-colors text-foreground-secondary hover:text-foreground">
                        <Shield className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
