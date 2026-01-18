"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "../../../../components/layouts/dashboard-layout"
import { useIsMobile } from "@/hooks/use-mobile"
import { AlertCircle, CheckCircle, XCircle, Camera } from "lucide-react"

type User = {
  id: string
  urlPhoto?: string
  cpf: string
  email: string
  senha: string
  telefone?: string
  endereco?: string
  cidade?: string
  estado?: string
  cep?: string
  pais?: string
  complemento?: string
  nome: string
  matricula: string
  cargo: string
  setor: string
  foto?: string
  turno?: string
  role: string
  areasPermitidas: string[]
  niveisAcesso: string[]
  bloqueios: string[]
  asoStatus: string
  asoUltimo?: string
  asoVencimento?: string
  asoRestricoes?: string
  situacaoGeral: string
  motivoDesligamento?: string
  treinamentos?: any[]
  certificacoes?: any[]
  epis?: any[]
  acidentes?: any[]
  atestados?: any[]
  ferias?: any[]
  itensViculados?: any[]
}

async function fetchUserByMatricula(matricula: string): Promise<User | null> {
  try {
    const res = await fetch(`/api/colaboradores/user?id=${encodeURIComponent(matricula)}`)
    if (!res.ok) return null
    const user = await res.json()
    if (!user || user.message === "Usuário não encontrado") return null
    return {
      ...user,
      foto: user.urlPhoto,
      areasPermitidas: user.areasPermitidas ?? [],
      niveisAcesso: user.niveisAcesso ?? [],
      bloqueios: user.bloqueios ?? [],
      treinamentos: user.treinamentos ?? [],
      certificacoes: user.certificacoes ?? [],
      epis: user.epis ?? [],
      acidentes: user.acidentes ?? [],
      atestados: user.atestados ?? [],
      ferias: user.ferias ?? [],
      itensViculados: user.itensViculados ?? [],
    }
  } catch {
    return null
  }
}

async function fetchUserByBadgeId(id: string): Promise<User | null> {
  try {
    const res = await fetch(`/api/colaboradores/user?id=${encodeURIComponent(id)}`)
    if (!res.ok) return null
    const user = await res.json()
    if (!user || user.message === "Usuário não encontrado") return null
    return {
      ...user,
      foto: user.urlPhoto,
      nome: user.nome || "(Nome não informado)",
      matricula: user.matricula || "(Matrícula não informada)",
      cargo: user.cargo || "(Cargo não informado)",
      setor: user.setor || "(Setor não informado)",
      areasPermitidas: user.areasPermitidas ?? [],
      niveisAcesso: user.niveisAcesso ?? [],
      bloqueios: user.bloqueios ?? [],
      treinamentos: user.treinamentos ?? [],
      certificacoes: user.certificacoes ?? [],
      epis: user.epis ?? [],
      acidentes: user.acidentes ?? [],
      atestados: user.atestados ?? [],
      ferias: user.ferias ?? [],
      itensViculados: user.itensViculados ?? [],
    }
  } catch {
    return null
  }
}

function getStatusFromUser(user: User): {
  status: "permitido" | "bloqueado"
  motivosBloqueio: string[]
  checklist: { nome: string; validado: boolean }[]
} {
  const motivos: string[] = []
  let permitido = true

  if (user.situacaoGeral?.toLowerCase() !== "ativo") {
    permitido = false
    motivos.push(`Situação geral: ${user.situacaoGeral ?? "Indefinida"}`)
  }

  const asoValido = user.asoStatus === "EM_DIA"

  if (!asoValido) {
    permitido = false
    motivos.push("ASO vencido ou inválido")
  }

  const treinamentosEmDia = true
  const nrsAtualizadas = true

  if (asoValido && user.bloqueios?.length) {
    motivos.push(...user.bloqueios)
  }

  return {
    status: permitido ? "permitido" : "bloqueado",
    motivosBloqueio: motivos,
    checklist: [
      { nome: "ASO válido", validado: asoValido },
      { nome: "Treinamentos em dia", validado: treinamentosEmDia },
      { nome: "NRs atualizadas", validado: nrsAtualizadas },
    ],
  }
}

