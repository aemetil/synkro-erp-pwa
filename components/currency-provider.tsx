"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Currency = "HTG" | "USD"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatAmount: (amount: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("HTG")

  // Lire localStorage après montage pour éviter le mismatch d'hydration
  useEffect(() => {
    const saved = localStorage.getItem("preferred-currency")
    if (saved === "HTG" || saved === "USD") {
      setCurrencyState(saved as Currency)
    }
  }, [])

  // Sync si localStorage change dans un autre onglet
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "preferred-currency" && (e.newValue === "HTG" || e.newValue === "USD")) {
        setCurrencyState(e.newValue as Currency)
      }
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [])

  // Sauvegarder la préférence dans localStorage
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem("preferred-currency", newCurrency)
  }

  // Fonction de formatage — affiche les décimales seulement si nécessaire
  const formatAmount = (amount: number) => {
    const isWhole = Number.isInteger(amount)
    return new Intl.NumberFormat("fr-HT", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: isWhole ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}