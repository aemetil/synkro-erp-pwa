Parfait. **Sprint 2 — System components foundation**.

Objectif : créer les composants v2 sans encore migrer toutes les pages. Faible risque pour un produit actif : on ajoute une nouvelle couche UI, sans casser les flows existants.

Branche recommandée :

```bash
git checkout -b v2/system-components
```

Crée d’abord les dossiers :

```bash
mkdir -p components/system components/forms components/feedback components/layout
```

---

# 1. `components/layout/page-container.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  size?: "narrow" | "default" | "wide";
  className?: string;
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function PageContainer({
  children,
  size = "default",
  className,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full px-4 py-5 sm:px-6 lg:px-8",
        sizes[size],
        className,
      )}
    >
      {children}
    </main>
  );
}
```

---

# 2. `components/layout/page-header.tsx`

```tsx
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PageAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  primaryAction?: PageAction;
  secondaryActions?: PageAction[];
  className?: string;
};

function ActionButton({
  action,
  variant = "default",
}: {
  action: PageAction;
  variant?: "default" | "outline" | "secondary" | "ghost";
}) {
  const content = (
    <>
      {action.icon}
      <span>{action.label}</span>
    </>
  );

  if (action.href) {
    return (
      <Button asChild variant={variant} disabled={action.disabled}>
        <Link href={action.href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      onClick={action.onClick}
      disabled={action.disabled}
    >
      {content}
    </Button>
  );
}

export function PageHeader({
  title,
  description,
  eyebrow,
  primaryAction,
  secondaryActions = [],
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {(primaryAction || secondaryActions.length > 0) && (
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
          {secondaryActions.map((action) => (
            <ActionButton
              key={action.label}
              action={action}
              variant="outline"
            />
          ))}

          {primaryAction ? <ActionButton action={primaryAction} /> : null}
        </div>
      )}
    </div>
  );
}
```

---

# 3. `components/system/amount.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type SupportedCurrency = "HTG" | "USD" | "EUR" | "DOP" | "MXN";

type AmountProps = {
  value: number | null | undefined;
  currency?: SupportedCurrency;
  tone?: "default" | "positive" | "negative" | "muted";
  size?: "sm" | "md" | "lg" | "xl";
  showSign?: boolean;
  className?: string;
};

const currencyLabels: Record<SupportedCurrency, string> = {
  HTG: "G",
  USD: "US$",
  EUR: "€",
  DOP: "RD$",
  MXN: "MX$",
};

const sizeClasses = {
  sm: "text-sm font-medium",
  md: "text-base font-semibold",
  lg: "text-xl font-semibold tracking-tight",
  xl: "text-3xl font-semibold tracking-tight",
};

const toneClasses = {
  default: "text-foreground",
  positive: "text-success",
  negative: "text-destructive",
  muted: "text-muted-foreground",
};

function formatNumber(value: number) {
  const hasDecimals = !Number.isInteger(value);

  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(value);
}

export function Amount({
  value,
  currency = "HTG",
  tone = "default",
  size = "md",
  showSign = false,
  className,
}: AmountProps) {
  const safeValue =
    typeof value === "number" && !Number.isNaN(value) ? value : 0;
  const sign = showSign && safeValue > 0 ? "+" : "";

  return (
    <span className={cn(sizeClasses[size], toneClasses[tone], className)}>
      {sign}
      {formatNumber(safeValue)} {currencyLabels[currency]}
    </span>
  );
}
```

---

# 4. `components/system/status-badge.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: string;
  type?: "payment" | "stock" | "appointment" | "subscription" | "generic";
  size?: "sm" | "md";
  className?: string;
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

const baseClass =
  "inline-flex items-center rounded-full border font-medium leading-none";

const paymentMap: Record<string, { label: string; className: string }> = {
  PAID: {
    label: "Payé",
    className: "border-success/20 bg-success/10 text-success",
  },
  PARTIAL: {
    label: "Partiel",
    className: "border-warning/20 bg-warning/10 text-warning",
  },
  UNPAID: {
    label: "Impayé",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
  OVERDUE: {
    label: "En retard",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
  CANCELLED: {
    label: "Annulé",
    className: "border-border bg-muted text-muted-foreground",
  },
};

const stockMap: Record<string, { label: string; className: string }> = {
  IN_STOCK: {
    label: "Stock OK",
    className: "border-border bg-muted text-muted-foreground",
  },
  LOW_STOCK: {
    label: "Stock bas",
    className: "border-warning/20 bg-warning/10 text-warning",
  },
  OUT_OF_STOCK: {
    label: "Rupture",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

const appointmentMap: Record<string, { label: string; className: string }> = {
  SCHEDULED: {
    label: "Planifié",
    className: "border-border bg-muted text-muted-foreground",
  },
  CONFIRMED: {
    label: "Confirmé",
    className: "border-primary/20 bg-primary/10 text-primary",
  },
  IN_PROGRESS: {
    label: "En cours",
    className: "border-warning/20 bg-warning/10 text-warning",
  },
  COMPLETED: {
    label: "Terminé",
    className: "border-success/20 bg-success/10 text-success",
  },
  CANCELLED: {
    label: "Annulé",
    className: "border-border bg-muted text-muted-foreground",
  },
  NO_SHOW: {
    label: "Absent",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

function getStatusConfig(status: string, type: StatusBadgeProps["type"]) {
  if (type === "payment") return paymentMap[status];
  if (type === "stock") return stockMap[status];
  if (type === "appointment") return appointmentMap[status];

  return {
    label: status,
    className: "border-border bg-muted text-muted-foreground",
  };
}

export function StatusBadge({
  status,
  type = "generic",
  size = "sm",
  className,
}: StatusBadgeProps) {
  const config = getStatusConfig(status, type);

  return (
    <span
      className={cn(baseClass, sizeClasses[size], config?.className, className)}
    >
      {config?.label ?? status}
    </span>
  );
}
```

---

# 5. `components/system/metric-card.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: React.ReactNode;
  description?: string;
  trend?: {
    label: string;
    direction?: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  tone?: "default" | "positive" | "negative" | "warning";
  className?: string;
};

const trendClasses = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
};

export function MetricCard({
  label,
  value,
  description,
  trend,
  icon,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-4 shadow-sm",
        "transition-colors",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </div>
        </div>

        {icon ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            {icon}
          </div>
        ) : null}
      </div>

      {(description || trend) && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {description ? (
            <p className="text-muted-foreground">{description}</p>
          ) : null}

          {trend ? (
            <p
              className={cn(
                "font-medium",
                trendClasses[trend.direction ?? "neutral"],
              )}
            >
              {trend.label}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
```

---

# 6. `components/system/empty-state.tsx`

```tsx
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  icon?: React.ReactNode;
  className?: string;
};

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
  ) : null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-10 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      ) : null}

      <h3 className="text-base font-semibold text-foreground">{title}</h3>

      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}

      {action ? (
        <div className="mt-5">
          {action.href ? (
            <Button asChild>
              <Link href={action.href}>{actionContent}</Link>
            </Button>
          ) : (
            <Button onClick={action.onClick}>{actionContent}</Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
```

---

# 7. `components/system/loading-state.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  title?: string;
  description?: string;
  variant?: "page" | "section" | "card" | "list";
  skeleton?: boolean;
  className?: string;
};

function SkeletonLines({ variant }: { variant: LoadingStateProps["variant"] }) {
  if (variant === "list") {
    return (
      <div className="mt-5 space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-14 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return <div className="mt-5 h-28 animate-pulse rounded-xl bg-muted" />;
  }

  return (
    <div className="mt-5 space-y-3">
      <div className="h-4 w-48 animate-pulse rounded bg-muted" />
      <div className="h-4 w-72 max-w-full animate-pulse rounded bg-muted" />
      <div className="h-4 w-56 animate-pulse rounded bg-muted" />
    </div>
  );
}

export function LoadingState({
  title = "Chargement…",
  description,
  variant = "section",
  skeleton = false,
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6",
        variant === "page" && "min-h-[320px]",
        className,
      )}
    >
      <div className="flex min-h-[120px] flex-col justify-center">
        <p className="text-base font-medium text-foreground">{title}</p>

        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}

        {skeleton ? <SkeletonLines variant={variant} /> : null}
      </div>
    </div>
  );
}
```

---

# 8. `components/forms/form-section.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <section className={cn("rounded-xl border bg-card p-4 sm:p-6", className)}>
      <div className="mb-5">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className="space-y-4">{children}</div>
    </section>
  );
}
```

---

# 9. `components/forms/form-actions.tsx`

```tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type FormActionsProps = {
  submitLabel: string;
  cancelLabel?: string;
  cancelHref?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  stickyOnMobile?: boolean;
  className?: string;
};

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
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        stickyOnMobile &&
          "sticky bottom-0 z-20 -mx-4 border-t bg-background/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none",
        className,
      )}
    >
      {cancelHref ? (
        <Button type="button" variant="outline" asChild disabled={isSubmitting}>
          <Link href={cancelHref}>{cancelLabel}</Link>
        </Button>
      ) : null}

      <Button type="submit" disabled={disabled || isSubmitting}>
        {isSubmitting ? "Enregistrement…" : submitLabel}
      </Button>
    </div>
  );
}
```

---

# 10. `components/forms/field-error.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type FieldErrorProps = {
  message?: string | null;
  className?: string;
};

export function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p className={cn("mt-1 text-sm text-destructive", className)}>{message}</p>
  );
}
```

---

# 11. `components/feedback/error-state.tsx`

```tsx
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
};

