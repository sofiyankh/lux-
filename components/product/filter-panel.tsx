"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export interface FilterOption {
  value: string
  label: string
  count: number
  disabled?: boolean
}

export interface FilterGroup {
  id: string
  name: string
  type: "checkbox" | "color" | "price"
  options?: FilterOption[]
  min?: number
  max?: number
  step?: number
}

export interface ActiveFilter {
  groupId: string
  value: string
  label: string
}

export interface FilterPanelProps {
  filters?: FilterGroup[]
  activeFilters?: ActiveFilter[]
  onFilterChange?: (groupId: string, value: string, checked: boolean) => void
  onPriceChange?: (groupId: string, range: [number, number]) => void
  onClearAll?: () => void
  className?: string
}

export function FilterPanel({
  filters = [],
  activeFilters = [],
  onFilterChange = () => {},
  onPriceChange = () => {},
  onClearAll = () => {},
  className,
}: FilterPanelProps) {
  const [priceRanges, setPriceRanges] = useState<Record<string, [number, number]>>({})

  const handlePriceChange = (groupId: string, values: number[]) => {
    const range: [number, number] = [values[0], values[1]]
    setPriceRanges((prev) => ({ ...prev, [groupId]: range }))
    onPriceChange(groupId, range)
  }

  if (!filters || filters.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center py-8">
          <p className="text-brand-muted">No filters available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Active Filters */}
      {activeFilters && activeFilters.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-medium text-brand-primary">Active Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-brand-muted hover:text-brand-primary"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge
                key={`${filter.groupId}-${filter.value}`}
                variant="secondary"
                className="bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 cursor-pointer"
                onClick={() => onFilterChange(filter.groupId, filter.value, false)}
              >
                {filter.label}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Filter Groups */}
      <Accordion type="multiple" defaultValue={filters.map((f) => f.id)} className="w-full">
        {filters.map((group) => (
          <AccordionItem key={group.id} value={group.id} className="border-brand-light">
            <AccordionTrigger className="font-display font-medium text-brand-primary hover:text-brand-accent">
              {group.name}
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {group.type === "checkbox" && group.options && (
                <div className="space-y-2">
                  {group.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${group.id}-${option.value}`}
                        checked={activeFilters.some((f) => f.groupId === group.id && f.value === option.value)}
                        onCheckedChange={(checked) => onFilterChange(group.id, option.value, checked as boolean)}
                        disabled={option.disabled}
                      />
                      <Label
                        htmlFor={`${group.id}-${option.value}`}
                        className={`flex-1 text-sm cursor-pointer ${
                          option.disabled ? "text-brand-muted/50" : "text-brand-muted hover:text-brand-primary"
                        }`}
                      >
                        {option.label}
                        <span className="ml-1 text-xs">({option.count})</span>
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {group.type === "color" && group.options && (
                <div className="grid grid-cols-6 gap-2">
                  {group.options.map((option) => {
                    const isActive = activeFilters.some((f) => f.groupId === group.id && f.value === option.value)
                    return (
                      <button
                        key={option.value}
                        onClick={() => onFilterChange(group.id, option.value, !isActive)}
                        disabled={option.disabled}
                        className={`
                          relative h-8 w-8 rounded-full border-2 transition-all duration-200
                          ${isActive ? "border-brand-accent scale-110" : "border-gray-300"}
                          ${option.disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}
                        `}
                        style={{ backgroundColor: option.value }}
                        aria-label={`Filter by ${option.label}`}
                        title={`${option.label} (${option.count})`}
                      >
                        {isActive && <div className="absolute inset-1 rounded-full border-2 border-white" />}
                        {option.disabled && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-px w-6 bg-gray-400 rotate-45" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {group.type === "price" && group.min !== undefined && group.max !== undefined && (
                <div className="space-y-4">
                  <Slider
                    min={group.min}
                    max={group.max}
                    step={group.step || 10}
                    value={priceRanges[group.id] || [group.min, group.max]}
                    onValueChange={(values) => handlePriceChange(group.id, values)}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-brand-muted">
                    <span>${priceRanges[group.id]?.[0] || group.min}</span>
                    <span>${priceRanges[group.id]?.[1] || group.max}</span>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
