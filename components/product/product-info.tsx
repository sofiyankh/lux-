"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { VariantSelector } from "@/components/product/variant-selector"
import { QuantityInput } from "@/components/product/quantity-input"
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export interface ProductVariant {
  id: string
  name: string
  value: string
  available: boolean
}

export interface ProductInfoProps {
  id: string
  title: string
  slug: string
  images: string[]
  price: number
  compareAtPrice?: number
  description: string
  badges?: string[]
  rating?: {
    avg: number
    count: number
  }
  variants?: {
    colors?: ProductVariant[]
    sizes?: ProductVariant[]
  }
  inStock: boolean
  className?: string
}

export function ProductInfo({
  id,
  title,
  slug,
  images,
  price,
  compareAtPrice,
  description,
  badges = [],
  rating,
  variants,
  inStock,
  className,
}: ProductInfoProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem, openCart } = useCart()

  const variantOptions = variants
    ? [
        ...(variants.colors
          ? [
              {
                name: "Color",
                values: variants.colors.map((color) => ({
                  value: color.id,
                  label: color.name,
                  available: color.available,
                  color: color.value,
                })),
              },
            ]
          : []),
        ...(variants.sizes
          ? [
              {
                name: "Size",
                values: variants.sizes.map((size) => ({
                  value: size.id,
                  label: size.name,
                  available: size.available,
                })),
              },
            ]
          : []),
      ]
    : []

  const handleVariantSelect = (optionName: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [optionName]: value,
    }))
  }

  const handleClearVariants = () => {
    setSelectedVariants({})
  }

  const handleAddToCart = () => {
    addItem({
      id: `${id}-${selectedVariants.Color || ""}-${selectedVariants.Size || ""}`,
      title,
      slug,
      image: images[0],
      price,
      compareAtPrice,
      selectedColor: selectedVariants.Color || undefined,
      selectedSize: selectedVariants.Size || undefined,
      quantity,
      maxQuantity: 10,
    })

    openCart()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge
              key={badge}
              variant={badge === "Sale" ? "destructive" : "secondary"}
              className={
                badge === "New Arrival"
                  ? "bg-brand-accent text-white"
                  : badge === "Editor's Choice"
                    ? "bg-brand-primary text-white"
                    : ""
              }
            >
              {badge}
            </Badge>
          ))}
        </div>
      )}

      {/* Title */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-primary mb-2">{title}</h1>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating.avg) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-brand-muted">
              {rating.avg} ({rating.count} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="font-display text-2xl font-bold text-brand-primary">${price.toFixed(2)}</span>
        {compareAtPrice && <span className="text-lg text-brand-muted line-through">${compareAtPrice.toFixed(2)}</span>}
        {compareAtPrice && (
          <Badge variant="destructive" className="text-xs">
            Save ${(compareAtPrice - price).toFixed(2)}
          </Badge>
        )}
      </div>

      <Separator />

      {/* Description */}
      <div>
        <p className="text-brand-muted leading-relaxed">{description}</p>
      </div>

      {/* Variants */}
      {variantOptions.length > 0 && (
        <div className="space-y-4">
          <VariantSelector
            options={variantOptions}
            selected={selectedVariants}
            onSelect={handleVariantSelect}
            onClearAll={handleClearVariants}
          />
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-primary mb-2">Quantity</label>
          <QuantityInput value={quantity} onChange={setQuantity} max={10} />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium py-3"
            size="lg"
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-3 ${isWishlisted ? "text-red-500 border-red-200" : ""}`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            <span className="sr-only">Add to wishlist</span>
          </Button>

          <Button variant="outline" size="lg" onClick={handleShare} className="p-3 bg-transparent">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share product</span>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Features */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-brand-muted">
          <Truck className="h-4 w-4" />
          <span>Free shipping on orders over $150</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-brand-muted">
          <RotateCcw className="h-4 w-4" />
          <span>30-day returns & exchanges</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-brand-muted">
          <Shield className="h-4 w-4" />
          <span>2-year warranty included</span>
        </div>
      </div>
    </div>
  )
}
