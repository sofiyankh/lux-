import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for demonstration
const featuredProducts = [
  {
    id: "1",
    title: "Cashmere Blend Sweater",
    slug: "cashmere-blend-sweater",
    images: ["/elegant-cashmere-sweater.png", "/placeholder-mh3kw.png"],
    price: 189.0,
    compareAtPrice: 249.0,
    badges: ["New Arrival"],
    rating: { avg: 4.8, count: 24 },
  },
  {
    id: "2",
    title: "Tailored Wool Coat",
    slug: "tailored-wool-coat",
    images: ["/elegant-wool-coat.png", "/wool-coat-styling.png"],
    price: 395.0,
    badges: ["Editor's Choice"],
    rating: { avg: 4.9, count: 18 },
  },
  {
    id: "3",
    title: "Silk Midi Dress",
    slug: "silk-midi-dress",
    images: ["/silk-midi-dress.png", "/silk-dress-detail.png"],
    price: 275.0,
    rating: { avg: 4.7, count: 31 },
  },
  {
    id: "4",
    title: "Leather Ankle Boots",
    slug: "leather-ankle-boots",
    images: ["/leather-ankle-boots.png", "/boots-detail.png"],
    price: 225.0,
    compareAtPrice: 285.0,
    badges: ["Sale"],
    rating: { avg: 4.6, count: 42 },
  },
]

const collections = [
  {
    title: "Winter Essentials",
    description: "Curated pieces for the season's rhythm",
    image: "/winter-fashion-collection.png",
    href: "/collections/winter-essentials",
  },
  {
    title: "Timeless Classics",
    description: "Investment pieces that transcend seasons",
    image: "/classic-fashion.png",
    href: "/collections/timeless-classics",
  },
  {
    title: "Contemporary Edge",
    description: "Modern silhouettes for the forward-thinking",
    image: "/contemporary-fashion.png",
    href: "/collections/contemporary-edge",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
          <Image
            src="/elegant-winter-fashion-model.png"
            alt="Winter Collection Hero"
            fill
            className="object-cover animate-in fade-in zoom-in-95 duration-1000"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-6 max-w-2xl px-4 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight animate-in slide-in-from-bottom-4 duration-1000 delay-500">
                Winter in Motion
              </h1>
              <p className="text-lg md:text-xl font-light leading-relaxed animate-in slide-in-from-bottom-4 duration-1000 delay-700">
                A collection for quiet journeys and bold statements
              </p>
              <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-1000">
                <Link href="/discover">
                  <Button
                    size="lg"
                    className="bg-white text-brand-primary hover:bg-white/90 font-display font-semibold px-8 py-3 hover:scale-105 transition-all duration-300"
                  >
                    Explore the Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Strip */}
        <section className="bg-brand-primary text-white py-3">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm font-medium">
              Free shipping on orders over $200 • Easy returns within 30 days
            </p>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary mb-4">
                Curated Collections
              </h2>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                Thoughtfully selected pieces that tell a story of modern elegance and timeless appeal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {collections.map((collection, index) => (
                <Card
                  key={collection.title}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-display text-xl font-semibold mb-2">{collection.title}</h3>
                      <p className="text-sm opacity-90 mb-4">{collection.description}</p>
                      <Link href="/discover">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white text-white hover:bg-white hover:text-brand-primary bg-transparent hover:scale-105 transition-all duration-300"
                        >
                          Discover
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-primary mb-2">Featured Pieces</h2>
                <p className="text-brand-muted">Handpicked selections from our latest arrivals</p>
              </div>
              <Button variant="outline" className="hidden md:flex bg-transparent">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="text-center mt-12 md:hidden">
              <Button variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Editorial Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="w-fit">
                  The Edit
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary leading-tight">
                  Textural Layers for the Modern Wardrobe
                </h2>
                <p className="text-brand-muted text-lg leading-relaxed">
                  Discover the art of layering with our carefully curated selection of textures and silhouettes. Each
                  piece is designed to complement and enhance, creating effortless sophistication for every occasion.
                </p>
                <Button className="bg-brand-primary hover:bg-brand-primary/90">
                  Read the Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/layered-textures-editorial.png"
                  alt="Textural Layers Editorial"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-16 bg-brand-light/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-6 w-6 text-brand-accent" />
                </div>
                <h3 className="font-display font-semibold text-brand-primary">Free Shipping</h3>
                <p className="text-sm text-brand-muted">On orders over $200</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <RotateCcw className="h-6 w-6 text-brand-accent" />
                </div>
                <h3 className="font-display font-semibold text-brand-primary">Easy Returns</h3>
                <p className="text-sm text-brand-muted">30-day return policy</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-brand-accent" />
                </div>
                <h3 className="font-display font-semibold text-brand-primary">Secure Payment</h3>
                <p className="text-sm text-brand-muted">SSL encrypted checkout</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Headphones className="h-6 w-6 text-brand-accent" />
                </div>
                <h3 className="font-display font-semibold text-brand-primary">Expert Support</h3>
                <p className="text-sm text-brand-muted">Styling advice available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-brand-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="font-display text-3xl font-bold">Stay in the Know</h2>
              <p className="text-lg opacity-90">
                Be the first to discover new collections, exclusive offers, and styling inspiration
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus-visible:ring-white/50"
                />
                <Button className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold">Subscribe</Button>
              </div>
              <p className="text-sm opacity-75">
                By subscribing, you agree to our privacy policy and terms of service.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
