"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { ArrowLeft, Save } from "lucide-react"

export default function NovoColaboradorPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    setor: "",
    dataAdmissao: "",
    endereco: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      router.push("/dashboard/rh/colaboradores")
    }, 2000)
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Cadastrar Novo Colaborador</h1>
          <p className="text-foreground-secondary">Preencha os dados de admissão</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6 space-y-6">
            {/* Personal Info */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Dados Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Telefone</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Endereço</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Job Info */}
            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Dados Profissionais</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Cargo</label>
                    <select
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Operador de Máquina">Operador de Máquina</option>
                      <option value="Técnica de Qualidade">Técnica de Qualidade</option>
                      <option value="Eletricista">Eletricista</option>
                      <option value="Encarregado">Encarregado</option>
                      <option value="Gerente">Gerente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Setor</label>
                    <select
                      name="setor"
                      value={formData.setor}
                      onChange={handleChange}
                      className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Produção">Produção</option>
                      <option value="Qualidade">Qualidade</option>
                      <option value="Manutenção">Manutenção</option>
                      <option value="RH">RH</option>
                      <option value="Administração">Administração</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Data de Admissão</label>
                  <input
                    type="date"
                    name="dataAdmissao"
                    value={formData.dataAdmissao}
                    onChange={handleChange}
                    className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 py-2 bg-surface-light border border-border hover:bg-surface rounded-lg transition-colors font-medium text-foreground"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors font-medium text-white flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cadastrar
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-success/10 border border-success/30 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-xl font-bold text-success mb-2">Cadastro Realizado!</h2>
            <p className="text-foreground-secondary">O novo colaborador foi cadastrado com sucesso.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
