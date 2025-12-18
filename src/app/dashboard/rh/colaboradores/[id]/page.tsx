"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import type { User } from "@/lib/mock-data"
import { mockColaboradores } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../../components/layouts/dashboard-layout"
import { ArrowLeft, Edit2, FileText, CheckCircle } from "lucide-react"

export default function ColaboradorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [colaborador, setColaborador] = useState<any>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const col = mockColaboradores.find((c) => c.id === params.id)
    if (col) {
      setColaborador(col)
    }
  }, [params.id])

  if (!user || !colaborador) return null

  const documents = [
    { nome: "RG", status: "ativo", data: "2025-12-31" },
    { nome: "CPF", status: "ativo", data: "2025-12-31" },
    { nome: "CTPS", status: "ativo", data: "2025-12-31" },
    { nome: "Comprovante de Residência", status: "ativo", data: "2025-12-31" },
  ]

  const certifications = [
    { nome: "NR-6 (EPI)", dataVencimento: "2025-12-31", status: "ativo" },
    { nome: "NR-12 (Máquinas)", dataVencimento: "2025-06-30", status: "vencido" },
    { nome: "Treinamento Segurança Geral", dataVencimento: "2025-12-31", status: "ativo" },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        {/* Profile Card */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex gap-6 items-start mb-6">
            <img
              src={colaborador.foto || "/placeholder.svg"}
              alt={colaborador.nome}
              className="w-24 h-24 rounded-lg object-cover border border-border"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">{colaborador.nome}</h1>
              <p className="text-foreground-secondary mb-4">{colaborador.cargo}</p>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  colaborador.status === "ativo" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}
              >
                {colaborador.status === "ativo" ? "Ativo" : "Inativo"}
              </span>
            </div>
            <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-6">
            {[
              { label: "Matrícula", value: colaborador.matricula },
              { label: "Email", value: colaborador.email },
              { label: "Telefone", value: colaborador.telefone },
              { label: "Setor", value: colaborador.setor },
              { label: "Data de Admissão", value: new Date(colaborador.dataAdmissao).toLocaleDateString("pt-BR") },
              { label: "Endereço", value: colaborador.endereco },
            ].map((field, i) => (
              <div key={i}>
                <label className="text-xs text-foreground-secondary uppercase font-semibold block mb-1">
                  {field.label}
                </label>
                <p className="text-foreground">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Documentação</h2>
          <div className="space-y-2">
            {documents.map((doc, i) => (
              <div key={i} className="bg-surface border border-border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{doc.nome}</p>
                    <p className="text-xs text-foreground-secondary">Válido até {doc.data}</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Treinamentos e Certificações</h2>
          <div className="space-y-2">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className={`border rounded-lg p-4 flex items-center justify-between ${
                  cert.status === "ativo" ? "bg-success/5 border-success/30" : "bg-danger/5 border-danger/30"
                }`}
              >
                <div>
                  <p className="font-medium text-foreground">{cert.nome}</p>
                  <p className="text-xs text-foreground-secondary">Válido até {cert.dataVencimento}</p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    cert.status === "ativo" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                  }`}
                >
                  {cert.status === "ativo" ? "Ativo" : "Vencido"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
