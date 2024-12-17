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
import { ArrowLeft, Save, Eye, Trash2, Plus, X } from "lucide-react"
import Link from "next/link"

// Mock product data - in real app, this would come from API
const mockProduct = {
  id: "1",
  name: "Cashmere Blend Sweater",
  description:
    "Luxuriously soft cashmere blend sweater with a classic fit. Perfect for layering or wearing on its own.",
  category: "women",
  sku: "CSH-001",
  status: "active",
  tags: ["cashmere", "sweater", "luxury", "winter"],
  seoTitle: "Premium Cashmere Blend Sweater - Luxury Fashion",
  seoDescription: "Shop our premium cashmere blend sweater. Soft, comfortable, and stylish.",
  images: ["/elegant-cashmere-sweater.png", "/placeholder.svg"],
  variants: [
    {
      id: "1",
      size: "S",
      color: "Cream",
      sku: "CSH-001-S-CR",
      price: 189.0,
      stock: 12,
    },
    {
      id: "2",
      size: "M",
      color: "Cream",
      sku: "CSH-001-M-CR",
      price: 189.0,
      stock: 8,
    },
    {
      id: "3",
      size: "L",
      color: "Cream",
      sku: "CSH-001-L-CR",
      price: 189.0,
      stock: 4,
    },
  ],
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [productData, setProductData] = useState({
    name: mockProduct.name,
    description: mockProduct.description,
    category: mockProduct.category,
    sku: mockProduct.sku,
    tags: mockProduct.tags,
    status: mockProduct.status,
    seoTitle: mockProduct.seoTitle,
    seoDescription: mockProduct.seoDescription,
  })

  const [variants, setVariants] = useState(mockProduct.variants)
  const [images, setImages] = useState(mockProduct.images)
  const [newTag, setNewTag] = useState("")

  const addVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      size: "M",
      color: "Black",
      sku: "",
      price: 0,
      stock: 0,
    }
    setVariants([...variants, newVariant])
  }

  const removeVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  const updateVariant = (id: string, field: string, value: string | number) => {
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

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving product:", { ...productData, variants, images })
    router.push("/admin/products")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      // Here you would typically delete from your backend
      console.log("Deleting product:", params.id)
      router.push("/admin/products")
    }
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
            <h1 className="font-display text-2xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600">Update product information and settings</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/products/${params.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Product
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
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
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
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
                      <SelectValue />
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
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Product Images */}
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-gray-400">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
            </div>
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
                      />
                    </div>
                    <div>
                      <Label>SKU</Label>
                      <Input value={variant.sku} onChange={(e) => updateVariant(variant.id, "sku", e.target.value)} />
                    </div>
                    <div>
                      <Label>Price</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={variant.price}
                        onChange={(e) => updateVariant(variant.id, "price", Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => updateVariant(variant.id, "stock", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              ))}
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

          {/* Product Stats */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Product Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Sales</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-medium">$16,821</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Views</span>
                <span className="font-medium">2,341</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conversion</span>
                <span className="font-medium">3.8%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
