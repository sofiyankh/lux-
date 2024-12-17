import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles, TrendingUp, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const discoverSections = [
  {
    title: "New Arrivals",
    description: "Fresh pieces that define the season",
    icon: Sparkles,
    href: "/new-arrivals",
    image: "/elegant-cashmere-sweater.png",
    badge: "Just In",
  },
  {
    title: "Trending Now",
    description: "What everyone's talking about",
    icon: TrendingUp,
    href: "/collections/trending",
    image: "/silk-midi-dress.png",
    badge: "Popular",
  },
  {
    title: "Editor's Choice",
    description: "Curated by our style experts",
    icon: Award,
    href: "/collections/editors-choice",
    image: "/elegant-wool-coat.png",
    badge: "Featured",
  },
]

const featuredCollections = [
  {
    title: "Winter Essentials",
    description: "Timeless pieces for the colder months",
    image: "/winter-fashion-collection.png",
    href: "/collections/winter-essentials",
    products: 24,
  },
  {
    title: "Workwear Refined",
    description: "Professional pieces with modern edge",
    image: "/professional-woman-diverse.png",
    href: "/collections/workwear",
    products: 18,
  },
  {
    title: "Weekend Luxe",
    description: "Elevated casual for your downtime",
    image: "/contemporary-fashion.png",
    href: "/collections/weekend",
    products: 32,
  },
]

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-brand-light/30 to-brand-accent/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <Badge variant="outline" className="mb-4">
                Discover
              </Badge>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-primary animate-in slide-in-from-bottom-4 duration-1000">
                Explore Our World
              </h1>
              <p className="text-lg md:text-xl text-brand-muted leading-relaxed animate-in slide-in-from-bottom-4 duration-1000 delay-200">
                Discover curated collections, trending pieces, and exclusive finds that define modern elegance
              </p>
            </div>
          </div>
        </section>

        {/* Quick Discover Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {discoverSections.map((section, index) => (
                <Card
                  key={section.title}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={section.image || "/placeholder.svg"}
                      alt={section.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-brand-primary">{section.badge}</Badge>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <section.icon className="h-5 w-5" />
                        <h3 className="font-display text-xl font-semibold">{section.title}</h3>
                      </div>
                      <p className="text-sm opacity-90 mb-4">{section.description}</p>
                      <Link href={section.href}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white text-white hover:bg-white hover:text-brand-primary bg-transparent"
                        >
                          Explore
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-20 bg-brand-light/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary mb-4">
                Featured Collections
              </h2>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                Carefully curated collections that tell a story of style, quality, and timeless appeal
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredCollections.map((collection, index) => (
                <Card
                  key={collection.title}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-display text-2xl font-bold mb-2">{collection.title}</h3>
                      <p className="text-sm opacity-90 mb-2">{collection.description}</p>
                      <p className="text-xs opacity-75 mb-4">{collection.products} pieces</p>
                      <Link href={collection.href}>
                        <Button
                          variant="outline"
                          className="border-white text-white hover:bg-white hover:text-brand-primary bg-transparent w-full"
                        >
                          Shop Collection
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Style Guide Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="w-fit">
                  Style Guide
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary leading-tight">
                  Your Personal Style Journey
                </h2>
                <p className="text-brand-muted text-lg leading-relaxed">
                  Discover your unique style with our curated guides, seasonal lookbooks, and expert styling tips. From
                  wardrobe essentials to statement pieces, we'll help you build a collection that reflects your
                  personality.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-accent rounded-full" />
                    <span className="text-brand-muted">Seasonal style guides and trends</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-accent rounded-full" />
                    <span className="text-brand-muted">Personal styling consultations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-accent rounded-full" />
                    <span className="text-brand-muted">Wardrobe building essentials</span>
                  </div>
                </div>
                <Link href="/account/style-profile">
                  <Button className="bg-brand-primary hover:bg-brand-primary/90">
                    Start Your Style Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/layered-textures-editorial.png"
                  alt="Style Guide"
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
