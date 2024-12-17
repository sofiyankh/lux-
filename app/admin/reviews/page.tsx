"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Flag, Eye, MoreHorizontal, Search, Filter } from "lucide-react"

const reviews = [
  {
    id: "REV-001",
    product: "Cashmere Blend Sweater",
    customer: "Sarah Johnson",
    rating: 5,
    title: "Perfect for professional settings",
    content:
      "This sweater is exactly what I was looking for. The quality is exceptional and the fit is perfect. Highly recommend!",
    date: "2024-01-15",
    status: "Published",
    helpful: 12,
    reported: false,
    verified: true,
  },
  {
    id: "REV-002",
    product: "Silk Midi Dress",
    customer: "Emma Rodriguez",
    rating: 4,
    title: "Beautiful dress, runs small",
    content: "Love the fabric and design, but I had to size up. The color is gorgeous and the quality is great.",
    date: "2024-01-14",
    status: "Published",
    helpful: 8,
    reported: false,
    verified: true,
  },
  {
    id: "REV-003",
    product: "Wool Coat",
    customer: "Michael Chen",
    rating: 2,
    title: "Not as described",
    content:
      "The coat arrived with loose threads and the color was different from the photos. Disappointed with the quality.",
    date: "2024-01-13",
    status: "Pending",
    helpful: 3,
    reported: true,
    verified: false,
  },
  {
    id: "REV-004",
    product: "Leather Ankle Boots",
    customer: "Lisa Thompson",
    rating: 5,
    title: "Amazing quality and comfort",
    content:
      "These boots are incredibly comfortable and well-made. I've been wearing them daily and they still look brand new.",
    date: "2024-01-12",
    status: "Published",
    helpful: 15,
    reported: false,
    verified: true,
  },
]

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Hidden":
        return <Badge className="bg-red-100 text-red-800">Hidden</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 mt-1">Manage customer reviews and feedback</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="h-4 w-4 mr-2" />
            Reported Reviews
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{reviews.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50">
              <MessageSquare className="h-7 w-7 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                {renderStars(Math.round(averageRating))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-yellow-50">
              <Star className="h-7 w-7 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {reviews.filter((r) => r.status === "Published").length}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-50">
              <ThumbsUp className="h-7 w-7 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {reviews.filter((r) => r.status === "Pending").length}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-yellow-50">
              <ThumbsDown className="h-7 w-7 text-yellow-600" />
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
                placeholder="Search reviews..."
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
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Hidden">Hidden</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Reviews Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Review</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Helpful</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="font-medium text-gray-900 truncate">{review.title}</p>
                    <p className="text-sm text-gray-600 truncate">{review.content}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {review.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                      {review.reported && <Badge className="bg-red-100 text-red-800 text-xs">Reported</Badge>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{review.product}</TableCell>
                <TableCell>{review.customer}</TableCell>
                <TableCell>{renderStars(review.rating)}</TableCell>
                <TableCell>{getStatusBadge(review.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{review.helpful}</span>
                  </div>
                </TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Review
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Hide Review
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
