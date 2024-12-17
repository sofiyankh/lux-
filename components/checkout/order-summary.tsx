"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export interface OrderSummaryProps {
  shippingCost?: number
  taxRate?: number
  className?: string
}

export function OrderSummary({ shippingCost = 0, taxRate = 0.08, className }: OrderSummaryProps) {
  const { state } = useCart()
  const tax = state.subtotal * taxRate
  const total = state.subtotal + shippingCost + tax

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Order Summary</h3>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {state.items.map((item) => (
          <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
            <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-md bg-brand-light/20">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="64px"
              />
              <div className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {item.quantity}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-brand-primary text-sm truncate">{item.title}</h4>
              <div className="flex gap-2 mt-1">
                {item.selectedColor && <span className="text-xs text-brand-muted">Color: {item.selectedColor}</span>}
                {item.selectedSize && <span className="text-xs text-brand-muted">Size: {item.selectedSize}</span>}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-brand-muted">Qty: {item.quantity}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-brand-primary text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  {item.compareAtPrice && (
                    <span className="text-xs text-brand-muted line-through">
                      ${(item.compareAtPrice * item.quantity).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator className="mb-4" />

      {/* Order Totals */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-brand-muted">Subtotal ({state.itemCount} items)</span>
          <span className="text-brand-primary">${state.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-brand-muted">Shipping</span>
          <span className="text-brand-primary">
            {shippingCost === 0 ? (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                Free
              </Badge>
            ) : (
              `$${shippingCost.toFixed(2)}`
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
          <span className="text-brand-primary text-lg">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Savings */}
      {state.items.some((item) => item.compareAtPrice) && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 font-medium">
            You're saving $
            {state.items
              .reduce((savings, item) => {
                return savings + (item.compareAtPrice ? (item.compareAtPrice - item.price) * item.quantity : 0)
              }, 0)
              .toFixed(2)}{" "}
            on this order!
          </p>
        </div>
      )}
    </Card>
  )
}
