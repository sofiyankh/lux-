"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import { Package, MapPin, User, Heart, CreditCard, Settings, Sparkles, Award, ShoppingBag } from "lucide-react"

export default function AccountPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) return null

  const recentOrders = [
    {
      id: "ORD-123456",
      date: "2024-01-15",
      status: "Delivered",
      total: 189.0,
      items: 2,
      trackingNumber: "1Z999AA1234567890",
    },
    {
      id: "ORD-123455",
      date: "2024-01-10",
      status: "In Transit",
      total: 275.0,
      items: 1,
      trackingNumber: "1Z999AA1234567891",
      estimatedDelivery: "Jan 18, 2024",
    },
    {
      id: "ORD-123454",
      date: "2024-01-05",
      status: "Processing",
      total: 125.0,
      items: 3,
    },
  ]

  const personalizedRecommendations = [
    {
      id: "1",
      title: "Merino Wool Cardigan",
      price: 165.0,
      image: "/merino-cardigan.png",
      reason: "Based on your recent purchases",
    },
    {
      id: "2",
      title: "Silk Scarf Collection",
      price: 89.0,
      image: "/flowing-silk-scarf.png",
      reason: "Perfect with your style",
    },
  ]

  const loyaltyProgram = {
    currentTier: "Silver",
    points: 1250,
    nextTierPoints: 2000,
    progress: 62.5,
    benefits: ["Free shipping", "Early access to sales", "Birthday rewards"],
  }

  const accountLinks = [
    {
      href: "/account/orders",
      icon: Package,
      title: "Order History",
      description: "View and track your orders",
    },
    {
      href: "/account/addresses",
      icon: MapPin,
      title: "Addresses",
      description: "Manage shipping addresses",
    },
    {
      href: "/account/profile",
      icon: User,
      title: "Profile Settings",
      description: "Update your personal information",
    },
    {
      href: "/account/wishlist",
      icon: Heart,
      title: "Wishlist",
      description: "Your saved items",
    },
    {
      href: "/account/payment",
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage your payment options",
    },
    {
      href: "/account/settings",
      icon: Settings,
      title: "Account Settings",
      description: "Privacy and notification preferences",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-brand-primary mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-brand-muted">Manage your account and discover new favorites</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gradient-to-r from-brand-primary to-brand-accent text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{loyaltyProgram.currentTier} Member</h3>
                    <p className="text-white/80 text-sm">{loyaltyProgram.points} points earned</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  VIP
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress to Gold</span>
                  <span>{loyaltyProgram.nextTierPoints - loyaltyProgram.points} points to go</span>
                </div>
                <Progress value={loyaltyProgram.progress} className="bg-white/20" />
                <div className="flex flex-wrap gap-2 mt-4">
                  {loyaltyProgram.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recent Orders */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold text-brand-primary">Recent Orders</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/account/orders">View All</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-brand-light rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-brand-primary">{order.id}</p>
                      <p className="text-sm text-brand-muted">
                        {order.date} • {order.items} items
                      </p>
                      {order.trackingNumber && (
                        <p className="text-xs text-brand-muted mt-1">Tracking: {order.trackingNumber}</p>
                      )}
                      {order.estimatedDelivery && (
                        <p className="text-xs text-green-600 mt-1">Est. delivery: {order.estimatedDelivery}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-brand-primary">${order.total.toFixed(2)}</p>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "In Transit"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-accent" />
                  <h2 className="font-display text-xl font-semibold text-brand-primary">Just for You</h2>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/collections">See More</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalizedRecommendations.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-brand-light rounded-lg hover:border-brand-accent transition-colors"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-brand-primary text-sm">{item.title}</h3>
                      <p className="text-xs text-brand-muted mb-2">{item.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-brand-primary">${item.price}</span>
                        <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="font-display text-xl font-semibold text-brand-primary mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accountLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 p-4 border border-brand-light rounded-lg hover:border-brand-accent transition-colors"
                  >
                    <link.icon className="h-5 w-5 text-brand-accent" />
                    <div>
                      <p className="font-medium text-brand-primary">{link.title}</p>
                      <p className="text-sm text-brand-muted">{link.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Account Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-brand-accent" />
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-brand-primary">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-brand-muted">{user.email}</p>
                <p className="text-xs text-brand-muted mt-1">Member since Jan 2024</p>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                <Link href="/account/profile">Edit Profile</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Style Profile</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-muted">Preferred Size</span>
                  <Badge variant="outline">M</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-muted">Style Preference</span>
                  <Badge variant="outline">Classic</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-muted">Color Palette</span>
                  <Badge variant="outline">Neutrals</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/account/style-profile">Update Preferences</Link>
              </Button>
            </Card>

            {/* Account Navigation */}
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Account</h3>
              <nav className="space-y-2">
                {accountLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-light/20 transition-colors"
                  >
                    <link.icon className="h-4 w-4 text-brand-muted" />
                    <span className="text-sm text-brand-primary">{link.title}</span>
                  </Link>
                ))}
              </nav>
            </Card>

            {/* Support */}
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Need Help?</h3>
              <p className="text-sm text-brand-muted mb-4">
                Our customer service team is here to help with any questions or concerns.
              </p>
              <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
