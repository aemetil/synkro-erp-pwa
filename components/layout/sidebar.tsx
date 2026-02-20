// components/layout/sidebar.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  DollarSign,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  Package,
  Heart,
} from "lucide-react"

interface SidebarProps {
  sector?: string | null
}

export function Sidebar({ sector }: SidebarProps) {
  const pathname = usePathname()

  // Build navigation based on sector
  const navigation = [
    {
      name: "Tableau de bord",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Finance",
      href: "/finance",
      icon: DollarSign,
    },
    {
      name: "Ventes",
      href: "/sales",
      icon: ShoppingCart,
    },
    // Commerce module - only if sector is COMMERCE or AUTRE
    ...(sector === "COMMERCE" || sector === "AUTRE"
      ? [
          {
            name: "Commerce",
            href: "/commerce",
            icon: Package,
          },
        ]
      : []),
    // Santé module - only if sector is SANTE or AUTRE
    ...(sector === "SANTE" || sector === "AUTRE"
      ? [
          {
            name: "Santé",
            href: "/sante",
            icon: Heart,
          },
        ]
      : []),
    {
      name: "Clients",
      href: "/customers",
      icon: Users,
    },
    {
      name: "Rapports",
      href: "/reports",
      icon: FileText,
    },
    {
      name: "Paramètres",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logos/s_logo.png" alt="S" width={32} height={32} priority />
          <Image src="/logos/synkro_blue_logo.png" alt="Synkro" width={100} height={30} priority />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="text-xs text-gray-500 space-y-2">
          <p className="font-medium">Version 1.2.0</p>
          <p className="text-gray-400">
            Made with ❤️ by{" "}
            <a
              href="https://qonekt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              a.emetil
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
