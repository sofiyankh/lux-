"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2, Download, Upload } from "lucide-react"

const products = [
  {
    id: "1",
    name: "Cashmere Blend Sweater",
    sku: "CSH-001",
    category: "Women",
    price: 189.0,
    stock: 24,
    status: "Active",
    image: "/elegant-cashmere-sweater.png",
    variants: 3,
    sales: 89,
  },
  {
    id: "2",
    name: "Silk Midi Dress",
    sku: "SLK-002",
    category: "Women",
    price: 275.0,
    stock: 12,
    status: "Active",
    image: "/silk-midi-dress.png",
    variants: 4,
    sales: 67,
  },
  {
    id: "3",
    name: "Wool Coat",
    sku: "WOL-003",
    category: "Women",
    price: 495.0,
    stock: 8,
    status: "Low Stock",
    image: "/elegant-wool-coat.png",
    variants: 2,
    sales: 45,
  },
  {
    id: "4",
    name: "Leather Ankle Boots",
    sku: "LTH-004",
    category: "Accessories",
    price: 299.0,
    stock: 0,
    status: "Out of Stock",
    image: "/leather-ankle-boots.png",
    variants: 5,
    sales: 38,
  },
  {
    id: "5",
    name: "Cotton T-Shirt",
    sku: "CTN-005",
    category: "Men",
    price: 45.0,
    stock: 156,
    status: "Draft",
    image: "/placeholder.svg",
    variants: 6,
    sales: 0,
  },
]

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>
      case "Low Stock":
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
      case "Out of Stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog and inventory</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700" asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
              <SelectItem value="Men">Men</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">{selectedProducts.length} selected</span>
            <Button variant="outline" size="sm">
              Bulk Edit
            </Button>
            <Button variant="outline" size="sm">
              Export Selected
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
              Delete Selected
            </Button>
          </div>
        )}
      </Card>

      {/* Products Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedProducts.length === products.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.variants} variants</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={product.stock === 0 ? "text-red-600" : product.stock < 10 ? "text-yellow-600" : ""}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/products/${product.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product.id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            <p className="text-sm text-gray-600">Total Products</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{products.filter((p) => p.status === "Active").length}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {products.filter((p) => p.status === "Low Stock").length}
            </p>
            <p className="text-sm text-gray-600">Low Stock</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {products.filter((p) => p.status === "Out of Stock").length}
            </p>
            <p className="text-sm text-gray-600">Out of Stock</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
