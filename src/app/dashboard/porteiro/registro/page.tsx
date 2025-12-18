"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { CheckCircle, Clock } from "lucide-react"

export default function RegistroPage() {
  const [user, setUser] = useState<User | null>(null)
  const [tipoAcesso, setTipoAcesso] = useState<"entrada" | "saida">("entrada")
  const [colaboradorMatricula, setColaboradorMatricula] = useState("")
  const [registroConfirmado, setRegistroConfirmado] = useState(false)
  const [ultimoRegistro, setUltimoRegistro] = useState<any>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const mockColaboradores = [
    { matricula: "MAT-2024-001", nome: "João Silva" },
    { matricula: "MAT-2024-006", nome: "Maria Santos" },
    { matricula: "MAT-2024-007", nome: "Carlos Ferreira" },
    { matricula: "MAT-2024-005", nome: "Ana Garcia" },
    { matricula: "MAT-2024-004", nome: "Pedro Oliveira" },
  ]

  const handleRegistrarAcesso = (e: React.FormEvent) => {
    e.preventDefault()
    const colaborador = mockColaboradores.find((c) => c.matricula === colaboradorMatricula)

    if (colaborador) {
      const agora = new Date()
      setUltimoRegistro({
        nome: colaborador.nome,
        matricula: colaborador.matricula,
        tipo: tipoAcesso,
        data: agora.toLocaleDateString("pt-BR"),
        hora: agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      })
      setRegistroConfirmado(true)
      setColaboradorMatricula("")

      setTimeout(() => {
        setRegistroConfirmado(false)
      }, 3000)
    }
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Registrar Acesso</h1>
          <p className="text-foreground-secondary">Entrada ou saída manual de colaboradores</p>
        </div>

        {/* Registration Form */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <form onSubmit={handleRegistrarAcesso} className="space-y-6">
            {/* Tipo de Acesso */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Tipo de Acesso</label>
              <div className="grid grid-cols-2 gap-4">
                {(["entrada", "saida"] as const).map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setTipoAcesso(tipo)}
                    className={`p-4 rounded-lg border-2 transition-colors text-center ${
                      tipoAcesso === tipo
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border bg-surface-light text-foreground hover:border-border"
                    }`}
                  >
                    {tipo === "entrada" ? "🚪 Entrada" : "🚶 Saída"}
                  </button>
                ))}
              </div>
            </div>

            {/* Colaborador Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Selecione o Colaborador</label>
              <input
                type="text"
                value={colaboradorMatricula}
                onChange={(e) => setColaboradorMatricula(e.target.value)}
                placeholder="Matrícula ou nome"
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground placeholder-foreground-secondary focus:outline-none focus:border-primary mb-3"
              />

              {/* Suggestions */}
              {colaboradorMatricula.length > 0 && (
                <div className="space-y-2">
                  {mockColaboradores
                    .filter(
                      (c) =>
                        c.matricula.includes(colaboradorMatricula.toUpperCase()) ||
                        c.nome.toLowerCase().includes(colaboradorMatricula.toLowerCase()),
                    )
                    .map((c) => (
                      <button
                        key={c.matricula}
                        type="button"
                        onClick={() => setColaboradorMatricula(c.matricula)}
                        className="w-full text-left px-4 py-2 bg-surface-light hover:bg-surface border border-border rounded-lg transition-colors"
                      >
                        <p className="font-medium text-foreground">{c.nome}</p>
                        <p className="text-xs text-foreground-secondary">{c.matricula}</p>
                      </button>
                    ))}
                </div>
              )}

              {/* Quick buttons */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-foreground-secondary mb-3">Acesso rápido:</p>
                <div className="grid grid-cols-2 gap-2">
                  {mockColaboradores.map((c) => (
                    <button
                      key={c.matricula}
                      type="button"
                      onClick={() => setColaboradorMatricula(c.matricula)}
                      className="text-xs px-3 py-2 bg-surface-light hover:bg-surface border border-border rounded transition-colors text-left"
                    >
                      <p className="font-medium text-foreground">{c.nome}</p>
                      <p className="text-foreground-secondary">{c.matricula}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!colaboradorMatricula}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-foreground-secondary text-white font-medium py-3 rounded-lg transition-colors"
            >
              Registrar {tipoAcesso === "entrada" ? "Entrada" : "Saída"}
            </button>
          </form>
        </div>

        {/* Confirmation Message */}
        {registroConfirmado && ultimoRegistro && (
          <div className="bg-success/10 border border-success/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-success mb-2">Acesso Registrado com Sucesso</h3>
                <div className="space-y-1 text-sm text-foreground">
                  <p>
                    <strong>Colaborador:</strong> {ultimoRegistro.nome}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {ultimoRegistro.tipo === "entrada" ? "Entrada" : "Saída"}
                  </p>
                  <p>
                    <strong>Hora:</strong> {ultimoRegistro.hora}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Records */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Registros de Hoje</h2>
          <div className="space-y-2">
            {[
              { nome: "João Silva", tipo: "saida", hora: "17:45" },
              { nome: "Maria Santos", tipo: "entrada", hora: "17:35" },
              { nome: "Carlos Ferreira", tipo: "saida", hora: "17:30" },
              { nome: "Ana Garcia", tipo: "entrada", hora: "17:25" },
              { nome: "Pedro Oliveira", tipo: "entrada", hora: "08:00" },
            ].map((record, i) => (
              <div key={i} className="bg-surface border border-border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{record.nome}</p>
                  <p className="text-xs text-foreground-secondary">{record.tipo === "entrada" ? "Entrada" : "Saída"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-foreground-secondary" />
                  <span className="text-sm text-foreground-secondary">{record.hora}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
