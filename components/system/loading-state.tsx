import { cn } from "@/lib/utils"

type LoadingStateProps = {
  title?: string
  description?: string
  variant?: "page" | "section" | "card" | "list"
  skeleton?: boolean
  className?: string
}

const variants = {
  page: "min-h-[50vh]",
  section: "min-h-48",
  card: "min-h-32 rounded-lg border border-border bg-card",
  list: "min-h-32",
}

export function LoadingState({
  title = "Chargement de votre espace...",
  description = "Vos données arrivent.",
  variant = "section",
  skeleton = false,
  className,
}: LoadingStateProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center justify-center px-6 py-8 text-center",
        variants[variant],
        className
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      <div className="mt-4 max-w-sm space-y-1">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {skeleton ? (
        <div className="mt-6 w-full max-w-md space-y-3">
          <div className="h-3 rounded-full bg-muted" />
          <div className="h-3 w-5/6 rounded-full bg-muted" />
          <div className="h-3 w-2/3 rounded-full bg-muted" />
        </div>
      ) : null}
    </section>
  )
}

