"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"

export interface QuantityInputProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  className?: string
}

export function QuantityInput({ value, min = 1, max = 99, onChange, className }: QuantityInputProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value) || min
    if (newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  return (
    <div className={`flex items-center border rounded-lg ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDecrement}
        disabled={value <= min}
        className="h-10 w-10 rounded-r-none hover:bg-brand-light"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="h-10 w-16 text-center border-0 border-l border-r rounded-none focus-visible:ring-0"
        aria-label="Quantity"
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={handleIncrement}
        disabled={value >= max}
        className="h-10 w-10 rounded-l-none hover:bg-brand-light"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
