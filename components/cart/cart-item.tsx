"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QuantityInput } from "@/components/product/quantity-input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { CartItem as CartItemType } from "@/contexts/cart-context"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  className?: string
}

export function CartItem({ item, onUpdateQuantity, onRemove, className }: CartItemProps) {
  const savings = item.compareAtPrice ? item.compareAtPrice - item.price : 0

  return (
    <div className={`flex gap-4 py-4 ${className}`}>
      {/* Product Image */}
      <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-md bg-brand-light/20">
        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" sizes="80px" />
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="font-medium text-brand-primary hover:text-brand-accent transition-colors"
            >
              {item.title}
            </Link>

            {/* Variants */}
            <div className="flex gap-2 mt-1">
              {item.selectedColor && <span className="text-xs text-brand-muted">Color: {item.selectedColor}</span>}
              {item.selectedSize && <span className="text-xs text-brand-muted">Size: {item.selectedSize}</span>}
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="h-8 w-8 p-0 text-brand-muted hover:text-red-500"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-brand-primary">${item.price.toFixed(2)}</span>
            {item.compareAtPrice && (
              <span className="text-sm text-brand-muted line-through">${item.compareAtPrice.toFixed(2)}</span>
            )}
            {savings > 0 && (
              <Badge variant="destructive" className="text-xs">
                Save ${savings.toFixed(2)}
              </Badge>
            )}
          </div>

          <QuantityInput
            value={item.quantity}
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
            max={item.maxQuantity || 10}
            size="sm"
          />
        </div>

        {/* Item Total */}
        <div className="text-right">
          <span className="font-medium text-brand-primary">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
