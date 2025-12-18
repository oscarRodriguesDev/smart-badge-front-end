"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@/lib/mock-data"
import { Home, Settings, LogOut } from "lucide-react"

interface MobileNavProps {
  user: User | null
}

export function MobileNav({ user }: MobileNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !user) return null

  const getMenuItems = () => {
    switch (user.role) {
      case "colaborador":
        return [
          { label: "Home", href: "/dashboard/colaborador", icon: Home },
          { label: "Crachá", href: "/dashboard/colaborador/cracha", icon: Home },
          { label: "Status", href: "/dashboard/colaborador/status", icon: Home },
          { label: "Perfil", href: "/dashboard/colaborador/perfil", icon: Settings },
        ]
      case "porteiro":
        return [
          { label: "Dashboard", href: "/dashboard/porteiro", icon: Home },
          { label: "Validar", href: "/dashboard/porteiro/validar", icon: Home },
          { label: "Histórico", href: "/dashboard/porteiro/historico", icon: Home },
        ]
      case "rh":
        return [
          { label: "Home", href: "/dashboard/rh", icon: Home },
          { label: "Equipe", href: "/dashboard/rh/colaboradores", icon: Home },
          { label: "Novo", href: "/dashboard/rh/novo", icon: Home },
        ]
      case "sst":
        return [
          { label: "Home", href: "/dashboard/sst", icon: Home },
          { label: "NRs", href: "/dashboard/sst/nrs", icon: Home },
          { label: "Máquinas", href: "/dashboard/sst/maquinas", icon: Home },
        ]
      case "gestor":
        return [
          { label: "Home", href: "/dashboard/gestor", icon: Home },
          { label: "Equipe", href: "/dashboard/gestor/equipe", icon: Home },
          { label: "Relatórios", href: "/dashboard/gestor/relatorios", icon: Home },
        ]
      case "admin":
        return [
          { label: "Home", href: "/dashboard/admin", icon: Home },
          { label: "Usuários", href: "/dashboard/admin/usuarios", icon: Home },
          { label: "Config", href: "/dashboard/admin/config", icon: Settings },
        ]
      default:
        return []
    }
  }

  const menuItems = getMenuItems()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-sm border-t border-border lg:hidden z-30">
      <div className="flex justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href)

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 text-xs transition-colors ${
                isActive ? "text-primary" : "text-foreground-secondary hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs text-center">{item.label}</span>
            </Link>
          )
        })}
        <button
          onClick={() => {
            sessionStorage.removeItem("currentUser")
            router.push("/login")
          }}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 text-xs text-foreground-secondary hover:text-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs">Sair</span>
        </button>
      </div>
    </div>
  )
}
