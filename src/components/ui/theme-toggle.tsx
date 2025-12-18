"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/lib/theme-context"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  try {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-surface hover:bg-surface-light border border-border transition-colors"
        aria-label="Toggle theme"
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
      </button>
    )
  } catch {
    // Fallback for when ThemeProvider is not available
    return (
      <button
        onClick={() => {
          const isDark = document.documentElement.classList.contains("dark")
          if (isDark) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
          } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
          }
          // Force re-render
          window.location.reload()
        }}
        className="p-2 rounded-lg bg-surface hover:bg-surface-light border border-border transition-colors"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5 text-yellow-400" />
      </button>
    )
  }
}
