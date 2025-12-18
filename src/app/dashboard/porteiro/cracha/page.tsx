"use client"

import { useState, useEffect } from "react"
import type { User, ReleaseStatus } from "@/lib/mock-data"
import { mockReleaseStatus } from "@/lib/mock-data"
import { DigitalBadge } from "../../../../components/badge/digital-badge"

export default function PorteiroCrachaPage() {
  const [user, setUser] = useState<User | null>(null)
  const [releaseStatus] = useState<ReleaseStatus>(mockReleaseStatus)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  return (
    <DigitalBadge
      user={user}
      releaseStatus={releaseStatus}
      roleLabel="ACESSO VÁLIDO - PORTEIRO"
      badgeColor="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    />
  )
}
