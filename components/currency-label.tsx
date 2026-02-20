"use client"

import { useCurrency } from "./currency-provider"

interface CurrencyLabelProps {
  children: React.ReactNode
}

export function CurrencyLabel({ children }: CurrencyLabelProps) {
  const { currency } = useCurrency()

  return <>{children?.toString().replace(/HTG|USD/g, currency)}</>
}