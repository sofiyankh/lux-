"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export interface VariantOption {
  name: string
  values: Array<{
    value: string
    label: string
    available: boolean
    color?: string
  }>
}

export interface VariantSelectorProps {
  options: VariantOption[]
  selected: Record<string, string>
  onSelect: (optionName: string, value: string) => void
  onClearAll?: () => void
  className?: string
}

export function VariantSelector({
  options = [],
  selected = {},
  onSelect,
  onClearAll,
  className,
}: VariantSelectorProps) {
  if (!options || options.length === 0) {
    return null
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {options.map((option) => (
        <div key={option.name} className="space-y-3">
          <Label className="text-sm font-display font-medium text-brand-primary">
            {option.name}
            {selected[option.name] && (
              <span className="ml-2 text-brand-muted font-normal">
                {option.values?.find((v) => v.value === selected[option.name])?.label}
              </span>
            )}
          </Label>

          <div className="flex flex-wrap gap-2">
            {(option.values || []).map((value) => {
              const isSelected = selected[option.name] === value.value
              const isAvailable = value.available

              if (option.name.toLowerCase() === "color" && value.color) {
                return (
                  <button
                    key={value.value}
                    onClick={() => isAvailable && onSelect(option.name, value.value)}
                    disabled={!isAvailable}
                    className={`
                      relative h-8 w-8 rounded-full border-2 transition-all duration-200
                      ${isSelected ? "border-brand-accent scale-110" : "border-gray-300"}
                      ${!isAvailable ? "opacity-50 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}
                    `}
                    style={{ backgroundColor: value.color }}
                    aria-label={`Select ${value.label}`}
                  >
                    {isSelected && <div className="absolute inset-1 rounded-full border-2 border-white" />}
                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-px w-6 bg-gray-400 rotate-45" />
                      </div>
                    )}
                  </button>
                )
              }

              return (
                <Button
                  key={value.value}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => isAvailable && onSelect(option.name, value.value)}
                  disabled={!isAvailable}
                  className={`
                    transition-all duration-200
                    ${isSelected ? "bg-brand-primary text-white" : "hover:border-brand-accent"}
                    ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {value.label}
                </Button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
