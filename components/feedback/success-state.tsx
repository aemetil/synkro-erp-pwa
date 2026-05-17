import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SuccessStateProps = {
  title: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  className?: string
}

export function SuccessState({
  title,
  description,
  action,
  className,
}: SuccessStateProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-success/20 bg-success-soft px-6 py-8 text-center",
        className
      )}
    >
      <div className="mx-auto max-w-md space-y-2">
        <h2 className="text-lg font-semibold text-success">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? (
        <div className="mt-5">
          {action.href ? (
            <Button asChild>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : (
            <Button type="button" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      ) : null}
    </section>
  )
}

