import * as React from "react"

import { cn } from "@/lib/utils"

type PageContainerProps = {
  children: React.ReactNode
  size?: "default" | "wide" | "narrow"
  className?: string
}

const sizes = {
  narrow: "mx-auto w-full max-w-3xl",
  default: "mx-auto w-full max-w-6xl",
  wide: "mx-auto w-full max-w-7xl",
}

export function PageContainer({
  children,
  size = "default",
  className,
}: PageContainerProps) {
  return (
    <div className={cn("px-4 py-5 sm:px-6 lg:px-8", sizes[size], className)}>
      {children}
    </div>
  )
}

