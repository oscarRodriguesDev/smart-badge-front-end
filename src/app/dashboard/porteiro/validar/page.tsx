"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/mock-data"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { useIsMobile } from "@/hooks/use-mobile"
import { AlertCircle, CheckCircle, XCircle, Camera } from "lucide-react"

export default function ValidarPage() {
  const [user, setUser] = useState<User | null>(null)
  const [scannedUser, setScannedUser] = useState<any>(null)
  const [validationResult, setValidationResult] = useState<"permitido" | "bloqueado" | null>(null)
  const [qrInput, setQrInput] = useState("")
  const [nfcInput, setNfcInput] = useState("")
  const isMobile = useIsMobile()

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const mockUsers = [
    {
      id: "col-001",
      nome: "João Silva",
      matricula: "MAT-2024-001",
      badgeId: "NFC-2024-001",
      cargo: "Operador de Máquina",
      setor: "Produção",
      foto: "/professional-man-headshot.png",
      status: "liberado",
    },
    {
      id: "col-002",
      nome: "Maria Santos",
      matricula: "MAT-2024-006",
      badgeId: "NFC-2024-006",
      cargo: "Técnica de Qualidade",
      setor: "Qualidade",
      foto: "/professional-woman-headshot.png",
      status: "liberado",
    },
    {
      id: "col-003",
      nome: "Carlos Ferreira",
      matricula: "MAT-2024-007",
      badgeId: "NFC-2024-007",
      cargo: "Eletricista",
      setor: "Manutenção",
      foto: "/professional-man-headshot.png",
      status: "bloqueado",
    },
  ]

  const handleScanQR = (matricula: string) => {
    const found = mockUsers.find((u) => u.matricula.includes(matricula))
    if (found) {
      setScannedUser(found)
      setValidationResult(found.status === "liberado" ? "permitido" : "bloqueado")
      setQrInput("")
    }
  }

  const handleScanNFC = (badgeId: string) => {
    const found = mockUsers.find((u) => u.badgeId.includes(badgeId))
    if (found) {
      setScannedUser(found)
      setValidationResult(found.status === "liberado" ? "permitido" : "bloqueado")
      setNfcInput("")
    }
  }

  const handleSimulateQRInput = () => {
    if (qrInput) {
      handleScanQR(qrInput)
    }
  }

  if (!user) return null

  if (isMobile) {
    return (
      <DashboardLayout>
        <div className="p-4 space-y-4 pb-24">
          <h1 className="text-xl font-bold text-foreground">Validar Crachá</h1>

          {!scannedUser ? (
            <div className="space-y-4">
              {/* NFC Reader Area */}
              <div className="bg-surface border-2 border-dashed border-primary rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                <p className="text-sm text-foreground-secondary mb-4">Aproxime o crachá</p>
                <input
                  type="text"
                  value={nfcInput}
                  onChange={(e) => setNfcInput(e.target.value)}
                  placeholder="ID do Crachá"
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground-secondary focus:outline-none focus:border-primary mb-3"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && nfcInput) handleScanNFC(nfcInput)
                  }}
                />
                <button
                  onClick={() => nfcInput && handleScanNFC(nfcInput)}
                  className="w-full px-4 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  Validar
                </button>
              </div>

              {/* Quick Test Buttons */}
              <div className="space-y-2">
                <p className="text-xs text-foreground-secondary font-semibold">Teste rápido:</p>
                {mockUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleScanNFC(u.badgeId)}
                    className="w-full text-left px-4 py-3 bg-card border border-border rounded-lg hover:border-primary transition-colors text-sm"
                  >
                    <p className="font-medium text-foreground">{u.nome}</p>
                    <p className="text-xs text-foreground-secondary">{u.badgeId}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Validation Result */
            <div className="space-y-4">
              {/* User Info */}
              <div className="bg-card border border-border rounded-lg p-4">
                <img
                  src={scannedUser.foto || "/placeholder.svg"}
                  alt={scannedUser.nome}
                  className="w-16 h-16 rounded-lg object-cover border border-border mx-auto mb-3"
                />
                <p className="text-center font-bold text-foreground mb-1">{scannedUser.nome}</p>
                <p className="text-center text-xs text-foreground-secondary">{scannedUser.cargo}</p>
                <p className="text-center text-xs text-foreground-secondary">{scannedUser.badgeId}</p>
              </div>

              {/* Result Badge */}
              <div
                className={`border rounded-lg p-6 text-center ${
                  validationResult === "permitido" ? "bg-success/10 border-success/30" : "bg-danger/10 border-danger/30"
                }`}
              >
                <div className="flex justify-center mb-3">
                  {validationResult === "permitido" ? (
                    <CheckCircle className="w-10 h-10 text-success" />
                  ) : (
                    <XCircle className="w-10 h-10 text-danger" />
                  )}
                </div>
                <p className={`text-lg font-bold ${validationResult === "permitido" ? "text-success" : "text-danger"}`}>
                  {validationResult === "permitido" ? "ACESSO PERMITIDO" : "ACESSO BLOQUEADO"}
                </p>
              </div>

              {/* Checklist */}
              {validationResult === "permitido" && (
                <div className="bg-success/5 border border-success/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">ASO válido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">Treinamentos em dia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">NRs atualizadas</span>
                  </div>
                </div>
              )}

              {validationResult === "bloqueado" && (
                <div className="bg-danger/5 border border-danger/30 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">Documentação vencida. Contate RH.</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setScannedUser(null)
                  setValidationResult(null)
                }}
                className="w-full px-4 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Próximo
              </button>
            </div>
          )}
        </div>
      </DashboardLayout>
    )
  }

  // Desktop view - original implementation
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Validar Crachá</h1>
          <p className="text-foreground-secondary">Escaneie o QR Code do crachá do colaborador</p>
        </div>

        {/* QR Scanner Area */}
        <div className="bg-surface border-2 border-dashed border-border rounded-lg p-8 text-center">
          <div className="bg-surface-light rounded-lg p-12 mb-6 flex items-center justify-center">
            <Camera className="w-16 h-16 text-foreground-secondary opacity-50" />
          </div>
          <p className="text-foreground-secondary mb-4">Escaneie o QR Code aqui</p>

          {/* Simulated QR Input */}
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="text"
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              placeholder="Cole o valor do QR ou teste"
              className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-2 text-foreground placeholder-foreground-secondary focus:outline-none focus:border-primary"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSimulateQRInput()
                }
              }}
            />
            <button
              onClick={handleSimulateQRInput}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium"
            >
              Ler
            </button>
          </div>

          {/* Quick test buttons */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-foreground-secondary mb-3">Teste rápido:</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {mockUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleScanQR(u.matricula)}
                  className="text-xs px-3 py-1 bg-surface-light hover:bg-surface border border-border rounded transition-colors text-foreground"
                >
                  {u.nome}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Validation Result */}
        {scannedUser && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Resultado da Validação</h2>

            {/* User Card */}
            <div className="bg-surface border border-border rounded-lg p-6 mb-6">
              <div className="flex gap-6 items-start">
                <img
                  src={scannedUser.foto || "/placeholder.svg"}
                  alt={scannedUser.nome}
                  className="w-20 h-20 rounded-lg object-cover border border-border"
                />
                <div className="flex-1">
                  <p className="text-xs text-foreground-secondary mb-1">COLABORADOR</p>
                  <h3 className="text-xl font-bold text-foreground mb-1">{scannedUser.nome}</h3>
                  <div className="space-y-1 text-sm text-foreground-secondary">
                    <p>Matrícula: {scannedUser.matricula}</p>
                    <p>Cargo: {scannedUser.cargo}</p>
                    <p>Setor: {scannedUser.setor}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div
              className={`border rounded-lg p-6 text-center mb-6 ${
                validationResult === "permitido" ? "bg-success/10 border-success/30" : "bg-danger/10 border-danger/30"
              }`}
            >
              <div className="flex justify-center mb-3">
                {validationResult === "permitido" ? (
                  <CheckCircle className="w-12 h-12 text-success" />
                ) : (
                  <XCircle className="w-12 h-12 text-danger" />
                )}
              </div>
              <h2
                className={`text-2xl font-bold mb-2 ${
                  validationResult === "permitido" ? "text-success" : "text-danger"
                }`}
              >
                {validationResult === "permitido" ? "ACESSO PERMITIDO" : "ACESSO BLOQUEADO"}
              </h2>
              <p className={validationResult === "permitido" ? "text-success/70" : "text-danger/70"}>
                {validationResult === "permitido"
                  ? "Colaborador autorizado para acesso"
                  : "Este colaborador está com acesso bloqueado"}
              </p>
            </div>

            {/* Checklist */}
            {validationResult === "permitido" && (
              <div className="bg-success/5 border border-success/30 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-success mb-4">Requisitos Validados</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-foreground">ASO válido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-foreground">Treinamentos em dia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-foreground">NRs atualizadas</span>
                  </div>
                </div>
              </div>
            )}

            {validationResult === "bloqueado" && (
              <div className="bg-danger/5 border border-danger/30 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-danger mb-4">Motivo do Bloqueio</h3>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">
                    Documentação vencida. Contate o RH para regularização.
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setScannedUser(null)
                setValidationResult(null)
              }}
              className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors"
            >
              Próximo Colaborador
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
