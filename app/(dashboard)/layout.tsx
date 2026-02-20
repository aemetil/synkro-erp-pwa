// app/(dashboard)/layout.tsx
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { db } from "@/lib/db"
import { CurrencyProvider } from "@/components/currency-provider"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  // Fetch user with entreprise data
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      entreprise: {
        select: {
          name: true,
          sector: true,
        },
      },
    },
  })

  if (!user) {
    redirect("/login")
  }

  const userWithEntreprise = {
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    entrepriseName: user.entreprise.name,
  }

  return (
    <CurrencyProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sector={user.entreprise.sector} />

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <Header user={userWithEntreprise} />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {children}
          </main>
        </div>
      </div>
    </CurrencyProvider>
  )
}
