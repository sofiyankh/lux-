"use client"

import { useCart } from "@/contexts/cart-context"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

export function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, clearCart } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    closeCart()
    router.push("/checkout")
  }

  const handleContinueShopping = () => {
    closeCart()
  }

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart()
    }
  }

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full p-0">
        {/* Header */}
        <SheetHeader className="flex-shrink-0 border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart ({state.itemCount})
            </SheetTitle>
            {state.items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-muted-foreground hover:text-red-500"
              >
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>

        {/* Content */}
        {state.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-6">
            <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Discover our latest collections and add some items to get started.
              </p>
              <Button
                onClick={handleContinueShopping}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {state.items.map((item, index) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                    <CartItem
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                    {index < state.items.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Summary */}
            <div className="flex-shrink-0 border-t px-6 py-4 bg-background">
              <CartSummary
                subtotal={state.subtotal}
                itemCount={state.itemCount}
                onCheckout={handleCheckout}
                onContinueShopping={handleContinueShopping}
              />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
