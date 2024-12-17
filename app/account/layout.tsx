"use client"

import type React from "react"
import { ClientGuard } from "@/components/auth/role-guard"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientGuard>{children}</ClientGuard>
}
