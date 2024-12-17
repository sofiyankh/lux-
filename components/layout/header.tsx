"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ShoppingBag, User, Heart, Menu, LogOut, Package, Settings, Shield } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth, useIsAdmin } from "@/contexts/auth-context"

export function Header() {
  const { state, toggleCart } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const isAdmin = useIsAdmin()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-brand-light">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>

          {/* Logo */}
          <Link href="/" className="font-display text-2xl font-bold text-brand-primary">
            Luxe
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/collections"
              className="text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/women"
              className="text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors"
            >
              Women
            </Link>
            <Link
              href="/men"
              className="text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors"
            >
              Men
            </Link>
            <Link
              href="/accessories"
              className="text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors"
            >
              Accessories
            </Link>
            <Link
              href="/sale"
              className="text-sm font-medium text-brand-danger hover:text-brand-danger/80 transition-colors"
            >
              Sale
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="hidden sm:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-muted" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 bg-brand-light/50 border-0 focus-visible:ring-1 focus-visible:ring-brand-accent"
                />
              </div>
            </div>

            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {!isAdmin && (
              <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
                <Link href="/account/wishlist">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>
            )}

            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-brand-primary">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-brand-muted">{user?.email}</p>
                    {isAdmin && <Badge className="mt-1 bg-amber-100 text-amber-800 text-xs">Administrator</Badge>}
                  </div>
                  <DropdownMenuSeparator />

                  {isAdmin ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/products" className="cursor-pointer">
                          <Package className="h-4 w-4 mr-2" />
                          Manage Products
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/orders" className="cursor-pointer">
                          <Package className="h-4 w-4 mr-2" />
                          Manage Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/customers" className="cursor-pointer">
                          <User className="h-4 w-4 mr-2" />
                          Manage Customers
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/" className="cursor-pointer">
                          <Package className="h-4 w-4 mr-2" />
                          View Store
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/account" className="cursor-pointer">
                          <User className="h-4 w-4 mr-2" />
                          Account Overview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/orders" className="cursor-pointer">
                          <Package className="h-4 w-4 mr-2" />
                          Order History
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/settings" className="cursor-pointer">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/auth/login">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Sign in</span>
                </Link>
              </Button>
            )}

            {!isAdmin && (
              <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
                <ShoppingBag className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-brand-accent">
                    {state.itemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
