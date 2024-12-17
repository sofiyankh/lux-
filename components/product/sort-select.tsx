"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface SortOption {
  value: string
  label: string
}

export interface SortSelectProps {
  options?: SortOption[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

const defaultSortOptions: SortOption[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

export function SortSelect({
  options = defaultSortOptions,
  value = "featured",
  onValueChange = () => {},
  className,
}: SortSelectProps) {
  if (!options || options.length === 0) {
    return null
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-brand-muted whitespace-nowrap">Sort by:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-48 bg-white border-brand-light focus:ring-brand-accent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
