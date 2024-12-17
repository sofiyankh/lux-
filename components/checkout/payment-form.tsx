"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Smartphone, Wallet } from "lucide-react"

export interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

export interface PaymentData {
  method: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
  billingAddress?: {
    sameAsShipping: boolean
    address?: string
    city?: string
    state?: string
    zipCode?: string
  }
}

export interface PaymentFormProps {
  onSubmit: (data: PaymentData) => void
  onBack: () => void
  className?: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: <Wallet className="h-5 w-5" />,
    description: "Pay with your PayPal account",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: <Smartphone className="h-5 w-5" />,
    description: "Touch ID or Face ID required",
  },
]

export function PaymentForm({ onSubmit, onBack, className }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      sameAsShipping: true,
    },
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateCardForm = () => {
    const newErrors: Record<string, string> = {}

    if (!paymentData.cardholderName?.trim()) {
      newErrors.cardholderName = "Cardholder name is required"
    }
    if (!paymentData.cardNumber?.trim()) {
      newErrors.cardNumber = "Card number is required"
    } else if (paymentData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Please enter a valid card number"
    }
    if (!paymentData.expiryDate?.trim()) {
      newErrors.expiryDate = "Expiry date is required"
    }
    if (!paymentData.cvv?.trim()) {
      newErrors.cvv = "CVV is required"
    } else if (paymentData.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedMethod === "card" && !validateCardForm()) {
      return
    }

    onSubmit({ ...paymentData, method: selectedMethod })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const updatePaymentData = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Payment Method Selection */}
      <Card className="p-6">
        <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Payment Method</h3>
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center space-x-3 p-3 border border-brand-light rounded-lg">
              <RadioGroupItem value={method.id} id={method.id} />
              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  {method.icon}
                  <div>
                    <p className="font-medium text-brand-primary">{method.name}</p>
                    <p className="text-sm text-brand-muted">{method.description}</p>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      {/* Card Details */}
      {selectedMethod === "card" && (
        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Card Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardholderName">Cardholder Name *</Label>
              <Input
                id="cardholderName"
                value={paymentData.cardholderName}
                onChange={(e) => updatePaymentData("cardholderName", e.target.value)}
                className={errors.cardholderName ? "border-red-500" : ""}
              />
              {errors.cardholderName && <p className="text-sm text-red-500 mt-1">{errors.cardholderName}</p>}
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => updatePaymentData("cardNumber", formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={errors.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={(e) => updatePaymentData("expiryDate", formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiryDate ? "border-red-500" : ""}
                />
                {errors.expiryDate && <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  value={paymentData.cvv}
                  onChange={(e) => updatePaymentData("cvv", e.target.value.replace(/\D/g, ""))}
                  placeholder="123"
                  maxLength={4}
                  className={errors.cvv ? "border-red-500" : ""}
                />
                {errors.cvv && <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Billing Address */}
      {selectedMethod === "card" && (
        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Billing Address</h3>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="sameAsShipping"
              checked={paymentData.billingAddress?.sameAsShipping}
              onCheckedChange={(checked) =>
                setPaymentData((prev) => ({
                  ...prev,
                  billingAddress: { ...prev.billingAddress, sameAsShipping: checked as boolean },
                }))
              }
            />
            <Label htmlFor="sameAsShipping" className="text-sm">
              Same as shipping address
            </Label>
          </div>

          {!paymentData.billingAddress?.sameAsShipping && (
            <div className="space-y-4">
              <Input placeholder="Address" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="City" />
                <Input placeholder="State" />
                <Input placeholder="ZIP Code" />
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Security Notice */}
      <div className="bg-brand-light/20 border border-brand-light rounded-lg p-4">
        <p className="text-sm text-brand-muted text-center">
          🔒 Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          Back to Shipping
        </Button>
        <Button type="submit" className="flex-1 bg-brand-primary hover:bg-brand-primary/90">
          Review Order
        </Button>
      </div>
    </form>
  )
}
