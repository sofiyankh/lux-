import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-brand-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold">Luxe</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Curated fashion pieces for the modern wardrobe. Discover timeless elegance and contemporary style.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/women" className="text-gray-300 hover:text-white transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/men" className="text-gray-300 hover:text-white transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-gray-300 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-gray-300 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-gray-300 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-300 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Stay Updated</h4>
            <p className="text-gray-300 text-sm">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-brand-accent"
              />
              <Button className="bg-brand-accent hover:bg-brand-accent/90">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-300 text-sm">© 2024 Luxe Fashion. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
