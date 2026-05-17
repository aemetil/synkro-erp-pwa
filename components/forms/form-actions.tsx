import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FormActionsProps = {
  submitLabel: string
  cancelLabel?: string
  cancelHref?: string
  isSubmitting?: boolean
  disabled?: boolean
  stickyOnMobile?: boolean
  className?: string
}

export function FormActions({
  submitLabel,
  cancelLabel = "Annuler",
  cancelHref,
  isSubmitting = false,
  disabled = false,
  stickyOnMobile = false,
  className,
}: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end",
        stickyOnMobile &&
          "sticky bottom-0 -mx-4 bg-background/95 px-4 pb-4 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:backdrop-blur-none",
        className
      )}
    >
      {cancelHref ? (
        <Button asChild type="button" variant="outline">
          <Link href={cancelHref}>{cancelLabel}</Link>
        </Button>
      ) : null}
      <Button type="submit" disabled={disabled || isSubmitting}>
        {isSubmitting ? "Enregistrement..." : submitLabel}
      </Button>
    </div>
  )
}

