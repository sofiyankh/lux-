import { Card } from "@/components/ui/card"

export function ProductSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-none bg-transparent">
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-light/50 rounded-lg animate-pulse" />
      <div className="pt-4 space-y-2">
        <div className="h-4 bg-brand-light/50 rounded animate-pulse" />
        <div className="h-4 bg-brand-light/50 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-brand-light/50 rounded w-1/2 animate-pulse" />
      </div>
    </Card>
  )
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
