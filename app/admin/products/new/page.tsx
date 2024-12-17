"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Plus, Save, Eye } from "lucide-react"
import Link from "next/link"

interface ProductVariant {
  id: string
  size: string
  color: string
  sku: string
  price: number
  stock: number
}

export default function NewProductPage() {
  const router = useRouter()
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    basePrice: "",
    sku: "",
    tags: [] as string[],
    status: "draft",
    seoTitle: "",
    seoDescription: "",
  })

  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      id: "1",
      size: "S",
      color: "Black",
      sku: "",
      price: 0,
      stock: 0,
    },
  ])

  const [images, setImages] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      size: "M",
      color: "Black",
      sku: "",
      price: Number.parseFloat(productData.basePrice) || 0,
      stock: 0,
    }
    setVariants([...variants, newVariant])
  }

  const removeVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  const updateVariant = (id: string, field: keyof ProductVariant, value: string | number) => {
    setVariants(variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
  }

  const addTag = () => {
    if (newTag.trim() && !productData.tags.includes(newTag.trim())) {
      setProductData({
        ...productData,
        tags: [...productData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setProductData({
      ...productData,
      tags: productData.tags.filter((t) => t !== tag),
    })
  }

  const handleSave = (status: "draft" | "active") => {
    // Here you would typically save to your backend
    console.log("Saving product:", { ...productData, status, variants, images })
    router.push("/admin/products")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Create a new product for your store</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSave("draft")}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={() => handleSave("active")}>
            Publish Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={productData.name}
                  onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                  placeholder="Describe your product..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={productData.category}
                    onValueChange={(value) => setProductData({ ...productData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={productData.sku}
                    onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                    placeholder="Product SKU"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="basePrice">Base Price</Label>
                <Input
                  id="basePrice"
                  type="number"
                  step="0.01"
                  value={productData.basePrice}
                  onChange={(e) => setProductData({ ...productData, basePrice: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
          </Card>

          {/* Product Images */}
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
              <p className="text-sm text-gray-500">Supports JPG, PNG up to 10MB each</p>
              <Button variant="outline" className="mt-4 bg-transparent">
                Choose Files
              </Button>
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Product Variants */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-gray-900">Product Variants</h2>
              <Button variant="outline" size="sm" onClick={addVariant}>
                <Plus className="h-4 w-4 mr-2" />
                Add Variant
              </Button>
            </div>
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Variant {index + 1}</h3>
                    {variants.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVariant(variant.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label>Size</Label>
                      <Select value={variant.size} onValueChange={(value) => updateVariant(variant.id, "size", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="XXL">XXL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Color</Label>
                      <Input
                        value={variant.color}
                        onChange={(e) => updateVariant(variant.id, "color", e.target.value)}
                        placeholder="Color"
                      />
                    </div>
                    <div>
                      <Label>SKU</Label>
                      <Input
                        value={variant.sku}
                        onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                        placeholder="Variant SKU"
                      />
                    </div>
                    <div>
                      <Label>Price</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={variant.price}
                        onChange={(e) => updateVariant(variant.id, "price", Number.parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => updateVariant(variant.id, "stock", Number.parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* SEO */}
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={productData.seoTitle}
                  onChange={(e) => setProductData({ ...productData, seoTitle: e.target.value })}
                  placeholder="SEO optimized title"
                />
              </div>
              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={productData.seoDescription}
                  onChange={(e) => setProductData({ ...productData, seoDescription: e.target.value })}
                  placeholder="SEO meta description"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Status</h3>
            <Select
              value={productData.status}
              onValueChange={(value) => setProductData({ ...productData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button variant="outline" size="sm" onClick={addTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {productData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Inventory Summary */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Inventory Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Variants</span>
                <span className="font-medium">{variants.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Stock</span>
                <span className="font-medium">{variants.reduce((sum, v) => sum + v.stock, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price Range</span>
                <span className="font-medium">
                  ${Math.min(...variants.map((v) => v.price))} - ${Math.max(...variants.map((v) => v.price))}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
