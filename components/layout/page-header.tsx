import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PageHeaderAction = {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
}

type PageHeaderProps = {
  title: string
  description?: string
  primaryAction?: PageHeaderAction
  secondaryActions?: PageHeaderAction[]
  eyebrow?: string
  className?: string
}

function HeaderAction({
  action,
  variant = "outline",
}: {
  action: PageHeaderAction
  variant?: "default" | "outline"
}) {
  const content = (
    <>
      {action.icon}
      <span>{action.label}</span>
    </>
  )

  if (action.href) {
    return (
      <Button asChild variant={variant}>
        <Link href={action.href}>{content}</Link>
      </Button>
    )
  }

  return (
    <Button type="button" variant={variant} onClick={action.onClick}>
      {content}
    </Button>
  )
}

export function PageHeader({
  title,
  description,
  primaryAction,
  secondaryActions = [],
  eyebrow,
  className,
}: PageHeaderProps) {
  const visibleSecondaryActions = secondaryActions.slice(0, 2)

  return (
    <header
      className={cn(
        "mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 space-y-2">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {primaryAction || visibleSecondaryActions.length > 0 ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {visibleSecondaryActions.map((action) => (
            <HeaderAction key={action.label} action={action} />
          ))}
          {primaryAction ? (
            <HeaderAction action={primaryAction} variant="default" />
          ) : null}
        </div>
      ) : null}
    </header>
  )
}

