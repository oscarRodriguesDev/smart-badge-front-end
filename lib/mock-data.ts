export interface User {
  id: string
  email: string
  nome: string
  matricula: string
  badgeId: string
  cargo: string
  setor: string
  foto: string
  role: "colaborador" | "porteiro" | "rh" | "sst" | "gestor" | "admin"
  status: "ativo" | "inativo" | "bloqueado"
  badgeStatus: "liberado" | "bloqueado" | "suspenso"
  blockReasons?: string[]
  blockDate?: string
  blockReason?: string
}

export interface ReleaseStatus {
  aso: { status: "liberado" | "vencido" | "pendente"; data?: string }
  treinamentos: { status: "completo" | "incompleto" | "vencido"; qtd?: number }
  nrs: { status: "completo" | "incompleto"; qtd?: number }
  maquinas: { status: "liberado" | "restrito"; qtd?: number }
}

export interface AccessRecord {
  id: string
  usuarioId: string
  tipo: "entrada" | "saida"
  data: string
  hora: string
  local: string
  status: "permitido" | "negado" | "pendente"
}

export interface Colaborador {
  id: string
  nome: string
  matricula: string
  email: string
  cargo: string
  setor: string
  foto: string
  dataAdmissao: string
  status: "ativo" | "inativo"
  telefone: string
  endereco: string
}

export interface NR {
  id: string
  numero: string
  titulo: string
  descricao: string
  dataVigencia: string
  ativo: boolean
}

export interface Maquina {
  id: string
  nome: string
  setor: string
  nrsRequeridas: string[]
  statusOperacional: "ativa" | "manutencao" | "inativa"
  ultimaManutencao: string
}

export interface BadgeBlock {
  id: string
  usuarioId: string
  razao: "suspensao" | "ferias" | "aso_vencido" | "nr_vencida" | "treinamento_vencido" | "outro"
  descricao: string
  dataBloqueio: string
  dataLivracao?: string
  bloqueadoPor: string
  bloqueadoPorRole: "rh" | "sst" | "system"
}

// Mock Users
export const mockUsers: Record<string, User> = {
  "colaborador-001": {
    id: "colaborador-001",
    email: "joao.silva@company.com",
    nome: "João Silva",
    matricula: "MAT-2024-001",
    badgeId: "NFC-2024-00001",
    cargo: "Operador de Máquina",
    setor: "Produção",
    foto: "/professional-man-headshot.png",
    role: "colaborador",
    status: "ativo",
    badgeStatus: "liberado",
    blockReasons: [],
  },
  "porteiro-001": {
    id: "porteiro-001",
    email: "carlos.porter@company.com",
    nome: "Carlos Santos",
    matricula: "MAT-2024-002",
    badgeId: "NFC-2024-00002",
    cargo: "Porteiro",
    setor: "Portaria",
    foto: "/professional-man-headshot.png",
    role: "porteiro",
    status: "ativo",
    badgeStatus: "liberado",
    blockReasons: [],
  },
  "rh-001": {
    id: "rh-001",
    email: "maria.rh@company.com",
    nome: "Maria Costa",
    matricula: "MAT-2024-003",
    badgeId: "NFC-2024-00003",
    cargo: "Analista de RH",
    setor: "Recursos Humanos",
    foto: "/professional-woman-headshot.png",
    role: "rh",
    status: "ativo",
    badgeStatus: "liberado",
    blockReasons: [],
  },
  "sst-001": {
    id: "sst-001",
    email: "pedro.sst@company.com",
    nome: "Pedro Oliveira",
    matricula: "MAT-2024-004",
    badgeId: "NFC-2024-00004",
    cargo: "Analista SST",
    setor: "Segurança do Trabalho",
    foto: "/professional-man-headshot.png",
    role: "sst",
    status: "ativo",
    badgeStatus: "liberado",
    blockReasons: [],
  },
  "gestor-001": {
    id: "gestor-001",
    email: "ana.gestor@company.com",
    nome: "Ana Garcia",
    matricula: "MAT-2024-005",
    badgeId: "NFC-2024-00005",
    cargo: "Gerente de Produção",
    setor: "Produção",
    foto: "/professional-woman-headshot.png",
    role: "gestor",
    status: "ativo",
    badgeStatus: "liberado",
    blockReasons: [],
  },
  "admin-001": {
    id: "admin-001",
    email: "admin@company.com",
    nome: "Admin System",
    matricula: "MAT-2024-000",
    badgeId: "NFC-2024-00000",
    cargo: "Administrador",
    setor: "TI",
    foto: "/professional-man-headshot.png",
    role: "admin",
    status: "ativo",
    badgeStatus: "liberado",
    blockReasons: [],
  },
}

// Mock release status for collaborator
export const mockReleaseStatus: ReleaseStatus = {
  aso: { status: "liberado", data: "2025-12-31" },
  treinamentos: { status: "completo", qtd: 3 },
  nrs: { status: "completo", qtd: 5 },
  maquinas: { status: "liberado", qtd: 4 },
}

