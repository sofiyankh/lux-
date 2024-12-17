"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"

export default function WishlistPage() {
  const { state: wishlistState, toggleItem } = useWishlist()
  const { addItem } = useCart()
  const wishlistItems = wishlistState.items

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      addItem({
        id: item.id,
        title: item.title,
        slug: item.slug,
        image: item.images[0] || "",
        price: item.price,
        compareAtPrice: item.compareAtPrice,
        quantity: 1,
      })
    })
    alert(`${wishlistItems.length} item(s) added to cart`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-brand-muted mb-8">
            <Link href="/account" className="hover:text-brand-primary">
              Account
            </Link>
            <span>/</span>
            <span>Wishlist</span>
          </nav>

          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-brand-primary mb-2">My Wishlist</h1>
                <p className="text-brand-muted">{wishlistItems.length} items saved for later</p>
              </div>
              {wishlistItems.length > 0 && (
                <Button variant="outline" onClick={handleAddAllToCart}>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add All to Cart
                </Button>
              )}
            </div>

            {wishlistItems.length === 0 ? (
              /* Empty Wishlist State */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-brand-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-12 w-12 text-brand-muted" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-brand-primary mb-4">Your wishlist is empty</h2>
                <p className="text-brand-muted mb-8 max-w-md mx-auto">
                  Save items you love by clicking the heart icon. They'll appear here for easy access later.
                </p>
                <Button asChild className="bg-brand-primary hover:bg-brand-primary/90">
                  <Link href="/collections">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              /* Wishlist Items */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="relative">
                    <ProductCard {...item} />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                      onClick={() => toggleItem(item)}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="sr-only">Remove from wishlist</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Recommendations */}
            {wishlistItems.length > 0 && (
              <section className="mt-16 pt-16 border-t">
                <h2 className="font-display text-2xl font-bold text-brand-primary mb-8">You might also like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Add recommended products here */}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
