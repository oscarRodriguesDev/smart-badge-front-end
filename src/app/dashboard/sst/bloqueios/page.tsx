"use client"

import { useState } from "react"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { AlertTriangle, Unlock } from "lucide-react"
import { mockColaboradores } from "@/lib/mock-data"

interface ASOBlock {
  usuarioId: string
  dataVencimento: string
  diasRestantes: number
  bloqueadoAutomaticamente: boolean
}

export default function BloqueiosSSTeamPage() {
  const [asoBlocks, setAsoBlocks] = useState<ASOBlock[]>([
    {
      usuarioId: "col-002",
      dataVencimento: "2025-12-05",
      diasRestantes: -8,
      bloqueadoAutomaticamente: true,
    },
    {
      usuarioId: "col-003",
      dataVencimento: "2025-12-20",
      diasRestantes: 7,
      bloqueadoAutomaticamente: false,
    },
  ])

  const handleUnblockASO = (usuarioId: string) => {
    setAsoBlocks((prev) => prev.filter((b) => b.usuarioId !== usuarioId))
  }

  const getStatusColor = (diasRestantes: number) => {
    if (diasRestantes < 0) return "bg-danger/10 border-danger/30 text-danger"
    if (diasRestantes <= 15) return "bg-warning/10 border-warning/30 text-warning"
    return "bg-success/10 border-success/30 text-success"
  }

  const getStatusText = (diasRestantes: number) => {
    if (diasRestantes < 0) return `Vencido há ${Math.abs(diasRestantes)} dias`
    return `${diasRestantes} dias restantes`
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Bloqueios por ASO Vencido</h1>

        {/* Info Alert */}
        <div className="bg-info/10 border border-info/30 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-info">Sistema de Bloqueio Automático Ativo</p>
            <p className="text-sm text-foreground mt-1">
              Colaboradores com ASO vencido são automaticamente bloqueados. Libere manualmente quando o novo ASO for
              aprovado.
            </p>
          </div>
        </div>

        {/* ASO Expired List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Colaboradores com ASO Vencido</h2>

          {asoBlocks.length === 0 ? (
            <div className="bg-surface border border-border rounded-lg p-8 text-center">
              <p className="text-muted">Nenhum colaborador com ASO vencido</p>
            </div>
          ) : (
            asoBlocks.map((block) => (
              <div key={block.usuarioId} className={`border rounded-lg p-6 ${getStatusColor(block.diasRestantes)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      {mockColaboradores.find((c) => c.id === block.usuarioId)?.nome}
                    </p>
                    <p className="text-sm text-muted">
                      {mockColaboradores.find((c) => c.id === block.usuarioId)?.matricula}
                    </p>
                  </div>
                  {block.bloqueadoAutomaticamente && (
                    <span className="bg-danger text-white text-xs px-2 py-1 rounded font-medium">
                      BLOQUEADO AUTOMATICAMENTE
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vencimento:</span>
                    <span className="text-sm font-mono">{block.dataVencimento}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status:</span>
                    <span className="text-sm font-semibold">{getStatusText(block.diasRestantes)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleUnblockASO(block.usuarioId)}
                  className="w-full bg-success hover:bg-success/80 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  Liberar (ASO Novo Aprovado)
                </button>
              </div>
            ))
          )}
        </div>

        {/* Warning about automatic blocking */}
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
          <p className="text-sm text-foreground">
            <strong>Nota:</strong> O sistema verifica automaticamente a data de vencimento do ASO. Qualquer colaborador
            com ASO vencido será automaticamente bloqueado e impedido de acessar as instalações.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
