"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FilterPanel } from "@/components/product/filter-panel"
import { SortSelect } from "@/components/product/sort-select"
import { ProductCard } from "@/components/product/product-card"
import { Pagination } from "@/components/product/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"
import { useState } from "react"

// Mock data for accessories
const products = [
  {
    id: "1",
    title: "Leather Ankle Boots",
    slug: "leather-ankle-boots",
    images: ["/leather-ankle-boots.png", "/boots-detail.png"],
    price: 225.0,
    compareAtPrice: 285.0,
    badges: ["Sale"],
    rating: { avg: 4.6, count: 42 },
  },
  {
    id: "2",
    title: "Silk Scarf",
    slug: "silk-scarf",
    images: ["/luxury-silk-scarf.png", "/placeholder.svg"],
    price: 85.0,
    rating: { avg: 4.8, count: 15 },
  },
  // Add more products as needed
]

export default function AccessoriesPage() {
  const [sortValue, setSortValue] = useState("featured")

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                Accessories Collection
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-6">Accessories</h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Complete your look with our curated selection of premium accessories, from statement jewelry to luxury
                handbags and footwear.
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
                  <p className="text-brand-muted">Showing {products.length} of 64 products</p>
                  <SortSelect value={sortValue} onValueChange={setSortValue} />
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination currentPage={1} totalPages={4} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
