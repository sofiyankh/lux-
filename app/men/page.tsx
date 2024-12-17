"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FilterPanel, type FilterGroup, type ActiveFilter } from "@/components/product/filter-panel"
import { SortSelect } from "@/components/product/sort-select"
import { ProductCard } from "@/components/product/product-card"
import { ProductPreviewModal } from "@/components/product/product-preview-modal"
import { Pagination } from "@/components/product/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"

// Mock product data
const products = [
  { id: "1", title: "Merino Wool Sweater", slug: "merino-wool-sweater", images: ["https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"], price: 165.0, compareAtPrice: 210.0, badges: ["New Arrival"], rating: { avg: 4.6, count: 18 } },
  { id: "2", title: "Cotton Chino Trousers", slug: "cotton-chino-trousers", images: ["https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg"], price: 125.0, rating: { avg: 4.5, count: 22 } },
  { id: "3", title: "Classic Oxford Shirt", slug: "classic-oxford-shirt", images: ["https://images.pexels.com/photos/428341/pexels-photo-428341.jpeg"], price: 95.0, rating: { avg: 4.7, count: 15 } },
  { id: "4", title: "Tailored Wool Coat", slug: "tailored-wool-coat", images: ["https://images.pexels.com/photos/428342/pexels-photo-428342.jpeg"], price: 395.0, badges: ["Editor's Choice"], rating: { avg: 4.9, count: 18 } },
  { id: "5", title: "Casual Hoodie", slug: "casual-hoodie", images: ["https://images.pexels.com/photos/428343/pexels-photo-428343.jpeg"], price: 85.0, rating: { avg: 4.4, count: 20 } },
  { id: "6", title: "Denim Jacket", slug: "denim-jacket", images: ["https://images.pexels.com/photos/428344/pexels-photo-428344.jpeg"], price: 180.0, badges: ["New Arrival"], rating: { avg: 4.6, count: 14 } },
]

// Mock filter groups
const filterGroups: FilterGroup[] = [
  { id: "category", name: "Category", type: "checkbox", options: [ { value: "shirts", label: "Shirts", count: 45 }, { value: "pants", label: "Pants", count: 32 }, { value: "outerwear", label: "Outerwear", count: 28 }, { value: "knitwear", label: "Knitwear", count: 24 }, { value: "accessories", label: "Accessories", count: 19 } ] },
  { id: "size", name: "Size", type: "checkbox", options: [ { value: "xs", label: "XS", count: 12 }, { value: "s", label: "S", count: 28 }, { value: "m", label: "M", count: 35 }, { value: "l", label: "L", count: 31 }, { value: "xl", label: "XL", count: 18 } ] },
  { id: "color", name: "Color", type: "color", options: [ { value: "#000000", label: "Black", count: 24 }, { value: "#FFFFFF", label: "White", count: 18 }, { value: "#8B4513", label: "Brown", count: 15 }, { value: "#000080", label: "Navy", count: 12 }, { value: "#808080", label: "Gray", count: 10 } ] },
  { id: "price", name: "Price Range", type: "price", min: 0, max: 500, step: 25 },
]

export default function MenPage() {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 3

  const { state: cartState, addItem } = useCart()

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

  const handleAddToCart = (productId: string, quantity: number, variants?: Record<string, string>) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return
    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      image: product.images[0] || "",
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      quantity,
      selectedColor: variants?.Color,
      selectedSize: variants?.Size,
    })
    alert(`Added ${quantity} item(s) of ${product.title} to cart`)
  }

  const paginatedProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  return (
    <div className="min-h-screen bg-white">
      <Header cartCount={cartState.items.length} />

      <main>
        <section className="relative py-16 bg-brand-light/30 text-center">
          <div className="container mx-auto px-4">
            <Badge variant="outline" className="mb-4">Men's Collection</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-6">Men</h1>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              Explore our curated men's collection featuring timeless pieces.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h2 className="font-display font-semibold">Filters</h2>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" /> Filter
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
                {paginatedProducts.map((product) => (
                  <ProductPreviewModal
                    key={product.id}
                    {...product}
                    onAddToCart={handleAddToCart}
                  >
                    <ProductCard {...product} />
                  </ProductPreviewModal>
                ))}
              </div>

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
