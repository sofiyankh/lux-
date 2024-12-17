"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: string
}

export interface ShippingFormProps {
  onSubmit: (data: { address: ShippingAddress; method: string; saveAddress: boolean }) => void
  onBack?: () => void
  className?: string
}

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 0,
    estimatedDays: "5-7 days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 15,
    estimatedDays: "2-3 days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 35,
    estimatedDays: "1 day",
  },
]

export function ShippingForm({ onSubmit, onBack, className }: ShippingFormProps) {
  const [address, setAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })
  const [selectedMethod, setSelectedMethod] = useState("standard")
  const [saveAddress, setSaveAddress] = useState(false)
  const [errors, setErrors] = useState<Partial<ShippingAddress>>({})

  const validateForm = () => {
    const newErrors: Partial<ShippingAddress> = {}

    if (!address.firstName.trim()) newErrors.firstName = "First name is required"
    if (!address.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!address.email.trim()) newErrors.email = "Email is required"
    if (!address.phone.trim()) newErrors.phone = "Phone is required"
    if (!address.address.trim()) newErrors.address = "Address is required"
    if (!address.city.trim()) newErrors.city = "City is required"
    if (!address.state.trim()) newErrors.state = "State is required"
    if (!address.zipCode.trim()) newErrors.zipCode = "ZIP code is required"

    // Email validation
    if (address.email && !/\S+@\S+\.\S+/.test(address.email)) {
      newErrors.email = "Please enter a valid email"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({ address, method: selectedMethod, saveAddress })
    }
  }

  const updateAddress = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Contact Information */}
      <Card className="p-6">
        <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={address.firstName}
              onChange={(e) => updateAddress("firstName", e.target.value)}
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={address.lastName}
              onChange={(e) => updateAddress("lastName", e.target.value)}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={address.email}
              onChange={(e) => updateAddress("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={address.phone}
              onChange={(e) => updateAddress("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </div>
      </Card>

      {/* Shipping Address */}
      <Card className="p-6">
        <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Shipping Address</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={address.address}
              onChange={(e) => updateAddress("address", e.target.value)}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
          </div>
          <div>
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input
              id="apartment"
              value={address.apartment}
              onChange={(e) => updateAddress("apartment", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={address.city}
                onChange={(e) => updateAddress("city", e.target.value)}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Select value={address.state} onValueChange={(value) => updateAddress("state", value)}>
                <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  {/* Add more states as needed */}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={address.zipCode}
                onChange={(e) => updateAddress("zipCode", e.target.value)}
                className={errors.zipCode ? "border-red-500" : ""}
              />
              {errors.zipCode && <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        </div>
      </Card>

      {/* Shipping Method */}
      <Card className="p-6">
        <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Shipping Method</h3>
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
          {shippingMethods.map((method) => (
            <div key={method.id} className="flex items-center space-x-3 p-3 border border-brand-light rounded-lg">
              <RadioGroupItem value={method.id} id={method.id} />
              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-brand-primary">{method.name}</p>
                    <p className="text-sm text-brand-muted">{method.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-brand-primary">
                      {method.price === 0 ? "Free" : `$${method.price.toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      {/* Save Address Option */}
      <div className="flex items-center space-x-2">
        <Checkbox id="saveAddress" checked={saveAddress} onCheckedChange={setSaveAddress} />
        <Label htmlFor="saveAddress" className="text-sm text-brand-muted">
          Save this address for future orders
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            Back to Cart
          </Button>
        )}
        <Button type="submit" className="flex-1 bg-brand-primary hover:bg-brand-primary/90">
          Continue to Payment
        </Button>
      </div>
    </form>
  )
}
