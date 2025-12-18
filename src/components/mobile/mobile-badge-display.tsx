"use client"

import { useState } from "react"
import type { User, ReleaseStatus } from "@/lib/mock-data"
import { Lock, CheckCircle, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"

interface MobileBadgeDisplayProps {
  user: User
  releaseStatus: ReleaseStatus
  isBlocked: boolean
  validation: { status: string; reasons: string[] }
}

export function MobileBadgeDisplay({ user, releaseStatus, isBlocked, validation }: MobileBadgeDisplayProps) {
  const [openModal, setOpenModal] = useState<"maquinas" | "nrs" | "treinamentos" | null>(null)

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
    { id: "trei-001", nome: "NR-12 Operação de Máquinas", dataVencimento: "2025-12-15", status: "ativo" },
    { id: "trei-002", nome: "Segurança em Altura", dataVencimento: "2026-06-10", status: "ativo" },
    { id: "trei-003", nome: "Primeiros Socorros", dataVencimento: "2025-09-20", status: "vencido" },
  ]

  return (
    <div className="space-y-4">
      {/* Full-screen Badge Card */}
      <div
        className={`rounded-xl p-6 shadow-2xl text-white transform transition-all ${
          isBlocked
            ? "bg-gradient-to-br from-red-700 via-red-600 to-red-700"
            : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        }`}
      >
        {/* Header with Status Badge */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="opacity-75 text-xs font-semibold tracking-wide">CRACHÁ</p>
            <p className="text-lg font-bold mt-1">{isBlocked ? "BLOQUEADO" : "VÁLIDO"}</p>
          </div>
          {isBlocked ? <Lock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
        </div>

        {/* Profile Photo & Info - Stacked vertically on mobile */}
        <div className="mb-6 text-center">
          <img
            src={user.foto || "/placeholder.svg"}
            alt={user.nome}
            className="w-24 h-24 rounded-lg object-cover border-2 border-white/50 mx-auto mb-4"
          />
          <p className="text-2xl font-bold">{user.nome}</p>
          <p className="text-sm opacity-75 mt-1">{user.cargo}</p>
          <p className="text-xs opacity-60 mt-1">{user.setor}</p>
        </div>

        {/* Badge ID - Large and prominent */}
        <div className="bg-white/20 rounded-lg p-4 mb-4 border border-white/30 text-center">
          <p className="text-xs opacity-75 font-semibold mb-1">NÚMERO DO CRACHÁ</p>
          <p className="text-3xl font-mono font-bold tracking-widest">{user.badgeId}</p>
        </div>

        {/* Status Indicator */}
        <div className="bg-white/15 rounded-lg p-3 text-center border border-white/20">
          <div className="flex items-center justify-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${isBlocked ? "bg-red-400 animate-pulse" : "bg-green-400 animate-pulse"}`}
            ></div>
            <span className="font-bold text-sm">{isBlocked ? "ACESSO BLOQUEADO" : "ACESSO LIBERADO"}</span>
          </div>
        </div>
      </div>

      {/* Blocked Info */}
      {isBlocked && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
          <p className="text-sm text-red-800 dark:text-red-200">
            <strong>Motivo(s):</strong> {validation.reasons.join(", ")}
          </p>
          <p className="text-xs text-red-700 dark:text-red-300 mt-2">
            Procure o departamento de RH ou Segurança do Trabalho.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">Informações</p>

        {/* ASO Status Card - Only one with status display */}
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">ASO</span>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${releaseStatus.aso.status === "liberado" ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <span className="text-xs font-medium capitalize">{releaseStatus.aso.status}</span>
            </div>
          </div>
        </div>

        {/* Interactive button for Máquinas */}
        <button
          onClick={() => setOpenModal("maquinas")}
          className="w-full bg-card border border-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-3 text-left transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-foreground">Máquinas</span>
              <p className="text-xs text-muted-foreground mt-1">{userMachines.length} máquinas</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>

        {/* Interactive button for NRs */}
        <button
          onClick={() => setOpenModal("nrs")}
          className="w-full bg-card border border-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-3 text-left transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-foreground">NRs (Normas Regulamentadoras)</span>
              <p className="text-xs text-muted-foreground mt-1">{userNRs.length} normas</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>

        {/* Interactive button for Treinamentos */}
        <button
          onClick={() => setOpenModal("treinamentos")}
          className="w-full bg-card border border-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-3 text-left transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-foreground">Treinamentos</span>
              <p className="text-xs text-muted-foreground mt-1">{userTrainings.length} treinamentos</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-primary hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors text-sm">
          Baixar
        </button>
        <button className="bg-card border border-border hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground font-medium py-3 rounded-lg transition-colors text-sm">
          Compartilhar
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
  )
}
