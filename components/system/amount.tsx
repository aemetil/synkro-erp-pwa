import { cn } from "@/lib/utils"

type Currency = "HTG" | "USD" | "EUR" | "DOP" | "MXN"

type AmountProps = {
  value: number
  currency?: Currency
  tone?: "default" | "positive" | "negative" | "muted"
  size?: "sm" | "md" | "lg" | "xl"
  showSign?: boolean
  className?: string
}

const sizes = {
  sm: "text-sm font-medium",
  md: "text-base font-semibold",
  lg: "text-xl font-semibold tracking-tight",
  xl: "text-3xl font-semibold tracking-tight",
}

const tones = {
  default: "text-foreground",
  positive: "text-success",
  negative: "text-destructive",
  muted: "text-muted-foreground",
}

export function Amount({
  value,
  currency = "HTG",
  tone = "default",
  size = "md",
  showSign = false,
  className,
}: AmountProps) {
  const sign = showSign && value > 0 ? "+" : ""
  const hasDecimals = !Number.isInteger(value)
  const formatted = new Intl.NumberFormat("fr-HT", {
    style: "currency",
    currency,
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(value)

  return (
    <span className={cn(sizes[size], tones[tone], className)}>
      {sign}
      {formatted}
    </span>
  )
}

