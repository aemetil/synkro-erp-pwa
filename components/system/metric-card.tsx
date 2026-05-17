import * as React from "react"

import { cn } from "@/lib/utils"

type MetricCardProps = {
  label: string
  value: React.ReactNode
  description?: string
  trend?: {
    label: string
    direction?: "up" | "down" | "neutral"
  }
  icon?: React.ReactNode
  tone?: "default" | "positive" | "negative" | "warning"
  className?: string
}

const tones = {
  default: "text-muted-foreground",
  positive: "text-success",
  negative: "text-destructive",
  warning: "text-warning",
}

export function MetricCard({
  label,
  value,
  description,
  trend,
  icon,
  tone = "default",
  className,
}: MetricCardProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
        </div>
        {icon ? (
          <div className={cn("shrink-0 rounded-md bg-muted p-2", tones[tone])}>
            {icon}
          </div>
        ) : null}
      </div>
      {description || trend ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {trend ? (
            <span className={cn("font-medium", tones[tone])}>
              {trend.label}
            </span>
          ) : null}
          {description ? (
            <span className="text-muted-foreground">{description}</span>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

