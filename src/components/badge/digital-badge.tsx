"use client"

import { Download, Share2, AlertTriangle, Lock, CheckCircle } from "lucide-react"
import type { User, ReleaseStatus } from "@/lib/mock-data"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

interface DigitalBadgeProps {
  user: User
  releaseStatus: ReleaseStatus
  roleLabel: string
  badgeColor: string
}

export function DigitalBadge({ user, releaseStatus, roleLabel, badgeColor }: DigitalBadgeProps) {
  const isBlocked = user.badgeStatus === "bloqueado"

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Meu Crachá Digital</h1>

        {isBlocked && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex gap-3">
            <Lock className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Crachá Bloqueado</p>
              <p className="text-sm text-foreground mt-1">
                Motivo(s): {user.blockReasons?.join(", ") || "Sem informações"}
              </p>
            </div>
          </div>
        )}

        <div
          className={`rounded-2xl p-8 shadow-xl text-white transform hover:scale-105 transition-transform ${
            isBlocked ? "bg-gradient-to-br from-red-700 via-red-600 to-red-700" : badgeColor
          }`}
        >
          {/* Badge Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="opacity-75 text-sm font-semibold">CRACHÁ CORPORATIVO</p>
              <p className="text-2xl font-bold mt-1">{roleLabel}</p>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              {isBlocked ? <Lock className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
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

          <div className="bg-white/10 rounded-lg p-3 text-center border border-white/20">
            <p className="text-xs opacity-75 font-semibold mb-1">NÚMERO NFC DO CRACHÁ</p>
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

        {/* Compliance Status */}
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

          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm font-semibold text-foreground mb-2">Treinamentos</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  releaseStatus.treinamentos.status !== "vencido" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm capitalize font-medium">{releaseStatus.treinamentos.status}</span>
              {releaseStatus.treinamentos.qtd && (
                <span className="text-xs text-muted-foreground ml-auto">{releaseStatus.treinamentos.qtd} ativo(s)</span>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
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

          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm font-semibold text-foreground mb-2">Máquinas</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  releaseStatus.maquinas.status === "liberado" ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></div>
              <span className="text-sm capitalize font-medium">{releaseStatus.maquinas.status}</span>
              {releaseStatus.maquinas.qtd && (
                <span className="text-xs text-muted-foreground ml-auto">{releaseStatus.maquinas.qtd} liberada(s)</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
