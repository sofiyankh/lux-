import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FilterPanel } from "@/components/product/filter-panel"
import { SortSelect } from "@/components/product/sort-select"
import { ProductCard } from "@/components/product/product-card"
import { Pagination } from "@/components/product/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Clock } from "lucide-react"

// Mock data for sale products
const products = [
  {
    id: "1",
    title: "Cashmere Blend Sweater",
    slug: "cashmere-blend-sweater",
    images: ["/elegant-cashmere-sweater.png", "/placeholder.svg"],
    price: 189.0,
    compareAtPrice: 249.0,
    badges: ["Sale", "Limited Time"],
    rating: { avg: 4.8, count: 24 },
  },
  {
    id: "2",
    title: "Leather Ankle Boots",
    slug: "leather-ankle-boots",
    images: ["/leather-ankle-boots.png", "/boots-detail.png"],
    price: 225.0,
    compareAtPrice: 285.0,
    badges: ["Sale"],
    rating: { avg: 4.6, count: 42 },
  },
  // Add more sale products
]

export default function SalePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-red-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Badge variant="destructive" className="mb-4">
                <Clock className="h-3 w-3 mr-1" />
                Limited Time Sale
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-6">
                End of Season Sale
              </h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto mb-8">
                Discover exceptional savings on our premium collection. Up to 40% off selected items for a limited time
                only.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-brand-muted">
                <span>Free shipping on all sale items</span>
                <span>•</span>
                <span>Final sale - no returns</span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="flex items-center justify-between mb-6 lg:hidden">
                    <h2 className="font-display font-semibold">Filters</h2>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <FilterPanel />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Sort and Results */}
                <div className="flex items-center justify-between mb-8">
                  <p className="text-brand-muted">Showing {products.length} of 45 sale items</p>
                  <SortSelect />
                </div>

                {/* Sale Banner */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                  <div className="flex items-center gap-2 text-red-800">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Sale ends in 3 days, 14 hours, 22 minutes</span>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination currentPage={1} totalPages={3} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
