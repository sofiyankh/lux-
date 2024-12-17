"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"

export default function OrderConfirmationPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  useEffect(() => {
    // Track order confirmation event
    console.log("Order confirmed:", orderNumber)
  }, [orderNumber])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="font-display text-3xl font-bold text-brand-primary mb-4">Order Confirmed!</h1>
          <p className="text-lg text-brand-muted mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {/* Order Details */}
          <Card className="p-6 mb-8 text-left">
            <h2 className="font-display text-xl font-semibold text-brand-primary mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-brand-muted">Order Number:</span>
                <span className="font-medium text-brand-primary">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Order Date:</span>
                <span className="font-medium text-brand-primary">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Estimated Delivery:</span>
                <span className="font-medium text-brand-primary">
                  {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>

          {/* What's Next */}
          <Card className="p-6 mb-8 text-left">
            <h2 className="font-display text-xl font-semibold text-brand-primary mb-4">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-brand-accent mt-0.5" />
                <div>
                  <p className="font-medium text-brand-primary">Order Confirmation Email</p>
                  <p className="text-sm text-brand-muted">
                    You'll receive an email confirmation with your order details shortly.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-brand-accent mt-0.5" />
                <div>
                  <p className="font-medium text-brand-primary">Order Processing</p>
                  <p className="text-sm text-brand-muted">
                    Your order will be processed and prepared for shipping within 1-2 business days.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-brand-accent mt-0.5" />
                <div>
                  <p className="font-medium text-brand-primary">Shipping Updates</p>
                  <p className="text-sm text-brand-muted">You'll receive tracking information once your order ships.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-brand-primary hover:bg-brand-primary/90">
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account/orders">View Order Status</Link>
            </Button>
          </div>

          {/* Support */}
          <div className="mt-12 p-6 bg-brand-light/20 rounded-lg">
            <h3 className="font-medium text-brand-primary mb-2">Need Help?</h3>
            <p className="text-sm text-brand-muted mb-4">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