function UserDataTable({ user }: { user: User }) {
  const fields = [
    ["Nome", user.nome],
    ["Matrícula", user.matricula],
    ["CPF", user.cpf],
    ["E-mail", user.email],
    ["Telefone", user.telefone],
    ["Cargo", user.cargo],
    ["Setor", user.setor],
    ["Turno", user.turno],
    ["Endereço", user.endereco],
    ["Cidade", user.cidade],
    ["Estado", user.estado],
    ["CEP", user.cep],
    ["País", user.pais],
    ["Complemento", user.complemento],
    ["Situação geral", user.situacaoGeral],
    ["Motivo desligamento", user.motivoDesligamento],
    ["Role", user.role],
    ["Áreas permitidas", user.areasPermitidas?.join(", ")],
    ["Níveis de acesso", user.niveisAcesso?.join(", ")],
    ["Bloqueios", user.bloqueios?.join(", ")],
    ["ASO status", user.asoStatus],
    ["ASO último", user.asoUltimo],
    ["ASO vencimento", user.asoVencimento],
    ["ASO restrições", user.asoRestricoes],
  ]

  return (
    <table className="w-full text-xs mt-3">
      <tbody>
        {fields
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <tr key={k}>
              <td className="pr-2 text-foreground-secondary">{k}:</td>
              <td className="font-medium text-foreground">{v}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default function ValidarPage() {
  const [user, setUser] = useState<User | null>(null)
  const [scannedUser, setScannedUser] = useState<User | null>(null)
  const [validationResult, setValidationResult] = useState<"permitido" | "bloqueado" | null>(null)
  const [motivoBloqueio, setMotivoBloqueio] = useState<string[]>([])
  const [checklistValidacao, setChecklistValidacao] = useState<{ nome: string; validado: boolean }[]>([])
  const [qrInput, setQrInput] = useState("")
  const [nfcInput, setNfcInput] = useState("")
  const [loading, setLoading] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const validateFetchedUser = (u: User) => {
    const { status, motivosBloqueio, checklist } = getStatusFromUser(u)
    setValidationResult(status)
    setMotivoBloqueio(motivosBloqueio)
    setChecklistValidacao(checklist)
  }

  const handleScanQR = async (value: string) => {
    setLoading(true)
    const u = await fetchUserByMatricula(value.trim())
    if (u) {
      setScannedUser(u)
      validateFetchedUser(u)
    } else {
      setScannedUser(null)
      setValidationResult(null)
      setMotivoBloqueio([])
      setChecklistValidacao([])
    }
    setLoading(false)
  }

  const handleScanNFC = async (value: string) => {
    setLoading(true)
    const u = await fetchUserByBadgeId(value.trim())
    if (u) {
      setScannedUser(u)
      validateFetchedUser(u)
    } else {
      setScannedUser(null)
      setValidationResult(null)
      setMotivoBloqueio([])
      setChecklistValidacao([])
    }
    setLoading(false)
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Validar Crachá</h1>

        {!scannedUser && (
          <div className="border-dashed border p-6 rounded-lg text-center space-y-3">
            <Camera className="mx-auto opacity-50" />
            <input
              value={isMobile ? nfcInput : qrInput}
              onChange={(e) => (isMobile ? setNfcInput(e.target.value) : setQrInput(e.target.value))}
              className="border rounded px-3 py-2 w-full"
            />
            <button
              onClick={() => (isMobile ? handleScanNFC(nfcInput) : handleScanQR(qrInput))}
              disabled={loading}
              className="bg-primary text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Validando..." : "Validar"}
            </button>
          </div>
        )}

        {scannedUser && (
          <>
            <div className="border rounded p-4">
              <img src={scannedUser.urlPhoto || "/placeholder.svg"} className="w-20 h-20 rounded mb-2" />
              <UserDataTable user={scannedUser} />
            </div>

            <div
              className={`p-4 rounded ${
                validationResult === "permitido" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {validationResult === "permitido" ? (
                <CheckCircle className="text-green-600 mx-auto" />
              ) : (
                <XCircle className="text-red-600 mx-auto" />
              )}
              <p className="text-center font-bold mt-2">
                {validationResult === "permitido" ? "ACESSO PERMITIDO" : "ACESSO BLOQUEADO"}
              </p>
            </div>

            {validationResult === "bloqueado" && (
              <div className="border rounded p-4">
                {motivoBloqueio.map((m, i) => (
                  <p key={i}>{m}</p>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setScannedUser(null)
                setValidationResult(null)
                setMotivoBloqueio([])
                setChecklistValidacao([])
              }}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Próximo
            </button>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
