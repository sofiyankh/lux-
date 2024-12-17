import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FilterPanel } from "@/components/product/filter-panel"
import { SortSelect } from "@/components/product/sort-select"
import { ProductCard } from "@/components/product/product-card"
import { Pagination } from "@/components/product/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Sparkles } from "lucide-react"

// Mock data for new arrivals
const products = [
  {
    id: "1",
    title: "Cashmere Blend Sweater",
    slug: "cashmere-blend-sweater",
    images: ["/elegant-cashmere-sweater.png", "/placeholder.svg"],
    price: 189.0,
    badges: ["New Arrival", "Just In"],
    rating: { avg: 4.8, count: 24 },
  },
  // Add more new arrival products
]

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                Fresh Arrivals
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-6">New Arrivals</h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Be the first to discover our latest pieces. Fresh styles added weekly, featuring the season's most
                coveted trends and timeless essentials.
              </p>
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
                  <p className="text-brand-muted">Showing {products.length} of 32 new arrivals</p>
                  <SortSelect />
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination currentPage={1} totalPages={2} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
