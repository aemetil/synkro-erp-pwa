"use client"

import { useCurrency, CURRENCIES } from "./currency-provider"
import { Label } from "./ui/label"

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="space-y-2">
      <Label htmlFor="currency">Devise</Label>
      <select
        id="currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as typeof currency)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {CURRENCIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-500">
        Toutes les transactions seront affichées dans cette devise
      </p>
    </div>
  )
}
