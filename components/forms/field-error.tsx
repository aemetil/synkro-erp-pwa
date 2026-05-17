import { cn } from "@/lib/utils"

type FieldErrorProps = {
  message?: string
  className?: string
}

export function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null

  return (
    <p className={cn("text-sm font-medium text-destructive", className)}>
      {message}
    </p>
  )
}