export function ErrorState({
  title = "Impossible de charger cette page",
  description = "Vous pouvez réessayer dans quelques instants.",
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card px-6 py-10 text-center",
        className,
      )}
    >
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {action ? (
        <div className="mt-5">
          {action.href ? (
            <Button asChild>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
```

---

# 12. `components/feedback/success-state.tsx`

```tsx
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SuccessStateProps = {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
};

function RenderAction({
  action,
  variant = "default",
}: {
  action: NonNullable<SuccessStateProps["primaryAction"]>;
  variant?: "default" | "outline";
}) {
  if (action.href) {
    return (
      <Button asChild variant={variant}>
        <Link href={action.href}>{action.label}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} onClick={action.onClick}>
      {action.label}
    </Button>
  );
}

export function SuccessState({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: SuccessStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card px-6 py-10 text-center",
        className,
      )}
    >
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>

      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}

      {(primaryAction || secondaryAction) && (
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          {secondaryAction ? (
            <RenderAction action={secondaryAction} variant="outline" />
          ) : null}

          {primaryAction ? <RenderAction action={primaryAction} /> : null}
        </div>
      )}
    </div>
  );
}
```

---

# 13. `components/feedback/confirm-dialog.tsx`

Ce composant utilise le `window.confirm` natif pour rester **sans risque** au Sprint 2. Plus tard, on pourra le remplacer par un vrai `AlertDialog` shadcn.

```tsx
"use client";

import * as React from "react";

type ConfirmDialogProps = {
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void | Promise<void>;
  children: React.ReactElement<{
    onClick?: React.MouseEventHandler;
  }>;
};

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirmer",
  onConfirm,
  children,
}: ConfirmDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleClick(event: React.MouseEvent) {
    event.preventDefault();

    const message = description ? `${title}\n\n${description}` : title;
    const confirmed = window.confirm(message);

    if (!confirmed) return;

    try {
      setIsLoading(true);
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  }

  return React.cloneElement(children, {
    onClick: handleClick,
    disabled: isLoading || children.props.disabled,
    children: isLoading ? confirmLabel + "…" : children.props.children,
  } as Partial<typeof children.props>);
}
```

---

# 14. Optionnel mais recommandé : fichier d’export

Crée :

```txt
components/system/index.ts
```

```ts
export { Amount } from "./amount";
export { EmptyState } from "./empty-state";
export { LoadingState } from "./loading-state";
export { MetricCard } from "./metric-card";
export { StatusBadge } from "./status-badge";
```

Et :

```txt
components/forms/index.ts
```

```ts
export { FieldError } from "./field-error";
export { FormActions } from "./form-actions";
export { FormSection } from "./form-section";
```

Et :

```txt
components/feedback/index.ts
```

```ts
export { ConfirmDialog } from "./confirm-dialog";
export { ErrorState } from "./error-state";
export { SuccessState } from "./success-state";
```

---

# 15. Vérification

Lance :

```bash
npm run lint
npm run build
```

Si TypeScript se plaint de `ConfirmDialog`, garde le composant de côté et ne l’importe pas encore dans les pages. C’est normal qu’un composant générique avec `cloneElement` soit parfois plus sensible selon la config TS.

---

# 16. Commit recommandé

```bash
git add components/layout components/system components/forms components/feedback
git commit -m "feat: add Synkro v2 system components"
```

Sprint 2 ne doit pas encore modifier les pages critiques. Une fois que ça build, on passe au Sprint 3 : **erreurs humaines, loading states et feedback**, toujours sans casser les clients actifs.
