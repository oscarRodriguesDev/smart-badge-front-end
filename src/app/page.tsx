"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para login se não autenticado
    router.push("/login")
  }, [router])

  return null
}
