"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Currency = "HTG" | "USD" | "EUR" | "DOP" | "MXN"

export const CURRENCIES: { value: Currency; label: string }[] = [
  { value: "HTG", label: "Gourde haïtienne (HTG)" },
  { value: "USD", label: "Dollar américain (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "DOP", label: "Peso dominicain (DOP)" },
  { value: "MXN", label: "Peso mexicain (MXN)" },
]

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatAmount: (amount: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("HTG")

  const isValidCurrency = (v: string | null): v is Currency =>
    v === "HTG" || v === "USD" || v === "EUR" || v === "DOP" || v === "MXN"

  // Lire localStorage après montage pour éviter le mismatch d'hydration
  useEffect(() => {
    const saved = localStorage.getItem("preferred-currency")
    if (isValidCurrency(saved)) setCurrencyState(saved)
  }, [])

  // Sync si localStorage change dans un autre onglet
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "preferred-currency" && isValidCurrency(e.newValue))
        setCurrencyState(e.newValue)
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
    const localeMap: Record<Currency, string> = {
      HTG: "fr-HT",
      USD: "en-US",
      EUR: "fr-FR",
      DOP: "es-DO",
      MXN: "en-US",
    }
    const isWhole = Number.isInteger(amount)
    return new Intl.NumberFormat(localeMap[currency], {
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