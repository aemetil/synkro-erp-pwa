import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ErrorStateProps = {
  title?: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  className?: string
}

export function ErrorState({
  title = "Impossible de charger cette page",
  description = "Vérifiez votre connexion puis réessayez.",
  action,
  className,
}: ErrorStateProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-destructive/20 bg-destructive-soft px-6 py-8 text-center",
        className
      )}
    >
      <div className="mx-auto max-w-md space-y-2">
        <h2 className="text-lg font-semibold text-destructive">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? (
        <div className="mt-5">
          {action.href ? (
            <Button asChild variant="outline">
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      ) : null}
    </section>
  )
}

