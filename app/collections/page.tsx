import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    title: "Winter Essentials",
    description: "Curated pieces for the season's rhythm",
    image: "/winter-fashion-collection.png",
    href: "/collections/winter-essentials",
    productCount: 24,
  },
  {
    title: "Timeless Classics",
    description: "Investment pieces that transcend seasons",
    image: "/classic-fashion.png",
    href: "/collections/timeless-classics",
    productCount: 18,
  },
  {
    title: "Contemporary Edge",
    description: "Modern silhouettes for the forward-thinking",
    image: "/contemporary-fashion.png",
    href: "/collections/contemporary-edge",
    productCount: 32,
  },
  {
    title: "Sustainable Luxury",
    description: "Ethically crafted pieces for conscious consumers",
    image: "/sustainable-luxury-fashion.png",
    href: "/collections/sustainable-luxury",
    productCount: 15,
  },
  {
    title: "Evening Elegance",
    description: "Sophisticated pieces for special occasions",
    image: "/elegant-evening-wear.png",
    href: "/collections/evening-elegance",
    productCount: 21,
  },
  {
    title: "Casual Comfort",
    description: "Effortless style for everyday moments",
    image: "/casual-comfortable-fashion.png",
    href: "/collections/casual-comfort",
    productCount: 28,
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-brand-light/30">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4">
              Collections
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-6">Curated Collections</h1>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              Discover our thoughtfully curated collections, each telling a unique story of style, craftsmanship, and
              modern elegance.
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-display text-xl font-semibold mb-2">{collection.title}</h3>
                      <p className="text-sm opacity-90 mb-2">{collection.description}</p>
                      <p className="text-xs opacity-75 mb-4">{collection.productCount} pieces</p>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-white text-white hover:bg-white hover:text-brand-primary bg-transparent"
                      >
                        <Link href={collection.href}>
                          Explore Collection
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="w-fit">
                  Featured Collection
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary leading-tight">
                  Winter Essentials 2024
                </h2>
                <p className="text-brand-muted text-lg leading-relaxed">
                  Our most coveted collection features carefully selected pieces that embody the essence of winter
                  elegance. From luxurious cashmere to structured outerwear, each item is designed to elevate your
                  cold-weather wardrobe.
                </p>
                <Button asChild className="bg-brand-primary hover:bg-brand-primary/90">
                  <Link href="/collections/winter-essentials">
                    Shop Winter Essentials
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/winter-fashion-collection.png"
                  alt="Winter Essentials Collection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
