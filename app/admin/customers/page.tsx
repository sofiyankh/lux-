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
import { Search, MoreHorizontal, Eye, Mail, Ban, Download } from "lucide-react"

const customers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    totalOrders: 12,
    totalSpent: 2340.0,
    lastOrder: "2024-01-15",
    joinDate: "2023-06-15",
    location: "New York, NY",
    avatar: "/professional-woman-diverse.png",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    totalOrders: 8,
    totalSpent: 1890.0,
    lastOrder: "2024-01-12",
    joinDate: "2023-08-22",
    location: "San Francisco, CA",
    avatar: "/professional-man.png",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    status: "VIP",
    totalOrders: 25,
    totalSpent: 5670.0,
    lastOrder: "2024-01-14",
    joinDate: "2022-12-10",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 321-0987",
    status: "Inactive",
    totalOrders: 3,
    totalSpent: 450.0,
    lastOrder: "2023-11-20",
    joinDate: "2023-09-05",
    location: "Chicago, IL",
    avatar: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "+1 (555) 654-3210",
    status: "Suspended",
    totalOrders: 2,
    totalSpent: 180.0,
    lastOrder: "2023-10-15",
    joinDate: "2023-10-01",
    location: "Miami, FL",
    avatar: "/placeholder.svg",
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "VIP":
        return <Badge className="bg-purple-100 text-purple-800">VIP</Badge>
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "Suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer base and relationships</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Send Newsletter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            <p className="text-sm text-gray-600">Total Customers</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{customers.filter((c) => c.status === "Active").length}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{customers.filter((c) => c.status === "VIP").length}</p>
            <p className="text-sm text-gray-600">VIP Members</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
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
                placeholder="Search customers..."
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
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="totalSpent">Total Spent</SelectItem>
              <SelectItem value="totalOrders">Total Orders</SelectItem>
              <SelectItem value="joinDate">Join Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Customers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={customer.avatar || "/placeholder.svg"}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-500">Joined {customer.joinDate}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm text-gray-900">{customer.email}</p>
                    <p className="text-sm text-gray-500">{customer.phone}</p>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/customers/${customer.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Ban className="h-4 w-4 mr-2" />
                        Suspend Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No customers found matching your criteria.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
