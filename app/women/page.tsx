"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FilterPanel, type FilterGroup, type ActiveFilter } from "@/components/product/filter-panel"
import { SortSelect } from "@/components/product/sort-select"
import { ProductCard } from "@/components/product/product-card"
import { Pagination } from "@/components/product/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"

// Mock data for women's products
const products = [
  {
    id: "1",
    title: "Cashmere Blend Sweater",
    slug: "cashmere-blend-sweater",
    images: ["/elegant-cashmere-sweater.png", "/placeholder.svg"],
    price: 189.0,
    compareAtPrice: 249.0,
    badges: ["New Arrival"],
    rating: { avg: 4.8, count: 24 },
  },
  {
    id: "2",
    title: "Silk Midi Dress",
    slug: "silk-midi-dress",
    images: ["/silk-midi-dress.png", "/silk-dress-detail.png"],
    price: 275.0,
    rating: { avg: 4.7, count: 31 },
  },
  {
    id: "3",
    title: "Tailored Wool Coat",
    slug: "tailored-wool-coat",
    images: ["/elegant-wool-coat.png", "/wool-coat-styling.png"],
    price: 395.0,
    badges: ["Editor's Choice"],
    rating: { avg: 4.9, count: 18 },
  },
  {
    id: "4",
    title: "Casual Hoodie",
    slug: "casual-hoodie",
    images: ["/casual-hoodie.png", "/placeholder.svg"],
    price: 85.0,
    rating: { avg: 4.4, count: 20 },
  },
  {
    id: "5",
    title: "Denim Jacket",
    slug: "denim-jacket",
    images: ["/denim-jacket.png", "/placeholder.svg"],
    price: 180.0,
    badges: ["New Arrival"],
    rating: { avg: 4.6, count: 14 },
  },
]

const filterGroups: FilterGroup[] = [
  {
    id: "category",
    name: "Category",
    type: "checkbox",
    options: [
      { value: "dresses", label: "Dresses", count: 45 },
      { value: "tops", label: "Tops & Blouses", count: 32 },
      { value: "outerwear", label: "Outerwear", count: 28 },
      { value: "knitwear", label: "Knitwear", count: 24 },
      { value: "pants", label: "Pants & Trousers", count: 19 },
      { value: "skirts", label: "Skirts", count: 15 },
    ],
  },
  {
    id: "size",
    name: "Size",
    type: "checkbox",
    options: [
      { value: "xs", label: "XS", count: 12 },
      { value: "s", label: "S", count: 28 },
      { value: "m", label: "M", count: 35 },
      { value: "l", label: "L", count: 31 },
      { value: "xl", label: "XL", count: 18 },
    ],
  },
  {
    id: "color",
    name: "Color",
    type: "color",
    options: [
      { value: "#000000", label: "Black", count: 24 },
      { value: "#FFFFFF", label: "White", count: 18 },
      { value: "#8B4513", label: "Brown", count: 15 },
      { value: "#000080", label: "Navy", count: 12 },
      { value: "#808080", label: "Gray", count: 10 },
      { value: "#FF69B4", label: "Pink", count: 8 },
    ],
  },
  {
    id: "price",
    name: "Price Range",
    type: "price",
    min: 0,
    max: 500,
    step: 25,
  },
]

export default function WomenPage() {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 3

  const handleFilterChange = (groupId: string, value: string, checked: boolean) => {
    if (checked) {
      const group = filterGroups.find((g) => g.id === groupId)
      const option = group?.options?.find((o) => o.value === value)
      if (option) setActiveFilters((prev) => [...prev, { groupId, value, label: option.label }])
    } else {
      setActiveFilters((prev) => prev.filter((f) => !(f.groupId === groupId && f.value === value)))
    }
  }

  const handlePriceChange = (groupId: string, range: [number, number]) => {
    setActiveFilters((prev) => prev.filter((f) => f.groupId !== groupId))
    setActiveFilters((prev) => [...prev, { groupId, value: `${range[0]}-${range[1]}`, label: `$${range[0]} - $${range[1]}` }])
  }

  const handleClearAll = () => setActiveFilters([])

  const paginatedProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-brand-light/30 text-center">
          <div className="container mx-auto px-4">
            <Badge variant="outline" className="mb-4">Women's Collection</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-6">Women</h1>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              Discover our complete women's collection featuring elegant dresses and timeless essentials.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h2 className="font-display font-semibold">Filters</h2>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <FilterPanel
                  filters={filterGroups}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onPriceChange={handlePriceChange}
                  onClearAll={handleClearAll}
                />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <p className="text-brand-muted">Showing {paginatedProducts.length} of {products.length} products</p>
                <SortSelect />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedProducts.map((product) => <ProductCard key={product.id} {...product} />)}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(products.length / productsPerPage)}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
