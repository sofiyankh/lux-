"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Palette, Ruler, Shirt, Save } from "lucide-react"
import Link from "next/link"

export default function StyleProfilePage() {
  const [preferences, setPreferences] = useState({
    sizes: {
      tops: "M",
      bottoms: "M",
      dresses: "M",
      shoes: "8",
    },
    stylePreferences: ["classic", "minimalist"],
    colorPalette: ["neutrals", "earth-tones"],
    occasions: ["work", "casual"],
    priceRange: "mid-range",
  })

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]
  const shoesSizes = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"]

  const styleOptions = [
    { id: "classic", label: "Classic", description: "Timeless, elegant pieces" },
    { id: "minimalist", label: "Minimalist", description: "Clean lines, simple silhouettes" },
    { id: "bohemian", label: "Bohemian", description: "Free-spirited, artistic flair" },
    { id: "edgy", label: "Edgy", description: "Bold, contemporary designs" },
    { id: "romantic", label: "Romantic", description: "Feminine, soft details" },
    { id: "sporty", label: "Sporty", description: "Athletic-inspired comfort" },
  ]

  const colorOptions = [
    { id: "neutrals", label: "Neutrals", colors: ["#F5F5F5", "#E8E8E8", "#C0C0C0", "#808080"] },
    { id: "earth-tones", label: "Earth Tones", colors: ["#D2B48C", "#CD853F", "#A0522D", "#8B4513"] },
    { id: "jewel-tones", label: "Jewel Tones", colors: ["#4B0082", "#008B8B", "#B22222", "#228B22"] },
    { id: "pastels", label: "Pastels", colors: ["#FFB6C1", "#E6E6FA", "#F0E68C", "#98FB98"] },
    { id: "bold-brights", label: "Bold & Bright", colors: ["#FF4500", "#FF1493", "#00CED1", "#32CD32"] },
  ]

  const occasionOptions = [
    { id: "work", label: "Work/Professional" },
    { id: "casual", label: "Casual/Everyday" },
    { id: "evening", label: "Evening/Formal" },
    { id: "weekend", label: "Weekend/Leisure" },
    { id: "special", label: "Special Events" },
  ]

  const handleStyleChange = (styleId: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      stylePreferences: checked
        ? [...prev.stylePreferences, styleId]
        : prev.stylePreferences.filter((id) => id !== styleId),
    }))
  }

  const handleColorChange = (colorId: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      colorPalette: checked ? [...prev.colorPalette, colorId] : prev.colorPalette.filter((id) => id !== colorId),
    }))
  }

  const handleOccasionChange = (occasionId: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      occasions: checked ? [...prev.occasions, occasionId] : prev.occasions.filter((id) => id !== occasionId),
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-brand-muted mb-8">
            <Link href="/account" className="hover:text-brand-primary">
              Account
            </Link>
            <span>/</span>
            <span>Style Profile</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-brand-primary mb-2">Style Profile</h1>
              <p className="text-brand-muted">Help us personalize your shopping experience</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Size Preferences */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-accent/10 rounded-lg">
                      <Ruler className="h-5 w-5 text-brand-accent" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-brand-primary">Size Preferences</h2>
                      <p className="text-sm text-brand-muted">Your preferred sizes for different categories</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-brand-primary mb-3 block">Tops</Label>
                      <RadioGroup
                        value={preferences.sizes.tops}
                        onValueChange={(value) =>
                          setPreferences((prev) => ({
                            ...prev,
                            sizes: { ...prev.sizes, tops: value },
                          }))
                        }
                        className="flex flex-wrap gap-2"
                      >
                        {sizeOptions.map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <RadioGroupItem value={size} id={`tops-${size}`} />
                            <Label htmlFor={`tops-${size}`} className="text-sm">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-brand-primary mb-3 block">Bottoms</Label>
                      <RadioGroup
                        value={preferences.sizes.bottoms}
                        onValueChange={(value) =>
                          setPreferences((prev) => ({
                            ...prev,
                            sizes: { ...prev.sizes, bottoms: value },
                          }))
                        }
                        className="flex flex-wrap gap-2"
                      >
                        {sizeOptions.map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <RadioGroupItem value={size} id={`bottoms-${size}`} />
                            <Label htmlFor={`bottoms-${size}`} className="text-sm">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-brand-primary mb-3 block">Dresses</Label>
                      <RadioGroup
                        value={preferences.sizes.dresses}
                        onValueChange={(value) =>
                          setPreferences((prev) => ({
                            ...prev,
                            sizes: { ...prev.sizes, dresses: value },
                          }))
                        }
                        className="flex flex-wrap gap-2"
                      >
                        {sizeOptions.map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <RadioGroupItem value={size} id={`dresses-${size}`} />
                            <Label htmlFor={`dresses-${size}`} className="text-sm">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-brand-primary mb-3 block">Shoes</Label>
                      <RadioGroup
                        value={preferences.sizes.shoes}
                        onValueChange={(value) =>
                          setPreferences((prev) => ({
                            ...prev,
                            sizes: { ...prev.sizes, shoes: value },
                          }))
                        }
                        className="flex flex-wrap gap-2"
                      >
                        {shoesSizes.map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <RadioGroupItem value={size} id={`shoes-${size}`} />
                            <Label htmlFor={`shoes-${size}`} className="text-sm">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </Card>

                {/* Style Preferences */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-accent/10 rounded-lg">
                      <Shirt className="h-5 w-5 text-brand-accent" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-brand-primary">Style Preferences</h2>
                      <p className="text-sm text-brand-muted">
                        Select styles that match your aesthetic (choose multiple)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {styleOptions.map((style) => (
                      <div
                        key={style.id}
                        className="flex items-start space-x-3 p-4 border border-brand-light rounded-lg"
                      >
                        <Checkbox
                          id={style.id}
                          checked={preferences.stylePreferences.includes(style.id)}
                          onCheckedChange={(checked) => handleStyleChange(style.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={style.id} className="font-medium text-brand-primary cursor-pointer">
                            {style.label}
                          </Label>
                          <p className="text-sm text-brand-muted mt-1">{style.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Color Preferences */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-accent/10 rounded-lg">
                      <Palette className="h-5 w-5 text-brand-accent" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-brand-primary">Color Preferences</h2>
                      <p className="text-sm text-brand-muted">Choose your favorite color palettes</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {colorOptions.map((palette) => (
                      <div
                        key={palette.id}
                        className="flex items-center space-x-4 p-4 border border-brand-light rounded-lg"
                      >
                        <Checkbox
                          id={palette.id}
                          checked={preferences.colorPalette.includes(palette.id)}
                          onCheckedChange={(checked) => handleColorChange(palette.id, checked as boolean)}
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex gap-1">
                            {palette.colors.map((color, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 rounded-full border border-gray-200"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <Label htmlFor={palette.id} className="font-medium text-brand-primary cursor-pointer">
                            {palette.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Occasion Preferences */}
                <Card className="p-6">
                  <div className="mb-6">
                    <h2 className="font-display text-xl font-semibold text-brand-primary mb-2">Shopping Occasions</h2>
                    <p className="text-sm text-brand-muted">What occasions do you shop for most?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {occasionOptions.map((occasion) => (
                      <div
                        key={occasion.id}
                        className="flex items-center space-x-3 p-4 border border-brand-light rounded-lg"
                      >
                        <Checkbox
                          id={occasion.id}
                          checked={preferences.occasions.includes(occasion.id)}
                          onCheckedChange={(checked) => handleOccasionChange(occasion.id, checked as boolean)}
                        />
                        <Label htmlFor={occasion.id} className="font-medium text-brand-primary cursor-pointer">
                          {occasion.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Current Profile</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-brand-muted">Preferred Styles</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {preferences.stylePreferences.map((style) => (
                          <Badge key={style} variant="outline" className="text-xs">
                            {styleOptions.find((s) => s.id === style)?.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-brand-muted">Color Palettes</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {preferences.colorPalette.map((color) => (
                          <Badge key={color} variant="outline" className="text-xs">
                            {colorOptions.find((c) => c.id === color)?.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Benefits</h3>
                  <ul className="text-sm text-brand-muted space-y-2">
                    <li>• Personalized product recommendations</li>
                    <li>• Size-filtered search results</li>
                    <li>• Curated collections for your style</li>
                    <li>• Early access to relevant sales</li>
                  </ul>
                </Card>

                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
