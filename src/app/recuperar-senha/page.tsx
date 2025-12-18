"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, ArrowLeft } from "lucide-react"

export default function RecuperarSenhaPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simula envio de email
    setTimeout(() => {
      setSent(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Recuperar Senha</h1>
          <p className="text-foreground-secondary">Digite seu email para resetar a senha</p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-surface border border-border rounded-lg p-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-primary hover:bg-primary-dark disabled:bg-foreground-secondary text-white font-medium py-2 rounded-lg transition-colors"
              >
                {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-success/10 border border-success/30 rounded-lg p-6 text-center">
            <div className="text-success mb-3">✓</div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Email Enviado</h2>
            <p className="text-foreground-secondary text-sm mb-4">
              Verifique sua caixa de entrada para o link de recuperação
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded-lg transition-colors"
            >
              Voltar ao Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
