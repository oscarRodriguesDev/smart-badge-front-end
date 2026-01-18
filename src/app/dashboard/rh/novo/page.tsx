
"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { ArrowLeft, Save } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function NovoColaboradorPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    cpf: "",
    email: "",
    senha: "senha_padrao",
    nome: "",
    matricula: "",
    cargo: "",
    setor: "",
    role: "RH_USER",
    asoStatus: "EM_DIA",
    situacaoGeral: "ATIVO",
    ItensPermitidos: [] as string[],
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    pais: "Brasil",
    complemento: "",
    turno: "",

    areasPermitidas: [] as string[],
    niveisAcesso: [] as string[],
    bloqueios: [] as string[],

    asoUltimo: null as string | null,
    asoVencimento: null as string | null,
    asoRestricoes: null as string | null,

    treinamentos: [] as any[],
    certificacoes: [] as any[],
    epis: [] as any[],
    acidentes: [] as any[],
    atestados: [] as any[],
    ferias: null as any,

    urlPhoto: null as string | null
  })

  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const ext = file.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${ext}`
    const filePath = `colaboradores/${fileName}`

    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from("Axcess_Storage")
        .upload(filePath, file)

    if (uploadError) {
      setUploading(false)
      return
    }

    const { data: publicData } = supabase.storage
      .from("Axcess_Storage")
      .getPublicUrl(filePath)

    setFormData(prev => ({
      ...prev,
      urlPhoto: publicData.publicUrl
    }))

    setUploading(false)
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
      asoVencimento: formData.asoVencimento ? new Date(formData.asoVencimento) : null,
      urlPhoto: formData.urlPhoto,
      itensViculados : formData.ItensPermitidos || null,
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
          className="flex items-center gap-2 text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border bg-background p-6 lg:p-8 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Foto de perfil</h2>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="input-base"
              />

              {uploading && <p>Enviando foto...</p>}

              {formData.urlPhoto && (
                <img
                  src={formData.urlPhoto}
                  className="w-32 h-32 rounded-lg object-cover border"
                />
              )}
            </div>

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

            <div className="space-y-4 border-t pt-6">
              <h2 className="text-lg font-semibold">Dados profissionais</h2>

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


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input-base" name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} />
                <input className="input-base" name="setor" placeholder="Setor" value={formData.setor} onChange={handleChange} />
                <input className="input-base" name="matricula" placeholder="Matrícula" value={formData.matricula} onChange={handleChange} />
                <input className="input-base" name="turno" placeholder="Turno" value={formData.turno} onChange={handleChange} />
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 rounded-lg border px-4 py-2"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex-1 rounded-lg bg-primary px-4 py-2 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cadastrar
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-xl border p-10 text-center">
            <div className="text-4xl mb-2">✓</div>
            <p>Cadastro realizado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
