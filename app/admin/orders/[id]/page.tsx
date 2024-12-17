"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck, CreditCard, Phone, Mail, Calendar, Printer, MessageSquare } from "lucide-react"

// Mock order data
const mockOrder = {
  id: "ORD-002",
  status: "Shipped",
  paymentStatus: "Paid",
  date: "2024-01-15",
  total: 275.0,
  subtotal: 250.0,
  shipping: 15.0,
  tax: 10.0,
  trackingNumber: "1Z999AA1234567890",
  shippingMethod: "Express Shipping",
  estimatedDelivery: "2024-01-18",
  customer: {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 987-6543",
    avatar: "/professional-man.png",
  },
  shippingAddress: {
    name: "Michael Chen",
    street: "123 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
  },
  billingAddress: {
    name: "Michael Chen",
    street: "123 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
  },
  items: [
    {
      id: "1",
      name: "Silk Midi Dress",
      sku: "SLK-002-M-BLK",
      variant: "Medium, Black",
      price: 275.0,
      quantity: 1,
      image: "/silk-midi-dress.png",
    },
  ],
  timeline: [
    {
      status: "Order Placed",
      date: "2024-01-15 10:30 AM",
      description: "Order received and payment confirmed",
    },
    {
      status: "Processing",
      date: "2024-01-15 2:15 PM",
      description: "Order is being prepared for shipment",
    },
    {
      status: "Shipped",
      date: "2024-01-16 9:00 AM",
      description: "Package shipped via Express Shipping",
    },
  ],
  notes: [],
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [orderStatus, setOrderStatus] = useState(mockOrder.status)
  const [trackingNumber, setTrackingNumber] = useState(mockOrder.trackingNumber)
  const [newNote, setNewNote] = useState("")
  const [notes, setNotes] = useState(mockOrder.notes)

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
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now().toString(),
        text: newNote.trim(),
        author: "Admin",
        date: new Date().toLocaleString(),
      }
      setNotes([...notes, note])
      setNewNote("")
    }
  }

  const updateOrderStatus = () => {
    // Here you would typically update the order status via API
    console.log("Updating order status to:", orderStatus)
    console.log("Tracking number:", trackingNumber)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Order {mockOrder.id}</h1>
            <p className="text-gray-600">Placed on {mockOrder.date}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email Customer
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={updateOrderStatus}>
            Update Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                    <p className="text-sm text-gray-600">{item.variant}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${mockOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${mockOrder.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${mockOrder.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${mockOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          {/* Order Timeline */}
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Order Timeline</h2>
            <div className="space-y-4">
              {mockOrder.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-amber-600 rounded-full" />
                    {index < mockOrder.timeline.length - 1 && <div className="w-px h-8 bg-gray-300 mt-2" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{event.status}</h3>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Customer Notes */}
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Internal Notes</h2>
            <div className="space-y-4">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-900">{note.author}</span>
                      <span className="text-xs text-gray-500">{note.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{note.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No notes added yet.</p>
              )}
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a note about this order..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button variant="outline" size="sm" onClick={addNote} disabled={!newNote.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                {getStatusBadge(mockOrder.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment</span>
                {getPaymentBadge(mockOrder.paymentStatus)}
              </div>
              <Separator />
              <div>
                <Label htmlFor="status">Update Status</Label>
                <Select value={orderStatus} onValueChange={setOrderStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tracking">Tracking Number</Label>
                <Input
                  id="tracking"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                />
              </div>
            </div>
          </Card>

          {/* Customer Information */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Customer</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={mockOrder.customer.avatar || "/placeholder.svg"}
                  alt={mockOrder.customer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{mockOrder.customer.name}</p>
                  <p className="text-sm text-gray-600">Customer ID: {mockOrder.customer.id}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{mockOrder.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{mockOrder.customer.phone}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                <Link href={`/admin/customers/${mockOrder.customer.id}`}>View Customer</Link>
              </Button>
            </div>
          </Card>

          {/* Shipping Information */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Shipping</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">Shipping Address</span>
                </div>
                <div className="text-sm text-gray-600 ml-6">
                  <p>{mockOrder.shippingAddress.name}</p>
                  <p>{mockOrder.shippingAddress.street}</p>
                  <p>
                    {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state} {mockOrder.shippingAddress.zip}
                  </p>
                  <p>{mockOrder.shippingAddress.country}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">Shipping Method</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">{mockOrder.shippingMethod}</p>
              </div>
              {mockOrder.estimatedDelivery && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Estimated Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{mockOrder.estimatedDelivery}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Billing Information */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Billing</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">Billing Address</span>
                </div>
                <div className="text-sm text-gray-600 ml-6">
                  <p>{mockOrder.billingAddress.name}</p>
                  <p>{mockOrder.billingAddress.street}</p>
                  <p>
                    {mockOrder.billingAddress.city}, {mockOrder.billingAddress.state} {mockOrder.billingAddress.zip}
                  </p>
                  <p>{mockOrder.billingAddress.country}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
