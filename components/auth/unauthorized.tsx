"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"

interface UnauthorizedProps {
  title?: string
  message?: string
  redirectPath?: string
  redirectLabel?: string
}

export function Unauthorized({
  title = "Access Denied",
  message = "You don't have permission to access this page.",
  redirectPath = "/",
  redirectLabel = "Go Home",
}: UnauthorizedProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-8 w-8 text-red-600" />
        </div>

        <h1 className="font-display text-2xl font-bold text-gray-900 mb-4">{title}</h1>

        <p className="text-gray-600 mb-8">{message}</p>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={redirectPath}>{redirectLabel}</Link>
          </Button>

          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/auth/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
