"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@/lib/mock-data"
import { LogOut, X } from "lucide-react"
import { ThemeToggle } from "../../components/ui/theme-toggle"

interface SidebarProps {
  user: User | null
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ user, isOpen = true, onClose }: SidebarProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getMenuItems = () => {
    if (!user) return []

    const baseMenuItems = [
      {
        label: "Sair",
        icon: LogOut,
        action: () => {
          sessionStorage.removeItem("currentUser")
          router.push("/login")
        },
      },
    ]

    switch (user.role) {
      case "colaborador":
        return [
          { label: "Home", href: "/dashboard/colaborador", icon: null },
          { label: "Meu Crachá", href: "/dashboard/colaborador/cracha", icon: null },
          { label: "Status Liberação", href: "/dashboard/colaborador/status", icon: null },
          { label: "Histórico de Acessos", href: "/dashboard/colaborador/acessos", icon: null },
          { label: "Notificações", href: "/dashboard/colaborador/notificacoes", icon: null },
          { label: "Perfil", href: "/dashboard/colaborador/perfil", icon: null },
          ...baseMenuItems,
        ]
      case "porteiro":
        return [
          { label: "Dashboard", href: "/dashboard/porteiro", icon: null },
          { label: "Meu Crachá", href: "/dashboard/porteiro/cracha", icon: null },
          { label: "Validar Crachá", href: "/dashboard/porteiro/validar", icon: null },
          { label: "Entrada/Saída", href: "/dashboard/porteiro/registro", icon: null },
          { label: "Histórico", href: "/dashboard/porteiro/historico", icon: null },
          ...baseMenuItems,
        ]
      case "rh":
        return [
          { label: "Dashboard", href: "/dashboard/rh", icon: null },
          { label: "Meu Crachá", href: "/dashboard/rh/cracha", icon: null },
          { label: "Colaboradores", href: "/dashboard/rh/colaboradores", icon: null },
          { label: "Novo Colaborador", href: "/dashboard/rh/novo", icon: null },
          { label: "Documentos", href: "/dashboard/rh/documentos", icon: null },
          { label: "Bloqueios", href: "/dashboard/rh/bloqueios", icon: null },
          ...baseMenuItems,
        ]
      case "sst":
        return [
          { label: "Dashboard", href: "/dashboard/sst", icon: null },
          { label: "Meu Crachá", href: "/dashboard/sst/cracha", icon: null },
          { label: "NRs", href: "/dashboard/sst/nrs", icon: null },
          { label: "Treinamentos", href: "/dashboard/sst/treinamentos", icon: null },
          { label: "Máquinas", href: "/dashboard/sst/maquinas", icon: null },
          { label: "EPIs", href: "/dashboard/sst/epis", icon: null },
          { label: "Acidentes", href: "/dashboard/sst/acidentes", icon: null },
          { label: "Bloqueios", href: "/dashboard/sst/bloqueios", icon: null },
          ...baseMenuItems,
        ]
      case "gestor":
        return [
          { label: "Dashboard", href: "/dashboard/gestor", icon: null },
          { label: "Meu Crachá", href: "/dashboard/gestor/cracha", icon: null },
          { label: "Minha Equipe", href: "/dashboard/gestor/equipe", icon: null },
          { label: "Relatórios", href: "/dashboard/gestor/relatorios", icon: null },
          { label: "Liberações", href: "/dashboard/gestor/liberacoes", icon: null },
          ...baseMenuItems,
        ]
      case "admin":
        return [
          { label: "Dashboard", href: "/dashboard/admin", icon: null },
          { label: "Meu Crachá", href: "/dashboard/admin/cracha", icon: null },
          { label: "Usuários", href: "/dashboard/admin/usuarios", icon: null },
          { label: "Máquinas", href: "/dashboard/admin/maquinas", icon: null },
          { label: "Configurações", href: "/dashboard/admin/config", icon: null },
          { label: "Auditoria", href: "/dashboard/admin/auditoria", icon: null },
          ...baseMenuItems,
        ]
      default:
        return baseMenuItems
    }
  }

  const menuItems = getMenuItems()

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border transform transition-transform duration-200 lg:relative lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header with Theme Toggle */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-bold text-foreground">Crachá Sistema</h2>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={onClose} className="lg:hidden text-foreground-secondary hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-border">
            <img
              src={user.foto || "/placeholder.svg"}
              alt={user.nome}
              className="w-12 h-12 rounded-lg mb-2 object-cover"
            />
            <p className="text-sm font-medium text-foreground">{user.nome}</p>
            <p className="text-xs text-foreground-secondary">{user.cargo}</p>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            if ("action" in item && item.action) {
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full text-left px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-light transition-colors flex items-center gap-2"
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.label}
                </button>
              )
            }

            const href = "href" in item ? item.href : "#"

            return (
              <Link
                key={item.label}
                href={href}
                className="block px-4 py-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-surface-light transition-colors"
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
