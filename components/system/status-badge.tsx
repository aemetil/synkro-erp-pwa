import { cn } from "@/lib/utils"

type StatusBadgeProps = {
  status: string
  type?: "payment" | "stock" | "appointment" | "subscription" | "generic"
  size?: "sm" | "md"
  className?: string
}

type StatusConfig = {
  label: string
  className: string
}

const statusClasses = {
  neutral: "border-border bg-muted text-muted-foreground",
  success: "border-success/20 bg-success-soft text-success",
  warning: "border-warning/20 bg-warning-soft text-warning",
  destructive: "border-destructive/20 bg-destructive-soft text-destructive",
  primary: "border-primary/20 bg-primary/10 text-primary",
}

const statusMaps: Record<string, Record<string, StatusConfig>> = {
  payment: {
    PAID: { label: "Payé", className: statusClasses.success },
    PARTIAL: { label: "Partiel", className: statusClasses.warning },
    UNPAID: { label: "Impayé", className: statusClasses.destructive },
    OVERDUE: { label: "En retard", className: statusClasses.destructive },
    CANCELLED: { label: "Annulé", className: statusClasses.neutral },
  },
  stock: {
    IN_STOCK: { label: "En stock", className: statusClasses.success },
    LOW_STOCK: { label: "Stock bas", className: statusClasses.warning },
    OUT_OF_STOCK: { label: "Rupture", className: statusClasses.destructive },
  },
  appointment: {
    SCHEDULED: { label: "Planifié", className: statusClasses.primary },
    CONFIRMED: { label: "Confirmé", className: statusClasses.success },
    IN_PROGRESS: { label: "En cours", className: statusClasses.warning },
    COMPLETED: { label: "Terminé", className: statusClasses.success },
    CANCELLED: { label: "Annulé", className: statusClasses.neutral },
    NO_SHOW: { label: "Absent", className: statusClasses.destructive },
  },
  subscription: {
    FREE: { label: "Gratuit", className: statusClasses.neutral },
    TRIAL: { label: "Essai", className: statusClasses.primary },
    ACTIVE: { label: "Actif", className: statusClasses.success },
    PAST_DUE: { label: "Paiement en retard", className: statusClasses.warning },
    EXPIRED: { label: "Expiré", className: statusClasses.destructive },
  },
  generic: {},
}

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
}

function humanizeStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function StatusBadge({
  status,
  type = "generic",
  size = "md",
  className,
}: StatusBadgeProps) {
  const config = statusMaps[type]?.[status] ?? {
    label: humanizeStatus(status),
    className: statusClasses.neutral,
  }

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border font-medium leading-none",
        sizes[size],
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}

