"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

export interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
  size?: string
  color?: string
}

export interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
  ratingDistribution: number[]
  className?: string
}

export function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution,
  className,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest")
  const [showAll, setShowAll] = useState(false)

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  const sortedReviews = [...displayedReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      default:
        return 0
    }
  })

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Reviews Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-display text-xl font-semibold text-brand-primary mb-4">Customer Reviews</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-bold text-brand-primary">{averageRating.toFixed(1)}</div>
            <div>
              <div className="flex items-center mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-brand-muted">Based on {totalReviews} reviews</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map((count, index) => {
            const rating = 5 - index
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
            return (
              <div key={rating} className="flex items-center gap-2 text-sm">
                <span className="w-8">{rating}★</span>
                <Progress value={percentage} className="flex-1 h-2" />
                <span className="w-8 text-brand-muted">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-brand-primary">Reviews ({reviews.length})</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="text-sm border border-brand-light rounded-md px-3 py-1 bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <Card key={review.id} className="p-6 border-brand-light">
            <div className="space-y-4">
              {/* Review Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-brand-primary">{review.author}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-brand-muted">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {(review.size || review.color) && (
                  <div className="text-xs text-brand-muted">
                    {review.size && <span>Size: {review.size}</span>}
                    {review.size && review.color && <span> • </span>}
                    {review.color && <span>Color: {review.color}</span>}
                  </div>
                )}
              </div>

              {/* Review Content */}
              <div>
                <h5 className="font-medium text-brand-primary mb-2">{review.title}</h5>
                <p className="text-brand-muted leading-relaxed">{review.content}</p>
              </div>

              {/* Review Actions */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-sm text-brand-muted">Was this helpful?</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    <span className="text-xs">{review.helpful}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="border-brand-light hover:border-brand-accent"
          >
            {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  )
}
