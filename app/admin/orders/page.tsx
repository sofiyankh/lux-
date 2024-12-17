"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Truck, RefreshCw, Download, Package } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    customerEmail: "sarah.johnson@email.com",
    date: "2024-01-15",
    status: "Processing",
    paymentStatus: "Paid",
    total: 189.0,
    items: 2,
    shippingMethod: "Standard",
    trackingNumber: null,
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    customerEmail: "michael.chen@email.com",
    date: "2024-01-15",
    status: "Shipped",
    paymentStatus: "Paid",
    total: 275.0,
    items: 1,
    shippingMethod: "Express",
    trackingNumber: "1Z999AA1234567890",
  },
  {
    id: "ORD-003",
    customer: "Emma Rodriguez",
    customerEmail: "emma.rodriguez@email.com",
    date: "2024-01-14",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 125.0,
    items: 3,
    shippingMethod: "Standard",
    trackingNumber: "1Z999AA1234567891",
  },
  {
    id: "ORD-004",
    customer: "James Wilson",
    customerEmail: "james.wilson@email.com",
    date: "2024-01-14",
    status: "Processing",
    paymentStatus: "Paid",
    total: 350.0,
    items: 2,
    shippingMethod: "Express",
    trackingNumber: null,
  },
  {
    id: "ORD-005",
    customer: "Lisa Thompson",
    customerEmail: "lisa.thompson@email.com",
    date: "2024-01-13",
    status: "Cancelled",
    paymentStatus: "Refunded",
    total: 89.0,
    items: 1,
    shippingMethod: "Standard",
    trackingNumber: null,
  },
  {
    id: "ORD-006",
    customer: "David Park",
    customerEmail: "david.park@email.com",
    date: "2024-01-13",
    status: "Pending Payment",
    paymentStatus: "Pending",
    total: 445.0,
    items: 3,
    shippingMethod: "Standard",
    trackingNumber: null,
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "Shipped":
        return <Badge className="bg-yellow-100 text-yellow-800">Shipped</Badge>
      case "Delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      case "Pending Payment":
        return <Badge variant="outline">Pending Payment</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Refunded":
        return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>
      case "Failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and fulfill customer orders</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{orders.filter((o) => o.status === "Processing").length}</p>
            <p className="text-sm text-gray-600">Processing</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{orders.filter((o) => o.status === "Shipped").length}</p>
            <p className="text-sm text-gray-600">Shipped</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{orders.filter((o) => o.status === "Delivered").length}</p>
            <p className="text-sm text-gray-600">Delivered</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              ${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
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
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Pending Payment">Pending Payment</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.shippingMethod}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.customerEmail}</p>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  {order.trackingNumber ? (
                    <div>
                      <p className="text-sm font-mono">{order.trackingNumber}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        Track Package
                      </Button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="h-4 w-4 mr-2" />
                        Mark as Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Truck className="h-4 w-4 mr-2" />
                        Add Tracking
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found matching your criteria.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
