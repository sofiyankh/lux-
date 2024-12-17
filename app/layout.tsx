import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { CartDrawer } from "@/components/cart/cart-drawer"
import "./globals.css"
import { WishlistProvider } from "@/contexts/wishlist-context"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Luxe Fashion - Premium Clothing Collection",
  description: "Discover our curated collection of premium fashion pieces crafted for the modern wardrobe.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <body>
        <AuthProvider>
          <WishlistProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
