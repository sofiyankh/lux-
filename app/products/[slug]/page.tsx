//"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductReviews } from "@/components/product/product-reviews"
import { ProductCard } from "@/components/product/product-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// --- Mock Data ---
const mockProduct = {
  id: "1",
  title: "Cashmere Blend Sweater",
  slug: "cashmere-blend-sweater",
  images: [
    "/elegant-cashmere-sweater.png",
    "/placeholder-mh3kw.png",
    "/wool-coat-styling.png",
    "/silk-dress-detail.png",
  ],
  price: 189.0,
  compareAtPrice: 249.0,
  description:
    "Crafted from the finest cashmere blend, this sweater offers unparalleled softness and warmth. The timeless design features a classic crew neck and ribbed cuffs, making it perfect for both casual and formal occasions. Each piece is carefully knitted to ensure durability while maintaining the luxurious feel that cashmere is known for.",
  badges: ["New Arrival", "Editor's Choice"],
  rating: { avg: 4.8, count: 24 },
  variants: {
    colors: [
      { id: "cream", name: "Cream", value: "#F5F5DC", available: true },
      { id: "navy", name: "Navy", value: "#000080", available: true },
      { id: "charcoal", name: "Charcoal", value: "#36454F", available: true },
      { id: "burgundy", name: "Burgundy", value: "#800020", available: false },
    ],
    sizes: [
      { id: "xs", name: "XS", value: "XS", available: true },
      { id: "s", name: "S", value: "S", available: true },
      { id: "m", name: "M", value: "M", available: true },
      { id: "l", name: "L", value: "L", available: true },
      { id: "xl", name: "XL", value: "XL", available: false },
    ],
  },
  inStock: true,
  details: {
    materials: "70% Cashmere, 30% Merino Wool",
    care: "Dry clean only",
    origin: "Made in Scotland",
    fit: "Regular fit",
  },
}

const mockReviews = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    title: "Absolutely love this sweater!",
    content:
      "The quality is exceptional and it's so soft. I've worn it multiple times and it still looks brand new. The fit is perfect and the color is exactly as shown.",
    date: "2024-01-15",
    verified: true,
    helpful: 12,
    size: "M",
    color: "Cream",
  },
  {
    id: "2",
    author: "Jennifer L.",
    rating: 4,
    title: "Great quality, runs slightly large",
    content:
      "Beautiful sweater with excellent craftsmanship. I would recommend sizing down as it runs a bit large. The cashmere is incredibly soft and warm.",
    date: "2024-01-10",
    verified: true,
    helpful: 8,
    size: "S",
    color: "Navy",
  },
  {
    id: "3",
    author: "Emma R.",
    rating: 5,
    title: "Perfect for layering",
    content:
      "This sweater is perfect for both casual and professional settings. The material is luxurious and the construction is solid. Worth every penny!",
    date: "2024-01-05",
    verified: true,
    helpful: 15,
    size: "M",
    color: "Charcoal",
  },
]

const relatedProducts = [
  {
    id: "2",
    title: "Tailored Wool Coat",
    slug: "tailored-wool-coat",
    images: ["/elegant-wool-coat.png"],
    price: 395.0,
    badges: ["Editor's Choice"],
    rating: { avg: 4.9, count: 18 },
  },
  {
    id: "3",
    title: "Silk Midi Dress",
    slug: "silk-midi-dress",
    images: ["/silk-midi-dress.png"],
    price: 275.0,
    rating: { avg: 4.7, count: 31 },
  },
  {
    id: "5",
    title: "Merino Wool Cardigan",
    slug: "merino-wool-cardigan",
    images: ["/merino-cardigan.png"],
    price: 165.0,
    rating: { avg: 4.5, count: 28 },
  },
  {
    id: "6",
    title: "Cotton Blend Trousers",
    slug: "cotton-blend-trousers",
    images: ["/cotton-trousers.png"],
    price: 125.0,
    compareAtPrice: 155.0,
    badges: ["Sale"],
    rating: { avg: 4.4, count: 35 },
  },
]

const products = [
  { slug: "cashmere-blend-sweater" },
  { slug: "tailored-wool-coat" },
  { slug: "silk-midi-dress" },
  { slug: "cotton-blend-trousers" },
]

// --- Static Params for SSG ---
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// --- Main Component ---
export default function ProductPage({ params }: { params: { slug: string } }) {
  // Normally, fetch product by slug here, for now we use mock
  const product = mockProduct
  const reviews = mockReviews
  const ratingDistribution = [15, 6, 2, 1, 0]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-brand-muted mb-8">
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span className="text-brand-primary font-medium">{product.title}</span>
        </nav>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ProductGallery images={product.images} alt={product.title} />
          <ProductInfo {...product} />
        </div>

        {/* Tabs: Details / Reviews / Shipping */}
        <div className="mb-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Materials & Care</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-brand-muted">Materials:</dt>
                      <dd className="text-brand-primary">{product.details.materials}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-brand-muted">Care:</dt>
                      <dd className="text-brand-primary">{product.details.care}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-brand-muted">Origin:</dt>
                      <dd className="text-brand-primary">{product.details.origin}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-brand-muted">Fit:</dt>
                      <dd className="text-brand-primary">{product.details.fit}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Size Guide</h3>
                  <p className="text-brand-muted mb-4">
                    Our cashmere sweaters are designed with a regular fit. For a more relaxed look, consider sizing up.
                  </p>
                  <div className="text-sm text-brand-muted">
                    <p>Model is 5'8" and wearing size S</p>
                    <p>Chest: 34", Waist: 26", Hips: 36"</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <ProductReviews
                reviews={reviews}
                averageRating={product.rating.avg}
                totalReviews={product.rating.count}
                ratingDistribution={ratingDistribution}
              />
            </TabsContent>

            <TabsContent value="shipping" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Shipping Information</h3>
                  <ul className="space-y-2 text-brand-muted">
                    <li>• Free standard shipping on orders over $150</li>
                    <li>• Express shipping available for $15</li>
                    <li>• International shipping to select countries</li>
                    <li>• Orders processed within 1-2 business days</li>
                    <li>• Delivery typically takes 3-7 business days</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Returns & Exchanges</h3>
                  <ul className="space-y-2 text-brand-muted">
                    <li>• 30-day return policy</li>
                    <li>• Free returns on all orders</li>
                    <li>• Items must be in original condition</li>
                    <li>• Easy online return process</li>
                    <li>• Refunds processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="mb-16" />

        {/* Related Products */}
        <section>
          <h2 className="font-display text-2xl font-bold text-brand-primary mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
