"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Shield, ArrowRight, Loader2 } from "lucide-react"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function DemoLogin() {
  const [isLoading, setIsLoading] = useState<UserRole | null>(null)
  const { loginAsDemo } = useAuth()
  const router = useRouter()

  const handleDemoLogin = async (role: UserRole) => {
    setIsLoading(role)
    try {
      await loginAsDemo(role)
      // Redirect based on role
      if (role === "admin") {
        router.push("/admin")
      } else {
        router.push("/account")
      }
    } catch (error) {
      console.error("Demo login failed:", error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">Try Demo Accounts</h3>
        <p className="text-sm text-gray-600 mt-1">Experience the platform with pre-configured demo accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Client Demo */}
        <Card className="relative overflow-hidden border-2 hover:border-brand-600 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-50 rounded-lg">
                  <User className="h-4 w-4 text-brand-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Client Account</CardTitle>
                  <CardDescription className="text-xs">Customer Experience</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                Demo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">Sarah Johnson</p>
                <p>client@demo.com</p>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Browse and purchase products</li>
                <li>• Manage orders and wishlist</li>
                <li>• Update profile and addresses</li>
              </ul>
              <Button
                onClick={() => handleDemoLogin("client")}
                disabled={isLoading !== null}
                className="w-full"
                size="sm"
              >
                {isLoading === "client" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Login as Client
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admin Demo */}
        <Card className="relative overflow-hidden border-2 hover:border-amber-500 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Shield className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Admin Account</CardTitle>
                  <CardDescription className="text-xs">Management Dashboard</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                Demo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">Michael Chen</p>
                <p>admin@demo.com</p>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Manage products and inventory</li>
                <li>• View orders and customers</li>
                <li>• Access analytics dashboard</li>
              </ul>
              <Button
                onClick={() => handleDemoLogin("admin")}
                disabled={isLoading !== null}
                className="w-full bg-amber-600 hover:bg-amber-700"
                size="sm"
              >
                {isLoading === "admin" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Login as Admin
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">Demo accounts are pre-populated with sample data for testing purposes</p>
      </div>
    </div>
  )
}
