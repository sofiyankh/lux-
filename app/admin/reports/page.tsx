"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  Calendar,
  BarChart3,
} from "lucide-react"

const reportData = {
  salesReport: {
    totalRevenue: 125430,
    totalOrders: 2847,
    averageOrderValue: 44.05,
    conversionRate: 3.2,
    topSellingCategory: "Women's Clothing",
    growth: 18.5,
  },
  inventoryReport: {
    totalProducts: 324,
    lowStockItems: 12,
    outOfStockItems: 3,
    totalValue: 89450,
    turnoverRate: 4.2,
  },
  customerReport: {
    totalCustomers: 5678,
    newCustomers: 234,
    returningCustomers: 1456,
    customerLifetimeValue: 187.5,
    churnRate: 2.1,
  },
}

const monthlyData = [
  { month: "Jan", revenue: 12500, orders: 285, customers: 156 },
  { month: "Feb", revenue: 15200, orders: 342, customers: 189 },
  { month: "Mar", revenue: 18900, orders: 428, customers: 234 },
  { month: "Apr", revenue: 16700, orders: 378, customers: 201 },
  { month: "May", revenue: 21300, orders: 485, customers: 267 },
  { month: "Jun", revenue: 19800, orders: 451, customers: 245 },
]

const topProducts = [
  { name: "Cashmere Blend Sweater", revenue: 18900, units: 89, growth: 15.2 },
  { name: "Silk Midi Dress", revenue: 16750, units: 67, growth: 8.7 },
  { name: "Wool Coat", revenue: 22275, units: 45, growth: -3.2 },
  { name: "Leather Ankle Boots", revenue: 11400, units: 38, growth: 12.1 },
]

export default function ReportsPage() {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Comprehensive business insights and analytics</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-gray-900">Sales Report</h3>
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="font-medium">${reportData.salesReport.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Orders</span>
              <span className="font-medium">{reportData.salesReport.totalOrders.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Order Value</span>
              <span className="font-medium">${reportData.salesReport.averageOrderValue}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm text-gray-600">Growth</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">+{reportData.salesReport.growth}%</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-gray-900">Inventory Report</h3>
            <div className="p-2 rounded-lg bg-blue-50">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Products</span>
              <span className="font-medium">{reportData.inventoryReport.totalProducts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Low Stock</span>
              <Badge className="bg-yellow-100 text-yellow-800">{reportData.inventoryReport.lowStockItems}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Out of Stock</span>
              <Badge className="bg-red-100 text-red-800">{reportData.inventoryReport.outOfStockItems}</Badge>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-sm text-gray-600">Total Value</span>
              <span className="font-medium">${reportData.inventoryReport.totalValue.toLocaleString()}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-gray-900">Customer Report</h3>
            <div className="p-2 rounded-lg bg-purple-50">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Customers</span>
              <span className="font-medium">{reportData.customerReport.totalCustomers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">New Customers</span>
              <span className="font-medium">{reportData.customerReport.newCustomers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Returning</span>
              <span className="font-medium">{reportData.customerReport.returningCustomers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-sm text-gray-600">Avg LTV</span>
              <span className="font-medium">${reportData.customerReport.customerLifetimeValue}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Performance */}
        <Card className="p-6">
          <h3 className="font-display text-xl font-semibold text-gray-900 mb-6">Monthly Performance</h3>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{data.month}</span>
                  <span className="text-gray-600">${data.revenue.toLocaleString()}</span>
                </div>
                <Progress value={(data.revenue / maxRevenue) * 100} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{data.orders} orders</span>
                  <span>{data.customers} customers</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <h3 className="font-display text-xl font-semibold text-gray-900 mb-6">Top Products Performance</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-white">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.units} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                  <div className="flex items-center justify-end mt-1">
                    {product.growth > 0 ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">+{product.growth}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-red-600">{product.growth}%</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Report Templates */}
      <Card className="p-6">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-6">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
            <BarChart3 className="h-6 w-6" />
            <span>Sales Summary</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
            <Package className="h-6 w-6" />
            <span>Inventory Analysis</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
            <Users className="h-6 w-6" />
            <span>Customer Insights</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
            <TrendingUp className="h-6 w-6" />
            <span>Growth Analysis</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
