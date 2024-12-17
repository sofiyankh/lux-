"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  Settings,
  Sparkles,
  FileText,
  TrendingUp,
  MessageSquare,
  X,
  Menu,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Products", href: "/admin/products", icon: Package, badge: "124" },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "12" },
  { name: "Customers", href: "/admin/customers", icon: Users, badge: "1.2k" },
  { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { name: "Personal Shopper", href: "/admin/personal-shopper", icon: Sparkles, badge: "3" },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquare, badge: "8" },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar */}
      <div className={cn("lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-white/20"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </>
  )

  function SidebarContent() {
    return (
      <>
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">Fashion Store</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? "bg-amber-50 text-amber-700 border-r-2 border-amber-600"
                          : "text-gray-700 hover:text-amber-700 hover:bg-amber-50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors",
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href ? "text-amber-600" : "text-gray-400 group-hover:text-amber-600",
                          "h-5 w-5 shrink-0",
                        )}
                      />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            pathname === item.href
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-600 group-hover:bg-amber-100 group-hover:text-amber-700",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </>
    )
  }
}
