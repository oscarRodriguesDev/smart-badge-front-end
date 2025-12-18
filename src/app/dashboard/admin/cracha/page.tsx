"use client"

import { useState, useEffect } from "react"
import type { User, ReleaseStatus } from "@/lib/mock-data"
import { mockReleaseStatus } from "@/lib/mock-data"
import { DigitalBadge } from "../../../../components/badge/digital-badge"

export default function AdminCrachaPage() {
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
      roleLabel="ACESSO VÁLIDO - ADMINISTRADOR"
      badgeColor="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900"
    />
  )
}
