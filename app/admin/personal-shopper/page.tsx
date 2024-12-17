"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sparkles, MessageSquare, Clock, CheckCircle, XCircle, MoreHorizontal, Send, User, Search } from "lucide-react"

const personalShopperRequests = [
  {
    id: "PS-001",
    customer: "Sarah Johnson",
    customerEmail: "sarah.johnson@email.com",
    requestDate: "2024-01-15",
    status: "Active",
    priority: "High",
    budget: "$500-1000",
    occasion: "Business Meeting",
    preferences: "Professional, modern, neutral colors",
    assignedShopper: "Emma Style",
    lastUpdate: "2024-01-16",
  },
  {
    id: "PS-002",
    customer: "Michael Chen",
    customerEmail: "michael.chen@email.com",
    requestDate: "2024-01-14",
    status: "Completed",
    priority: "Medium",
    budget: "$200-500",
    occasion: "Casual Weekend",
    preferences: "Comfortable, trendy, earth tones",
    assignedShopper: "Alex Fashion",
    lastUpdate: "2024-01-15",
  },
  {
    id: "PS-003",
    customer: "Emma Rodriguez",
    customerEmail: "emma.rodriguez@email.com",
    requestDate: "2024-01-13",
    status: "Pending",
    priority: "Low",
    budget: "$1000+",
    occasion: "Special Event",
    preferences: "Elegant, sophisticated, bold colors",
    assignedShopper: null,
    lastUpdate: "2024-01-13",
  },
]

export default function PersonalShopperPage() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-blue-100 text-blue-800">Active</Badge>
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const filteredRequests = personalShopperRequests.filter((request) => {
    const matchesSearch =
      request.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Personal Shopper</h1>
          <p className="text-gray-600 mt-1">Manage personalized styling requests and consultations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Assign Shopper
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
            <Sparkles className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{personalShopperRequests.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50">
              <Sparkles className="h-7 w-7 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {personalShopperRequests.filter((r) => r.status === "Active").length}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50">
              <Clock className="h-7 w-7 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {personalShopperRequests.filter((r) => r.status === "Completed").length}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-50">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {personalShopperRequests.filter((r) => r.status === "Pending").length}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-yellow-50">
              <XCircle className="h-7 w-7 text-yellow-600" />
            </div>
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
                placeholder="Search requests..."
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
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Requests Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Occasion</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned Shopper</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{request.id}</p>
                    <p className="text-sm text-gray-500">{request.requestDate}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{request.customer}</p>
                    <p className="text-sm text-gray-500">{request.customerEmail}</p>
                  </div>
                </TableCell>
                <TableCell>{request.occasion}</TableCell>
                <TableCell>{request.budget}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                <TableCell>
                  {request.assignedShopper ? (
                    <span className="text-sm text-gray-900">{request.assignedShopper}</span>
                  ) : (
                    <span className="text-sm text-gray-500">Unassigned</span>
                  )}
                </TableCell>
                <TableCell>{request.lastUpdate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" />
                        Assign Shopper
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Quick Response */}
      <Card className="p-6">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">Quick Response</h3>
        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a request to respond to" />
            </SelectTrigger>
            <SelectContent>
              {personalShopperRequests
                .filter((r) => r.status === "Active" || r.status === "Pending")
                .map((request) => (
                  <SelectItem key={request.id} value={request.id}>
                    {request.id} - {request.customer}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Textarea placeholder="Type your response..." className="min-h-[100px]" />
          <div className="flex justify-end">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Send className="h-4 w-4 mr-2" />
              Send Response
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
