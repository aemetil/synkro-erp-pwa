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

  // Charger la préférence depuis localStorage au montage
  useEffect(() => {
    const saved = localStorage.getItem("preferred-currency")
    if (saved === "HTG" || saved === "USD") {
      setCurrencyState(saved)
    }
  }, [])

  // Sauvegarder la préférence dans localStorage
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem("preferred-currency", newCurrency)
  }

  // Fonction de formatage
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fr-HT", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
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