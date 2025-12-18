"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { mockUsers } from "@/lib/mock-data"
import { Lock, User } from "lucide-react"
import { ThemeToggle } from "../../components/ui/theme-toggle"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simula validação
    const user = Object.values(mockUsers).find((u) => u.email === email)

    if (!user) {
      setError("Email ou senha inválidos")
      setIsLoading(false)
      return
    }

    // Salva user na sessão (simulado)
    sessionStorage.setItem("currentUser", JSON.stringify(user))

    // Redireciona baseado no role
    const roleRoutes: Record<string, string> = {
      colaborador: "/dashboard/colaborador",
      porteiro: "/dashboard/porteiro",
      rh: "/dashboard/rh",
      sst: "/dashboard/sst",
      gestor: "/dashboard/gestor",
      admin: "/dashboard/admin",
    }

    router.push(roleRoutes[user.role])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Crachá Inteligente</h1>
          <p className="text-foreground-secondary">Sistema de Controle de Acesso</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-surface-light border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-foreground-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-light border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-foreground-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg p-3">{error}</div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-foreground-secondary text-white font-medium py-2 rounded-lg transition-colors"
            >
              {isLoading ? "Autenticando..." : "Entrar"}
            </button>
          </div>

          {/* Recovery Link */}
          <div className="text-center">
            <a href="/recuperar-senha" className="text-sm text-primary hover:text-primary-dark transition-colors">
              Esqueceu a senha?
            </a>
          </div>
        </form>

        {/* Demo Users */}
        <div className="mt-8 bg-surface-light border border-border rounded-lg p-4">
          <p className="text-xs text-foreground-secondary mb-3">Contas de demonstração:</p>
          <div className="space-y-2 text-xs">
            {Object.values(mockUsers).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 bg-surface rounded hover:bg-surface-light cursor-pointer transition-colors"
                onClick={() => {
                  setEmail(user.email)
                  setPassword("demo")
                }}
              >
                <span className="text-foreground">{user.nome}</span>
                <span className="text-foreground-secondary text-xs">{user.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
