// components/layout/sidebar.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, DollarSign, ShoppingCart, Users, Settings, FileText, Package, Heart, X } from "lucide-react"

interface SidebarProps {
  sector?: string | null
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ sector, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  useEffect(() => {
    onClose?.()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const navigation = [
    { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { name: "Finance", href: "/finance", icon: DollarSign },
    { name: "Ventes", href: "/sales", icon: ShoppingCart },
    ...(sector === "COMMERCE" || sector === "AUTRE" ? [{ name: "Commerce", href: "/commerce", icon: Package }] : []),
    ...(sector === "SANTE" || sector === "AUTRE" ? [{ name: "Santé", href: "/sante", icon: Heart }] : []),
    { name: "Clients", href: "/customers", icon: Users },
    { name: "Rapports", href: "/reports", icon: FileText },
    { name: "Paramètres", href: "/settings", icon: Settings },
  ]

  return (
    <div className={cn(
      "flex h-full w-64 flex-shrink-0 flex-col border-r bg-white",
      "fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out",
      "lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 lg:transition-none",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logos/s_logo.png" alt="S" width={32} height={32} priority />
          <Image src="/logos/synkro_blue_logo.png" alt="Synkro" width={100} height={30} priority />
        </Link>
        <button className="lg:hidden p-1 rounded text-gray-400 hover:text-gray-600" onClick={onClose} aria-label="Fermer">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link key={item.name} href={item.href} className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            )}>
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="text-xs text-gray-500 space-y-2">
          <p className="font-medium">Version 1.2.0</p>
          <p className="text-gray-400">Made with ❤️ by{" "}
            <a href="https://qonekt.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">a.emetil</a>
          </p>
        </div>
      </div>
    </div>
  )
}
