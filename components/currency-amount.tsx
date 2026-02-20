"use client"

import { useCurrency } from "./currency-provider"

interface CurrencyAmountProps {
  amount: number
  className?: string
}

export function CurrencyAmount({ amount, className }: CurrencyAmountProps) {
  const { formatAmount } = useCurrency()

  return <span className={className}>{formatAmount(amount)}</span>
}