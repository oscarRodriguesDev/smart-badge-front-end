"use client"

import { useState, useEffect } from "react"
import type { User, ReleaseStatus } from "@/lib/mock-data"
import { mockReleaseStatus, validateBadgeAccess } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { Download, Share2, AlertTriangle, Lock, CheckCircle, ChevronRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileBadgeDisplay } from "../../../../components/mobile/mobile-badge-display"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog"

export default function CrachaPage() {
  const [user, setUser] = useState<User | null>(null)
  const [releaseStatus, setReleaseStatus] = useState<ReleaseStatus>(mockReleaseStatus)
  const [openModal, setOpenModal] = useState<"maquinas" | "nrs" | "treinamentos" | null>(null)
  const isMobile = useIsMobile()

  const userMachines = [
    { id: "maq-001", nome: "Prensa Hidráulica A1", setor: "Produção" },
    { id: "maq-002", nome: "Torno CNC T2", setor: "Produção" },
    { id: "maq-003", nome: "Esmerilhadeira E1", setor: "Acabamento" },
    { id: "maq-004", nome: "Furadeira Industrial F1", setor: "Produção" },
  ]

  const userNRs = [
    { id: "nr-001", numero: "NR-1", titulo: "Disposições Gerais" },
    { id: "nr-002", numero: "NR-6", titulo: "Equipamento de Proteção Individual (EPI)" },
    { id: "nr-003", numero: "NR-12", titulo: "Máquinas e Equipamentos" },
    { id: "nr-004", numero: "NR-17", titulo: "Ergonomia" },
    { id: "nr-005", numero: "NR-35", titulo: "Trabalho em Altura" },
  ]

  const userTrainings = [
    { id: "trei-001", nome: "NR-12 Operação de Máquinas", dataVencimento: "2025-12-15", status: "ativo" as const },
    { id: "trei-002", nome: "Segurança em Altura", dataVencimento: "2026-06-10", status: "ativo" as const },
    { id: "trei-003", nome: "Primeiros Socorros", dataVencimento: "2025-09-20", status: "vencido" as const },
  ]

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  const validation = validateBadgeAccess(user.id, releaseStatus)
  const isBlocked = validation.status === "bloqueado"

  if (isMobile) {
    return (
      <DashboardLayout>
        <div className="p-4 space-y-4 pb-24">
          <h1 className="text-xl font-bold text-foreground">Meu Crachá Digital</h1>
          <MobileBadgeDisplay user={user} releaseStatus={releaseStatus} isBlocked={isBlocked} validation={validation} />
        </div>
      </DashboardLayout>
    )
  }

  // Desktop view with interactive modals
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Meu Crachá Digital</h1>

        {isBlocked && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex gap-3">
            <Lock className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Crachá Bloqueado</p>
              <p className="text-sm text-foreground mt-1">Motivo(s): {validation.reasons.join(", ")}</p>
            </div>
          </div>
        )}

        {/* Digital Badge Card - Dark background for contrast */}
        <div
          className={`rounded-2xl p-8 shadow-xl text-white transform hover:scale-105 transition-transform ${
            isBlocked
              ? "bg-gradient-to-br from-red-700 via-red-600 to-red-700"
              : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          }`}
        >
          {/* Badge Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="opacity-75 text-sm font-semibold">CRACHÁ CORPORATIVO</p>
              <p className="text-2xl font-bold mt-1">{isBlocked ? "ACESSO BLOQUEADO" : "ACESSO VÁLIDO"}</p>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              {isBlocked ? <Lock className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
              <div>
                <p className="text-xs opacity-75">ID do Crachá</p>
                <p className="text-sm font-mono font-bold">{user.badgeId}</p>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex gap-6 mb-8">
            <img
              src={user.foto || "/placeholder.svg"}
              alt={user.nome}
              className="w-24 h-24 rounded-lg object-cover border-2 border-white/50"
            />
            <div>
              <p className="text-sm opacity-75 mb-1 font-semibold">NOME</p>
              <p className="text-xl font-bold mb-3">{user.nome}</p>

              <p className="text-sm opacity-75 mb-1 font-semibold">CARGO</p>
              <p className="mb-3 font-semibold">{user.cargo}</p>

              <p className="text-sm opacity-75 mb-1 font-semibold">SETOR</p>
              <p className="font-semibold">{user.setor}</p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white/15 rounded-lg p-4 mb-4 border border-white/20">
            <p className="text-sm opacity-75 mb-2 font-semibold">STATUS GERAL</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${isBlocked ? "bg-red-400 animate-pulse" : "bg-green-400 animate-pulse"}`}
              ></div>
              <span className="font-bold text-lg">{isBlocked ? "BLOQUEADO" : "LIBERADO PARA ACESSO"}</span>
            </div>
          </div>

          {/* Badge Number at Bottom */}
          <div className="bg-white/10 rounded-lg p-3 text-center border border-white/20">
            <p className="text-xs opacity-75 font-semibold mb-1">NÚMERO DO CRACHÁ</p>
            <p className="text-2xl font-mono font-bold tracking-wider">{user.badgeId}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            disabled={isBlocked}
            className="bg-primary hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Baixar PDF
          </button>
          <button
            disabled={isBlocked}
            className="bg-card border border-border hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-foreground font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Compartilhar
          </button>
        </div>

        {/* Info Box */}
        <div
          className={`border rounded-lg p-4 ${
            isBlocked
              ? "bg-destructive/10 border-destructive text-foreground"
              : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 text-foreground"
          }`}
        >
          <div className="flex gap-2">
            {isBlocked ? <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-destructive" /> : null}
            <p className="text-sm">
              <strong>{isBlocked ? "Seu crachá está bloqueado." : "Validade:"}</strong>{" "}
              {isBlocked
                ? "Procure o departamento de RH ou Segurança do Trabalho para resolver o problema."
                : "Seu crachá digital é válido enquanto você estiver vinculado à empresa e com toda a documentação em dia."}
            </p>
          </div>
        </div>

        {/* Compliance Status - Now with interactive buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm font-semibold text-foreground mb-2">ASO</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  releaseStatus.aso.status === "liberado" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm capitalize font-medium">{releaseStatus.aso.status}</span>
              {releaseStatus.aso.data && (
                <span className="text-xs text-muted-foreground ml-auto">{releaseStatus.aso.data}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => setOpenModal("treinamentos")}
            className="bg-card border border-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-4 text-left transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Treinamentos</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      releaseStatus.treinamentos.status !== "vencido" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm capitalize font-medium">{releaseStatus.treinamentos.status}</span>
                  {releaseStatus.treinamentos.qtd && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      {releaseStatus.treinamentos.qtd} ativo(s)
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>

          <button
            onClick={() => setOpenModal("nrs")}
            className="bg-card border border-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-4 text-left transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">NRs</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      releaseStatus.nrs.status === "completo" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="text-sm capitalize font-medium">{releaseStatus.nrs.status}</span>
                  {releaseStatus.nrs.qtd && (
                    <span className="text-xs text-muted-foreground ml-auto">{releaseStatus.nrs.qtd} ativa(s)</span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>

          <button
            onClick={() => setOpenModal("maquinas")}
            className="bg-card border border-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-4 text-left transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Máquinas</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      releaseStatus.maquinas.status === "liberado" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="text-sm capitalize font-medium">{releaseStatus.maquinas.status}</span>
                  {releaseStatus.maquinas.qtd && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      {releaseStatus.maquinas.qtd} liberada(s)
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>
        </div>

        <Dialog open={openModal === "maquinas"} onOpenChange={(open) => !open && setOpenModal(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Máquinas Liberadas</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {userMachines.map((maq) => (
                <div key={maq.id} className="border border-border rounded-lg p-3">
                  <p className="font-medium text-sm">{maq.nome}</p>
                  <p className="text-xs text-muted-foreground mt-1">{maq.setor}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={openModal === "nrs"} onOpenChange={(open) => !open && setOpenModal(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Normas Regulamentadoras</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {userNRs.map((nr) => (
                <div key={nr.id} className="border border-border rounded-lg p-3">
                  <p className="font-medium text-sm">
                    {nr.numero} - {nr.titulo}
                  </p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={openModal === "treinamentos"} onOpenChange={(open) => !open && setOpenModal(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Treinamentos</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {userTrainings.map((trei) => (
                <div key={trei.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{trei.nome}</p>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${trei.status === "ativo" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}
                    >
                      {trei.status === "ativo" ? "Ativo" : "Vencido"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Vencimento: {trei.dataVencimento}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
