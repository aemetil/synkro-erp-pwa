import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type EmptyStateAction = {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
}

type EmptyStateProps = {
  title: string
  description?: string
  action?: EmptyStateAction
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  const actionContent = action ? (
    <>
      {action.icon}
      <span>{action.label}</span>
    </>
  ) : null

  return (
    <section
      className={cn(
        "flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-10 text-center",
        className
      )}
    >
      {icon ? (
        <div className="mb-4 rounded-full bg-muted p-3 text-muted-foreground">
          {icon}
        </div>
      ) : null}
      <div className="max-w-md space-y-2">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? (
        <div className="mt-5">
          {action.href ? (
            <Button asChild>
              <Link href={action.href}>{actionContent}</Link>
            </Button>
          ) : (
            <Button type="button" onClick={action.onClick}>
              {actionContent}
            </Button>
          )}
        </div>
      ) : null}
    </section>
  )
}

