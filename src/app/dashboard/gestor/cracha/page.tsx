"use client"

import { useState, useEffect } from "react"
import type { User, ReleaseStatus } from "@/lib/mock-data"
import { mockReleaseStatus } from "@/lib/mock-data"
import { DigitalBadge } from "../../../../components/badge/digital-badge"

export default function GestorCrachaPage() {
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
      roleLabel="ACESSO VÁLIDO - GESTOR"
      badgeColor="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900"
    />
  )
}
