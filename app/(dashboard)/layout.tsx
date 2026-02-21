// app/(dashboard)/layout.tsx
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { CurrencyProvider } from "@/components/currency-provider"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { entreprise: { select: { name: true, sector: true } } },
  })
  if (!user) redirect("/login")

  return (
    <CurrencyProvider>
      <DashboardShell sector={user.entreprise.sector} user={{
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        entrepriseName: user.entreprise.name,
      }}>
        {children}
      </DashboardShell>
    </CurrencyProvider>
  )
}