// Mock access records
export const mockAccessRecords: AccessRecord[] = [
  {
    id: "acesso-001",
    usuarioId: "colaborador-001",
    tipo: "entrada",
    data: "13/12/2025",
    hora: "08:15",
    local: "Portaria Principal",
    status: "permitido",
  },
  {
    id: "acesso-002",
    usuarioId: "colaborador-001",
    tipo: "saida",
    data: "13/12/2025",
    hora: "12:30",
    local: "Portaria Principal",
    status: "permitido",
  },
  {
    id: "acesso-003",
    usuarioId: "colaborador-001",
    tipo: "entrada",
    data: "13/12/2025",
    hora: "13:15",
    local: "Portaria Principal",
    status: "permitido",
  },
]

// Mock colaboradores for HR
export const mockColaboradores: Colaborador[] = [
  {
    id: "col-001",
    nome: "João Silva",
    matricula: "MAT-2024-001",
    email: "joao.silva@company.com",
    cargo: "Operador de Máquina",
    setor: "Produção",
    foto: "/professional-man-headshot.png",
    dataAdmissao: "2024-01-15",
    status: "ativo",
    telefone: "(11) 99999-8888",
    endereco: "Rua A, 123 - São Paulo, SP",
  },
  {
    id: "col-002",
    nome: "Maria Santos",
    matricula: "MAT-2024-006",
    email: "maria.santos@company.com",
    cargo: "Técnica de Qualidade",
    setor: "Qualidade",
    foto: "/professional-woman-headshot.png",
    dataAdmissao: "2024-02-20",
    status: "ativo",
    telefone: "(11) 99999-7777",
    endereco: "Rua B, 456 - São Paulo, SP",
  },
  {
    id: "col-003",
    nome: "Carlos Ferreira",
    matricula: "MAT-2024-007",
    email: "carlos.ferreira@company.com",
    cargo: "Eletricista",
    setor: "Manutenção",
    foto: "/professional-man-headshot.png",
    dataAdmissao: "2024-03-10",
    status: "ativo",
    telefone: "(11) 99999-6666",
    endereco: "Rua C, 789 - São Paulo, SP",
  },
]

// Mock NRs
export const mockNRs: NR[] = [
  {
    id: "nr-001",
    numero: "NR-1",
    titulo: "Disposições Gerais",
    descricao: "Normas relacionadas a disposições gerais de segurança do trabalho",
    dataVigencia: "2020-01-01",
    ativo: true,
  },
  {
    id: "nr-002",
    numero: "NR-6",
    titulo: "Equipamento de Proteção Individual (EPI)",
    descricao: "Regula o uso e a disponibilização de EPIs aos trabalhadores",
    dataVigencia: "2020-06-01",
    ativo: true,
  },
  {
    id: "nr-003",
    numero: "NR-12",
    titulo: "Máquinas e Equipamentos",
    descricao: "Estabelece requisitos de segurança em máquinas e equipamentos",
    dataVigencia: "2020-12-01",
    ativo: true,
  },
  {
    id: "nr-004",
    numero: "NR-17",
    titulo: "Ergonomia",
    descricao:
      "Estabelece parâmetros que permitam a adaptação das condições de trabalho às características psicofisiológicas dos trabalhadores",
    dataVigencia: "2021-06-01",
    ativo: true,
  },
]

// Mock Máquinas
export const mockMaquinas: Maquina[] = [
  {
    id: "maq-001",
    nome: "Prensa Hidráulica A1",
    setor: "Produção",
    nrsRequeridas: ["NR-12", "NR-6"],
    statusOperacional: "ativa",
    ultimaManutencao: "2025-11-15",
  },
  {
    id: "maq-002",
    nome: "Torno CNC T2",
    setor: "Produção",
    nrsRequeridas: ["NR-12", "NR-17"],
    statusOperacional: "ativa",
    ultimaManutencao: "2025-12-01",
  },
  {
    id: "maq-003",
    nome: "Esmerilhadeira E1",
    setor: "Acabamento",
    nrsRequeridas: ["NR-6"],
    statusOperacional: "manutencao",
    ultimaManutencao: "2025-10-20",
  },
]

// Função para simular autenticação
export function authenticateUser(email: string, password: string): User | null {
  // Mock: qualquer password funciona
  const user = Object.values(mockUsers).find((u) => u.email === email)
  return user || null
}

export function getUserById(id: string): User | null {
  return mockUsers[id] || null
}

export function validateBadgeAccess(
  userId: string,
  releaseStatus: ReleaseStatus,
): {
  canAccess: boolean
  status: "liberado" | "bloqueado"
  reasons: string[]
} {
  const reasons: string[] = []

  // Check ASO status
  if (releaseStatus.aso.status === "vencido") {
    reasons.push("ASO vencido")
  }

  // Check trainings
  if (releaseStatus.treinamentos.status === "vencido") {
    reasons.push("Treinamento vencido")
  }

  // Check NRs
  if (releaseStatus.nrs.status === "incompleto") {
    reasons.push("NRs não completas")
  }

  // Check machine access
  if (releaseStatus.maquinas.status === "restrito") {
    reasons.push("Acesso a máquinas restrito")
  }

  return {
    canAccess: reasons.length === 0,
    status: reasons.length === 0 ? "liberado" : "bloqueado",
    reasons,
  }
}
