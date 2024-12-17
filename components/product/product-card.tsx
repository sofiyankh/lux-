"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Eye } from "lucide-react"
import { ProductPreviewModal } from "./product-preview-modal"
import { useWishlist } from "@/contexts/wishlist-context"

export interface ProductCardProps {
  id: string
  title: string
  slug: string
  images: string[]
  price: number
  compareAtPrice?: number
  badges?: string[]
  rating?: { avg: number; count: number }
  className?: string
}

export function ProductCard({
  id,
  title,
  slug,
  images,
  price,
  compareAtPrice,
  badges = [],
  rating,
  className,
}: ProductCardProps) {
  const { state: wishlistState, toggleItem } = useWishlist()
  const isInWishlist = wishlistState.items.some((item) => item.id === id)

  const primaryImage = images[0] || "/diverse-fashion-display.png"
  const secondaryImage = images[1] || primaryImage

  const handleWishlistClick = () => {
    toggleItem({ id, title, slug, images, price, compareAtPrice, badges, rating })
  }

  return (
    <Card
      className={`group overflow-hidden border-0 shadow-none bg-transparent hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-light/50 rounded-lg">
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={title}
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />

        {/* Secondary Image on Hover */}
        <Image
          src={secondaryImage}
          alt={`${title} alternate view`}
          fill
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />

        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {badges.map((badge) => (
              <Badge key={badge} variant="secondary" className="text-xs bg-white/90 text-brand-primary">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="secondary"
            className={`h-8 w-8 bg-white/90 hover:bg-white hover:scale-110 transition-all duration-200 ${
              isInWishlist ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleWishlistClick}
          >
            <Heart className="h-4 w-4 fill-current" />
            <span className="sr-only">{isInWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
          </Button>

          {/* Quick Preview */}
          <ProductPreviewModal {...{ id, title, slug, images, price, compareAtPrice, badges, rating }}>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white/90 hover:bg-white hover:scale-110 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">Quick preview</span>
            </Button>
          </ProductPreviewModal>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-4 space-y-2">
        <Link href={`/products/${slug}`} className="block">
          <h3 className="font-display font-medium text-brand-primary hover:text-brand-accent transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 text-sm text-brand-muted">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(rating.avg) ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
            <span>({rating.count})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-brand-primary">${price.toFixed(2)}</span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-sm text-brand-muted line-through">${compareAtPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Card>
  )
}
