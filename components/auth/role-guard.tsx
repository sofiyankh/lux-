"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useIsAdmin, useIsClient, type UserRole } from "@/contexts/auth-context"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallbackPath?: string
  showLoading?: boolean
}

export function RoleGuard({ children, allowedRoles, fallbackPath = "/", showLoading = true }: RoleGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const isAdmin = useIsAdmin()
  const isClient = useIsClient()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated - redirect to login
      if (!isAuthenticated) {
        router.push("/auth/login")
        return
      }

      // Authenticated but wrong role - redirect to appropriate dashboard
      if (user && !allowedRoles.includes(user.role)) {
        if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/account")
        }
        return
      }
    }
  }, [isAuthenticated, user, isLoading, allowedRoles, router])

  // Show loading state
  if (isLoading) {
    if (!showLoading) return null

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null
  }

  // Wrong role
  if (user && !allowedRoles.includes(user.role)) {
    return null
  }

  // Authorized - render children
  return <>{children}</>
}

// Convenience components for specific roles
export function AdminGuard({
  children,
  fallbackPath = "/account",
}: { children: React.ReactNode; fallbackPath?: string }) {
  return (
    <RoleGuard allowedRoles={["admin"]} fallbackPath={fallbackPath}>
      {children}
    </RoleGuard>
  )
}

export function ClientGuard({
  children,
  fallbackPath = "/admin",
}: { children: React.ReactNode; fallbackPath?: string }) {
  return (
    <RoleGuard allowedRoles={["client"]} fallbackPath={fallbackPath}>
      {children}
    </RoleGuard>
  )
}
