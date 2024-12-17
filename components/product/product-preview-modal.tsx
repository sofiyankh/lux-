"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VariantSelector } from "@/components/product/variant-selector"
import { QuantityInput } from "@/components/product/quantity-input"
import { Heart, ShoppingBag, Truck, Shield, ZoomIn } from "lucide-react"
import type { ProductCardProps } from "./product-card"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

interface ProductPreviewModalProps extends ProductCardProps {
  children: React.ReactNode
}

export function ProductPreviewModal({ children, ...product }: ProductPreviewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const { addItem } = useCart()
  const { state: wishlistState, toggleItem } = useWishlist()
  const isInWishlist = wishlistState.items.some((item) => item.id === product.id)

  const variantOptions = []

  if (product.variants?.colors?.length) {
    variantOptions.push({
      name: "Color",
      values: product.variants.colors.map((color) => ({
        value: color.id,
        label: color.name,
        available: color.available,
        color: color.value,
      })),
    })
  }

  if (product.variants?.sizes?.length) {
    variantOptions.push({
      name: "Size",
      values: product.variants.sizes.map((size) => ({
        value: size.id,
        label: size.name,
        available: size.available,
      })),
    })
  }

  const handleVariantSelect = (optionName: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [optionName]: value }))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const isAddToCartDisabled = variantOptions.some(
    (option) => option.values.some((v) => v.available) && !selectedVariants[option.name]
  )

  const handleAddToCartClick = () => {
    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      image: product.images[0] || "",
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity,
      selectedColor: selectedVariants?.Color,
      selectedSize: selectedVariants?.Size,
    })
    alert(`Added ${quantity} item(s) of ${product.title} to cart`)
  }

  const handleWishlistClick = () => {
    toggleItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      images: product.images,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      badges: product.badges,
      rating: product.rating,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>{product.title}</DialogTitle>
        </VisuallyHidden>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div
              className="relative aspect-square overflow-hidden rounded-lg bg-brand-light/50 cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                fill
                className={`object-cover transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
                style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : {}}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded-full p-2">
                  <ZoomIn className="h-4 w-4 text-brand-primary" />
                </div>
              </div>

              {product.badges?.length > 0 && (
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs bg-white/90 text-brand-primary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square w-16 h-16 rounded-md overflow-hidden border-2 transition-colors flex-shrink-0 ${
                      selectedImage === index
                        ? "border-brand-primary"
                        : "border-transparent hover:border-brand-primary/50"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-brand-primary mb-2">{product.title}</h2>

            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(product.rating.avg) ? "text-yellow-400" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-brand-muted">({product.rating.count} reviews)</span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-bold text-brand-primary">${product.price.toFixed(2)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-lg text-brand-muted line-through">${product.compareAtPrice.toFixed(2)}</span>
              )}
            </div>

            {variantOptions.length > 0 && (
              <VariantSelector options={variantOptions} selected={selectedVariants} onSelect={handleVariantSelect} />
            )}

            <div className="space-y-3">
              <label className="text-sm font-medium text-brand-primary">Quantity</label>
              <QuantityInput value={quantity} onChange={setQuantity} min={1} max={10} />
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-brand-primary hover:bg-brand-primary/90 font-semibold"
                disabled={isAddToCartDisabled}
                onClick={handleAddToCartClick}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                className={`w-full bg-transparent ${isInWishlist ? "text-red-500" : "text-gray-500"}`}
                onClick={handleWishlistClick}
              >
                <Heart className="mr-2 h-4 w-4 fill-current" />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            <div className="border-t pt-6 space-y-2 text-sm text-brand-muted">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders over $200</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure payment & easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
