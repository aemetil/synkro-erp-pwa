"use client"

import { useCurrency } from "./currency-provider"
import { Button } from "./ui/button"

export function CurrencySwitch() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <Button
        variant={currency === "HTG" ? "default" : "ghost"}
        size="sm"
        onClick={() => setCurrency("HTG")}
        className="h-8 px-3 text-xs"
      >
        HTG
      </Button>
      <Button
        variant={currency === "USD" ? "default" : "ghost"}
        size="sm"
        onClick={() => setCurrency("USD")}
        className="h-8 px-3 text-xs"
      >
        USD
      </Button>
    </div>
  )
}