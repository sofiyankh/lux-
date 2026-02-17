// app/account/orders/page.tsx
// This is now a Server Component → fully static + SSG compatible

import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Package, Search, Download } from "lucide-react"

// Mock orders data (in real app → fetch from DB/API)
const orders = [
  {
    id: "ORD-123456",
    date: "2024-01-15",
    status: "Delivered",
    total: 189.0,
    items: 2,
    trackingNumber: "1Z999AA1234567890",
  },
  {
    id: "ORD-123455",
    date: "2024-01-10",
    status: "In Transit",
    total: 275.0,
    items: 1,
    trackingNumber: "1Z999AA1234567891",
  },
  {
    id: "ORD-123454",
    date: "2024-01-05",
    status: "Processing",
    total: 125.0,
    items: 3,
  },
  {
    id: "ORD-123453",
    date: "2023-12-28",
    status: "Delivered",
    total: 95.0,
    items: 1,
    trackingNumber: "1Z999AA1234567892",
  },
  {
    id: "ORD-123452",
    date: "2023-12-20",
    status: "Cancelled",
    total: 220.0,
    items: 2,
  },
] as const

// Generate static paths for each order detail page
export function generateStaticParams() {
  return orders.map((order) => ({
    id: order.id,
  }))
}

interface OrderPageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function OrderPage({ params, searchParams }: OrderPageProps) {
  // Find the current order by ID (from dynamic route)
  const order = orders.find((o) => o.id === params.id)

  // If order not found → show 404-like page
  if (!order) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-primary mb-4">
            Order not found
          </h2>
          <p className="text-brand-muted mb-4">
            The order ID "{params.id}" does not exist.
          </p>
          <Button asChild>
            <Link href="/account/orders">Back to Orders</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  // Get filter values from URL query params (server-side)
  const searchTerm = typeof searchParams.search === "string" ? searchParams.search.toLowerCase() : ""
  const statusFilter = typeof searchParams.status === "string" ? searchParams.status : "all"

  // Filter orders (server-side)
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm)
    const matchesStatus = statusFilter === "all" || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Status badge color helper
  const getStatusColor = (status: typeof order.status) => {
    switch (status) {
      case "Delivered":   return "bg-green-100 text-green-700"
      case "In Transit":  return "bg-blue-100 text-blue-700"
      case "Processing":  return "bg-yellow-100 text-yellow-700"
      case "Cancelled":   return "bg-red-100 text-red-700"
      default:            return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-brand-primary mb-2">
              Order Details
            </h1>
            <p className="text-brand-muted">Track and manage your order</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/account/orders">Back to Orders</Link>
          </Button>
        </div>

        {/* Order Info Card */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-display text-lg font-semibold text-brand-primary">
                  {order.id}
                </h3>
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
              </div>
              <div className="text-sm text-brand-muted space-y-1">
                <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Items: {order.items}</p>
                {order.trackingNumber && <p>Tracking: {order.trackingNumber}</p>}
                <p>Total: ${order.total.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Invoice
              </Button>
            </div>
          </div>
        </Card>

        {/* Filters and search – now using URL params */}
        <Card className="p-6 mb-6">
          <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-muted" />
              <Input
                name="search"
                placeholder="Search by order number..."
                defaultValue={searchTerm}
                className="pl-10"
              />
            </div>

            <Select name="status" defaultValue={statusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit">Apply</Button>
          </form>
        </Card>

        {/* Optional: Show filtered list preview if you want */}
        {filteredOrders.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Matching Orders</h2>
            <div className="grid gap-4">
              {filteredOrders.map((o) => (
                <Link key={o.id} href={`/account/orders/${o.id}`}>
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{o.id}</p>
                        <p className="text-sm text-muted-foreground">{o.date}</p>
                      </div>
                      <Badge className={getStatusColor(o.status)}>{o.status}</Badge>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
