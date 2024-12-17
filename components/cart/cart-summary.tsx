"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Truck } from "lucide-react"

interface CartSummaryProps {
  subtotal: number
  itemCount: number
  onCheckout: () => void
  onContinueShopping: () => void
  className?: string
}

export function CartSummary({ subtotal, itemCount, onCheckout, onContinueShopping, className }: CartSummaryProps) {
  const shipping = subtotal >= 150 ? 0 : 15
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax
  const freeShippingThreshold = 150
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Free Shipping Progress */}
      {remainingForFreeShipping > 0 && (
        <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-4 w-4 text-brand-accent" />
            <span className="text-sm font-medium text-brand-accent">
              Add ${remainingForFreeShipping.toFixed(2)} more for free shipping!
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-brand-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {shipping === 0 && subtotal > 0 && (
        <div className="flex items-center gap-2 text-green-600">
          <Truck className="h-4 w-4" />
          <span className="text-sm font-medium">Free shipping applied!</span>
        </div>
      )}

      {/* Order Summary */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-brand-muted">Subtotal ({itemCount} items)</span>
          <span className="text-brand-primary">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-brand-muted">Shipping</span>
          <span className="text-brand-primary">
            {shipping === 0 ? (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                Free
              </Badge>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-brand-muted">Tax</span>
          <span className="text-brand-primary">${tax.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold">
          <span className="text-brand-primary">Total</span>
          <span className="text-brand-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button
          onClick={onCheckout}
          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
          size="lg"
          disabled={itemCount === 0}
        >
          Proceed to Checkout
        </Button>

        <Button
          variant="outline"
          onClick={onContinueShopping}
          className="w-full border-brand-light hover:border-brand-accent bg-transparent"
        >
          Continue Shopping
        </Button>
      </div>

      {/* Security Badge */}
      <div className="text-center pt-4">
        <p className="text-xs text-brand-muted">🔒 Secure checkout with SSL encryption</p>
      </div>
    </div>
  )
}
