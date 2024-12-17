"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product/product-card"
import { FilterPanel, type FilterGroup, type ActiveFilter } from "@/components/product/filter-panel"
import { SortSelect, type SortOption } from "@/components/product/sort-select"
import { Pagination } from "@/components/product/pagination"
import { ProductGridSkeleton } from "@/components/product/product-skeleton"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Filter, Grid, List } from "lucide-react"

// --- MOCK DATA ---
const mockProducts = [
  { id: "1", title: "Cashmere Blend Sweater", slug: "cashmere-blend-sweater", images: ["/elegant-cashmere-sweater.png"], price: 189 },
  { id: "2", title: "Tailored Wool Coat", slug: "tailored-wool-coat", images: ["/elegant-wool-coat.png"], price: 395 },
  { id: "3", title: "Silk Midi Dress", slug: "silk-midi-dress", images: ["/silk-midi-dress.png"], price: 275 },
  { id: "4", title: "Leather Ankle Boots", slug: "leather-ankle-boots", images: ["/leather-ankle-boots.png"], price: 225 },
  { id: "5", title: "Merino Wool Cardigan", slug: "merino-wool-cardigan", images: ["/cardigan-detail.png"], price: 165 }, // updated
  { id: "6", title: "Cotton Blend Trousers", slug: "cotton-blend-trousers", images: ["/cotton-trousers.png"], price: 125 },
]

// --- FILTERS & SORT OPTIONS ---
const filterGroups: FilterGroup[] = [
  { 
    id: "category", 
    name: "Category", 
    type: "checkbox", 
    options: [
      { value: "tops", label: "Tops", count: 24 }, 
      { value: "dresses", label: "Dresses", count: 12 },
      { value: "outerwear", label: "Outerwear", count: 8 } // added extra filter option
    ] 
  },
  { id: "price", name: "Price Range", type: "price", min: 0, max: 500, step: 25 },
]

const sortOptions: SortOption[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "title-a-z", label: "Title: A-Z" }, // added alphabetical sort
  { value: "title-z-a", label: "Title: Z-A" },
]

export default function CollectionClient({ id }: { id: string }) {
  const [products] = useState(mockProducts)
  const [loading, setLoading] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const collectionTitle = id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  // --- FILTERED & SORTED PRODUCTS ---
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Apply checkbox filters
    activeFilters.forEach(f => {
      if (f.groupId === "category") {
        filtered = filtered.filter(p => p.slug.includes(f.value))
      }
      if (f.groupId === "price") {
        const [min, max] = f.value.split("-").map(Number)
        filtered = filtered.filter(p => p.price >= min && p.price <= max)
      }
    })

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "title-a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    return filtered
  }, [products, activeFilters, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / 12)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * 12, currentPage * 12)

  // --- HANDLERS ---
  const handleFilterChange = (groupId: string, value: string, checked: boolean) => {
    if (checked) {
      const group = filterGroups.find(g => g.id === groupId)
      const option = group?.options?.find(o => o.value === value)
      if (option) setActiveFilters(prev => [...prev, { groupId, value, label: option.label }])
    } else {
      setActiveFilters(prev => prev.filter(f => !(f.groupId === groupId && f.value === value)))
    }
    setCurrentPage(1)
  }

  const handlePriceChange = (groupId: string, range: [number, number]) => {
    setActiveFilters(prev => [
      ...prev.filter(f => f.groupId !== groupId),
      { groupId, value: `${range[0]}-${range[1]}`, label: `$${range[0]} - $${range[1]}` }
    ])
    setCurrentPage(1)
  }

  const handleClearAllFilters = () => {
    setActiveFilters([])
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setLoading(true)
    setTimeout(() => setLoading(false), 300)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-brand-muted mb-8">
          <span>Home</span>/<span>Collections</span>/<span className="text-brand-primary font-medium">{collectionTitle}</span>
        </nav>

        {/* Header */}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-primary mb-4">{collectionTitle}</h1>

        {/* Filters & Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel 
                filters={filterGroups} 
                activeFilters={activeFilters} 
                onFilterChange={handleFilterChange} 
                onPriceChange={handlePriceChange} 
                onClearAll={handleClearAllFilters} 
              />
            </div>
          </aside>

          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-light">
              <div className="flex items-center gap-4">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <Filter className="h-4 w-4 mr-2" /> Filters
                      {activeFilters.length > 0 && <Badge className="ml-2 bg-brand-accent text-white">{activeFilters.length}</Badge>}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                    <div className="mt-6">
                      <FilterPanel 
                        filters={filterGroups} 
                        activeFilters={activeFilters} 
                        onFilterChange={handleFilterChange} 
                        onPriceChange={handlePriceChange} 
                        onClearAll={handleClearAllFilters} 
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                <span className="text-sm text-brand-muted">{filteredProducts.length} products</span>
              </div>

              <div className="flex items-center gap-4">
                <SortSelect options={sortOptions} value={sortBy} onValueChange={handleSortChange} />
                <div className="hidden sm:flex items-center border border-brand-light rounded-lg p-1">
                  <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="h-8 w-8 p-0"><Grid className="h-4 w-4" /></Button>
                  <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 w-8 p-0"><List className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? <ProductGridSkeleton /> : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"}>
                {paginatedProducts.map(p => <ProductCard key={p.id} {...p} />)}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}