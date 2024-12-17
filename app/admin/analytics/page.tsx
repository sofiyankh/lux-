"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, ShoppingCart, Users, Eye, Download } from "lucide-react"

const analyticsData = {
  revenue: {
    current: 45231,
    previous: 37650,
    change: 20.1,
    trend: "up",
  },
  orders: {
    current: 1234,
    previous: 1071,
    change: 15.3,
    trend: "up",
  },
  customers: {
    current: 2456,
    previous: 2270,
    change: 8.2,
    trend: "up",
  },
  conversionRate: {
    current: 3.2,
    previous: 2.8,
    change: 14.3,
    trend: "up",
  },
}

const trafficSources = [
  { name: "Organic Search", visitors: 12450, percentage: 45, color: "#10B981" },
  { name: "Direct", visitors: 8320, percentage: 30, color: "#F59E0B" },
  { name: "Social Media", visitors: 4160, percentage: 15, color: "#EF4444" },
  { name: "Email", visitors: 2080, percentage: 7, color: "#8B5CF6" },
  { name: "Paid Ads", visitors: 832, percentage: 3, color: "#06B6D4" },
]

const topPages = [
  { page: "/", views: 15420, bounceRate: 32 },
  { page: "/collections/women", views: 8930, bounceRate: 28 },
  { page: "/collections/men", views: 6540, bounceRate: 35 },
  { page: "/products/cashmere-sweater", views: 4320, bounceRate: 22 },
  { page: "/sale", views: 3210, bounceRate: 45 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed insights into your store performance</p>
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
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${analyticsData.revenue.current.toLocaleString()}</p>
              <div className="flex items-center mt-3">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+{analyticsData.revenue.change}%</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-green-50">
              <DollarSign className="h-7 w-7 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analyticsData.orders.current.toLocaleString()}</p>
              <div className="flex items-center mt-3">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+{analyticsData.orders.change}%</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50">
              <ShoppingCart className="h-7 w-7 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analyticsData.customers.current.toLocaleString()}
              </p>
              <div className="flex items-center mt-3">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+{analyticsData.customers.change}%</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-purple-50">
              <Users className="h-7 w-7 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analyticsData.conversionRate.current}%</p>
              <div className="flex items-center mt-3">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+{analyticsData.conversionRate.change}%</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-orange-50">
              <Eye className="h-7 w-7 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Sources */}
        <Card className="p-6">
          <h3 className="font-display text-xl font-semibold text-gray-900 mb-6">Traffic Sources</h3>
          <div className="space-y-6">
            {trafficSources.map((source) => (
              <div key={source.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-sm font-medium text-gray-900">{source.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{source.visitors.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 ml-2">{source.percentage}%</span>
                  </div>
                </div>
                <Progress value={source.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Top Pages */}
        <Card className="p-6">
          <h3 className="font-display text-xl font-semibold text-gray-900 mb-6">Top Pages</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{page.page}</p>
                    <p className="text-sm text-gray-600">{page.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={page.bounceRate < 30 ? "default" : page.bounceRate < 40 ? "secondary" : "outline"}>
                    {page.bounceRate}% bounce
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
