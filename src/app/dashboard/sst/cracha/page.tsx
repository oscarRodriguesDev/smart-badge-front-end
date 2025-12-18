"use client"

import { useState, useEffect } from "react"
import type { User, ReleaseStatus } from "@/lib/mock-data"
import { mockReleaseStatus } from "@/lib/mock-data"
import { DigitalBadge } from "../../../../components/badge/digital-badge"

export default function SSTCrachaPage() {
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
      roleLabel="ACESSO VÁLIDO - SEGURANÇA DO TRABALHO"
      badgeColor="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900"
    />
  )
}
