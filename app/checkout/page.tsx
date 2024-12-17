"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutProgress } from "@/components/checkout/checkout-progress"
import { ShippingForm, type ShippingAddress } from "@/components/checkout/shipping-form"
import { PaymentForm, type PaymentData } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"

const checkoutSteps = [
  { id: "shipping", title: "Shipping", description: "Address & method" },
  { id: "payment", title: "Payment", description: "Billing & payment" },
  { id: "review", title: "Review", description: "Confirm order" },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [shippingData, setShippingData] = useState<{
    address: ShippingAddress
    method: string
    saveAddress: boolean
  } | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const { state, clearCart } = useCart()
  const router = useRouter()

  // Redirect if cart is empty
  if (state.items.length === 0) {
    router.push("/")
    return null
  }

  const getShippingCost = () => {
    if (!shippingData) return 0
    switch (shippingData.method) {
      case "express":
        return 15
      case "overnight":
        return 35
      default:
        return state.subtotal >= 150 ? 0 : 15
    }
  }

  const handleShippingSubmit = (data: { address: ShippingAddress; method: string; saveAddress: boolean }) => {
    setShippingData(data)
    setCurrentStep(1)
  }

  const handlePaymentSubmit = (data: PaymentData) => {
    setPaymentData(data)
    setCurrentStep(2)
  }

  const handleOrderSubmit = async () => {
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to confirmation
    clearCart()
    router.push("/checkout/confirmation")
  }

  const shippingCost = getShippingCost()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <CheckoutProgress steps={checkoutSteps} currentStep={currentStep} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 0 && (
              <div>
                <h1 className="font-display text-2xl font-bold text-brand-primary mb-6">Shipping Information</h1>
                <ShippingForm onSubmit={handleShippingSubmit} onBack={() => router.push("/")} />
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <h1 className="font-display text-2xl font-bold text-brand-primary mb-6">Payment Information</h1>
                <PaymentForm onSubmit={handlePaymentSubmit} onBack={() => setCurrentStep(0)} />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h1 className="font-display text-2xl font-bold text-brand-primary mb-6">Review Your Order</h1>

                <div className="space-y-6">
                  {/* Shipping Details */}
                  {shippingData && (
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display text-lg font-semibold text-brand-primary">Shipping Address</h3>
                        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(0)}>
                          Edit
                        </Button>
                      </div>
                      <div className="text-sm text-brand-muted">
                        <p>
                          {shippingData.address.firstName} {shippingData.address.lastName}
                        </p>
                        <p>{shippingData.address.address}</p>
                        {shippingData.address.apartment && <p>{shippingData.address.apartment}</p>}
                        <p>
                          {shippingData.address.city}, {shippingData.address.state} {shippingData.address.zipCode}
                        </p>
                        <p className="mt-2 font-medium">
                          Shipping:{" "}
                          {shippingData.method === "standard"
                            ? "Standard"
                            : shippingData.method === "express"
                              ? "Express"
                              : "Overnight"}
                        </p>
                      </div>
                    </Card>
                  )}

                  {/* Payment Details */}
                  {paymentData && (
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display text-lg font-semibold text-brand-primary">Payment Method</h3>
                        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                          Edit
                        </Button>
                      </div>
                      <div className="text-sm text-brand-muted">
                        {paymentData.method === "card" && paymentData.cardNumber && (
                          <p>**** **** **** {paymentData.cardNumber.slice(-4)}</p>
                        )}
                        {paymentData.method === "paypal" && <p>PayPal</p>}
                        {paymentData.method === "apple-pay" && <p>Apple Pay</p>}
                      </div>
                    </Card>
                  )}

                  {/* Place Order */}
                  <Card className="p-6">
                    <Button
                      onClick={handleOrderSubmit}
                      disabled={isProcessing}
                      className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-medium py-3"
                      size="lg"
                    >
                      {isProcessing ? "Processing Order..." : "Place Order"}
                    </Button>
                    <p className="text-xs text-brand-muted text-center mt-3">
                      By placing your order, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary shippingCost={shippingCost} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
