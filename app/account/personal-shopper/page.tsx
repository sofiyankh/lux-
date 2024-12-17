"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sparkles, Calendar, MessageCircle, Send, Star } from "lucide-react"
import Link from "next/link"

export default function PersonalShopperPage() {
  const [requestForm, setRequestForm] = useState({
    occasion: "",
    budget: "",
    timeline: "",
    description: "",
    preferences: "",
  })

  const [activeTab, setActiveTab] = useState<"request" | "history">("request")

  const previousRequests = [
    {
      id: "PS-001",
      date: "2024-01-10",
      occasion: "Work wardrobe refresh",
      status: "Completed",
      stylist: "Emma Rodriguez",
      rating: 5,
      items: 8,
      budget: "$500-750",
    },
    {
      id: "PS-002",
      date: "2024-01-05",
      occasion: "Date night outfit",
      status: "In Progress",
      stylist: "James Chen",
      items: 3,
      budget: "$200-300",
    },
  ]

  const occasionOptions = [
    { id: "work", label: "Work/Professional" },
    { id: "casual", label: "Casual/Everyday" },
    { id: "date", label: "Date Night" },
    { id: "wedding", label: "Wedding/Event" },
    { id: "vacation", label: "Vacation/Travel" },
    { id: "wardrobe", label: "Wardrobe Refresh" },
  ]

  const budgetOptions = [
    { id: "under-200", label: "Under $200" },
    { id: "200-500", label: "$200 - $500" },
    { id: "500-1000", label: "$500 - $1,000" },
    { id: "1000-plus", label: "$1,000+" },
  ]

  const timelineOptions = [
    { id: "asap", label: "ASAP (24-48 hours)" },
    { id: "week", label: "Within a week" },
    { id: "month", label: "Within a month" },
    { id: "flexible", label: "I'm flexible" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-brand-muted mb-8">
            <Link href="/account" className="hover:text-brand-primary">
              Account
            </Link>
            <span>/</span>
            <span>Personal Shopper</span>
          </nav>

          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-brand-primary to-brand-accent rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-brand-primary">Personal Shopper</h1>
                  <p className="text-brand-muted">Get personalized styling advice from our fashion experts</p>
                </div>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="p-4 text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h3 className="font-semibold text-brand-primary mb-2">1-on-1 Consultation</h3>
                  <p className="text-sm text-brand-muted">Personal styling session with expert stylists</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h3 className="font-semibold text-brand-primary mb-2">Curated Selection</h3>
                  <p className="text-sm text-brand-muted">Hand-picked items based on your preferences</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h3 className="font-semibold text-brand-primary mb-2">Flexible Timeline</h3>
                  <p className="text-sm text-brand-muted">Service available from 24 hours to flexible timing</p>
                </Card>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab("request")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "request"
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-brand-muted hover:text-brand-primary"
                }`}
              >
                New Request
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "history"
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-brand-muted hover:text-brand-primary"
                }`}
              >
                Request History
              </button>
            </div>

            {activeTab === "request" ? (
              /* New Request Form */
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="p-6">
                    <h2 className="font-display text-xl font-semibold text-brand-primary mb-6">
                      Tell us what you need
                    </h2>

                    <div className="space-y-6">
                      {/* Occasion */}
                      <div>
                        <Label className="text-sm font-medium text-brand-primary mb-3 block">
                          What's the occasion?
                        </Label>
                        <RadioGroup
                          value={requestForm.occasion}
                          onValueChange={(value) => setRequestForm((prev) => ({ ...prev, occasion: value }))}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {occasionOptions.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center space-x-2 p-3 border border-brand-light rounded-lg"
                              >
                                <RadioGroupItem value={option.id} id={option.id} />
                                <Label htmlFor={option.id} className="cursor-pointer">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Budget */}
                      <div>
                        <Label className="text-sm font-medium text-brand-primary mb-3 block">What's your budget?</Label>
                        <RadioGroup
                          value={requestForm.budget}
                          onValueChange={(value) => setRequestForm((prev) => ({ ...prev, budget: value }))}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {budgetOptions.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center space-x-2 p-3 border border-brand-light rounded-lg"
                              >
                                <RadioGroupItem value={option.id} id={option.id} />
                                <Label htmlFor={option.id} className="cursor-pointer">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Timeline */}
                      <div>
                        <Label className="text-sm font-medium text-brand-primary mb-3 block">
                          When do you need this?
                        </Label>
                        <RadioGroup
                          value={requestForm.timeline}
                          onValueChange={(value) => setRequestForm((prev) => ({ ...prev, timeline: value }))}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {timelineOptions.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center space-x-2 p-3 border border-brand-light rounded-lg"
                              >
                                <RadioGroupItem value={option.id} id={option.id} />
                                <Label htmlFor={option.id} className="cursor-pointer">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Description */}
                      <div>
                        <Label htmlFor="description" className="text-sm font-medium text-brand-primary mb-3 block">
                          Describe what you're looking for
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Tell us about the specific items you need, the style you're going for, any requirements or preferences..."
                          value={requestForm.description}
                          onChange={(e) => setRequestForm((prev) => ({ ...prev, description: e.target.value }))}
                          className="min-h-[120px]"
                        />
                      </div>

                      {/* Additional Preferences */}
                      <div>
                        <Label htmlFor="preferences" className="text-sm font-medium text-brand-primary mb-3 block">
                          Any specific preferences or requirements?
                        </Label>
                        <Textarea
                          id="preferences"
                          placeholder="Colors to avoid, preferred brands, size considerations, etc."
                          value={requestForm.preferences}
                          onChange={(e) => setRequestForm((prev) => ({ ...prev, preferences: e.target.value }))}
                          className="min-h-[80px]"
                        />
                      </div>

                      <Button className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Request
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">How it works</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-brand-primary text-sm">Submit Request</p>
                          <p className="text-xs text-brand-muted">Tell us what you need</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-brand-primary text-sm">Stylist Match</p>
                          <p className="text-xs text-brand-muted">We assign a personal stylist</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-brand-primary text-sm">Consultation</p>
                          <p className="text-xs text-brand-muted">1-on-1 styling session</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          4
                        </div>
                        <div>
                          <p className="font-medium text-brand-primary text-sm">Curated Selection</p>
                          <p className="text-xs text-brand-muted">Receive personalized picks</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-display text-lg font-semibold text-brand-primary mb-4">Pricing</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-brand-muted">Consultation Fee</span>
                        <span className="font-medium text-brand-primary">$25</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-brand-muted">Rush Service (24h)</span>
                        <span className="font-medium text-brand-primary">+$15</span>
                      </div>
                      <div className="pt-3 border-t">
                        <p className="text-xs text-brand-muted">
                          Consultation fee is credited toward your purchase when you buy $100+ of recommended items.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ) : (
              /* Request History */
              <div className="space-y-6">
                {previousRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-lg font-semibold text-brand-primary">{request.occasion}</h3>
                          <Badge variant={request.status === "Completed" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-brand-muted">
                          Request #{request.id} • {request.date}
                        </p>
                        <p className="text-sm text-brand-muted">Stylist: {request.stylist}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-brand-primary">{request.budget}</p>
                        <p className="text-sm text-brand-muted">{request.items} items</p>
                        {request.rating && (
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < request.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {request.status === "Completed" && (
                        <Button variant="outline" size="sm">
                          Reorder Items
                        </Button>
                      )}
                      {request.status === "In Progress" && (
                        <Button variant="outline" size="sm">
                          Message Stylist
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}

                {previousRequests.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-brand-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="h-12 w-12 text-brand-muted" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-brand-primary mb-4">No requests yet</h2>
                    <p className="text-brand-muted mb-8 max-w-md mx-auto">
                      Start your personalized styling journey with our expert fashion consultants.
                    </p>
                    <Button onClick={() => setActiveTab("request")}>Create First Request</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
