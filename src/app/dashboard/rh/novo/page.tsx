"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { ArrowLeft, Save } from "lucide-react"

export default function NovoColaboradorPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    // obrigatórios no Prisma
    cpf: "",
    email: "",
    senha: "senha_padrao",
    nome: "",
    matricula: "",
    cargo: "",
    setor: "",
    role: "RH_USER", // ENUM VÁLIDO DO PRISMA
    asoStatus: "EM_DIA",
    situacaoGeral: "ATIVO",

    // opcionais
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    pais: "Brasil",
    complemento: "",
    turno: "",

    // arrays obrigatórios
    areasPermitidas: [] as string[],
    niveisAcesso: [] as string[],
    bloqueios: [] as string[],

    // datas
    asoUltimo: null as string | null,
    asoVencimento: null as string | null,
    asoRestricoes: null as string | null,

    // relações
    treinamentos: [] as any[],
    certificacoes: [] as any[],
    epis: [] as any[],
    acidentes: [] as any[],
    atestados: [] as any[],
    ferias: null as any,

    // mídia
    urlPhoto: null as string | null,
    foto: null as string | null
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      matricula: formData.matricula || crypto.randomUUID(),
      telefone: formData.telefone || null,
      endereco: formData.endereco || null,
      cidade: formData.cidade || null,
      estado: formData.estado || null,
      cep: formData.cep || null,
      complemento: formData.complemento || null,
      turno: formData.turno || null,
      asoUltimo: formData.asoUltimo ? new Date(formData.asoUltimo) : null,
      asoVencimento: formData.asoVencimento ? new Date(formData.asoVencimento) : null
    }

    await fetch("/api/colaboradores/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })

    setSubmitted(true)

    setTimeout(() => {
      router.push("/dashboard/rh/colaboradores")
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:opacity-80 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-background p-6 lg:p-8 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Dados pessoais</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input-base" name="nome" placeholder="Nome completo" value={formData.nome} onChange={handleChange} />
                <input className="input-base" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} />
                <input className="input-base" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input className="input-base" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} />
                <input className="input-base md:col-span-2" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
                <input className="input-base" name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} />
                <input className="input-base" name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} />
                <input className="input-base" name="cep" placeholder="CEP" value={formData.cep} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="text-lg font-semibold">Dados profissionais</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input-base" name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} />
                <input className="input-base" name="setor" placeholder="Setor" value={formData.setor} onChange={handleChange} />
                <input className="input-base" name="matricula" placeholder="Matrícula" value={formData.matricula} onChange={handleChange} />
                <input className="input-base" name="turno" placeholder="Turno" value={formData.turno} onChange={handleChange} />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input-base"
                >
                  <option value="RH_USER">RH User</option>
                  <option value="RH_ADMIN">RH Admin</option>
                  <option value="SESMT_USER">SESMT User</option>
                  <option value="SESMT_ADMIN">SESMT Admin</option>
                  <option value="OP">Operacional</option>
                  <option value="CONTROLER">Controler</option>
                  <option value="GENERAL_ADMIN">Admin Geral</option>
                  <option value="ADMIN_SYSTEM">Admin Sistema</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 rounded-lg border border-border bg-muted px-4 py-2"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cadastrar
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-xl border border-success/30 bg-success/10 p-10 text-center">
            <div className="text-4xl mb-2">✓</div>
            <p>Cadastro realizado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
