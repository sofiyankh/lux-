"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const salesData = [
  { name: "Jan", sales: 4000, orders: 240 },
  { name: "Feb", sales: 3000, orders: 198 },
  { name: "Mar", sales: 5000, orders: 300 },
  { name: "Apr", sales: 4500, orders: 278 },
  { name: "May", sales: 6000, orders: 389 },
  { name: "Jun", sales: 5500, orders: 349 },
]

const categoryData = [
  { name: "Women", value: 45, color: "#F59E0B" },
  { name: "Men", value: 30, color: "#EF4444" },
  { name: "Accessories", value: 25, color: "#10B981" },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    amount: 189.0,
    status: "Processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    amount: 275.0,
    status: "Shipped",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Emma Rodriguez",
    amount: 125.0,
    status: "Delivered",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "James Wilson",
    amount: 350.0,
    status: "Processing",
    date: "2024-01-14",
  },
]

const topProducts = [
  {
    name: "Cashmere Blend Sweater",
    sales: 89,
    revenue: 16821,
    trend: "up",
  },
  {
    name: "Silk Midi Dress",
    sales: 67,
    revenue: 18425,
    trend: "up",
  },
  {
    name: "Wool Coat",
    sales: 45,
    revenue: 22275,
    trend: "down",
  },
  {
    name: "Leather Ankle Boots",
    sales: 38,
    revenue: 11400,
    trend: "up",
  },
]

export default function AdminDashboard() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Orders",
      value: "1,234",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Customers",
      value: "2,456",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Products",
      value: "124",
      change: "-2.4%",
      trend: "down",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const maxSales = Math.max(...salesData.map((d) => d.sales))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              View Store
            </Link>
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
            Export Data
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                <div className="flex items-center mt-3">
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`p-4 rounded-xl ${metric.bgColor}`}>
                <metric.icon className={`h-7 w-7 ${metric.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-gray-900">Sales Overview</h3>
              <p className="text-sm text-gray-600 mt-1">Monthly sales and order trends</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/analytics">View Details</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {salesData.map((data) => (
              <div key={data.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{data.name}</span>
                  <span className="text-gray-600">${data.sales.toLocaleString()}</span>
                </div>
                <Progress value={(data.sales / maxSales) * 100} className="h-3" />
                <div className="text-xs text-gray-500">{data.orders} orders</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-gray-900">Sales by Category</h3>
              <p className="text-sm text-gray-600 mt-1">Revenue distribution across categories</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/reports">View Report</Link>
            </Button>
          </div>
          <div className="space-y-6">
            {categoryData.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{category.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: category.color,
                      width: `${category.value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-gray-900">Recent Orders</h3>
              <p className="text-sm text-gray-600 mt-1">Latest customer orders</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.amount.toFixed(2)}</p>
                  <Badge
                    variant={
                      order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"
                    }
                    className="text-xs mt-1"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-gray-900">Top Products</h3>
              <p className="text-sm text-gray-600 mt-1">Best performing products this month</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/products">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-white">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                  <div className="flex items-center justify-end mt-1">
                    {product.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
            <Link href="/admin/products/new">
              <Package className="h-6 w-6" />
              <span>Add Product</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
            <Link href="/admin/orders">
              <ShoppingCart className="h-6 w-6" />
              <span>Process Orders</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
            <Link href="/admin/customers">
              <Users className="h-6 w-6" />
              <span>Manage Customers</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
            <Link href="/admin/analytics">
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
