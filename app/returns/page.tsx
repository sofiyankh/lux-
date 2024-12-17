import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RotateCcw, Shield, Clock, Package } from "lucide-react"
import Link from "next/link"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Returns & Exchanges
              </Badge>
              <h1 className="font-display text-4xl font-bold text-brand-primary mb-4">Easy Returns</h1>
              <p className="text-lg text-brand-muted">
                Not completely satisfied? We offer hassle-free returns within 30 days of purchase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-brand-accent" />
                  </div>
                  <CardTitle>30-Day Window</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    Return items within 30 days of delivery for a full refund or exchange.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-6 w-6 text-brand-accent" />
                  </div>
                  <CardTitle>Free Return Shipping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">We provide prepaid return labels for all domestic returns.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-brand-accent" />
                  </div>
                  <CardTitle>Quality Guarantee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">If you're not satisfied with the quality, we'll make it right.</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>How to Return an Item</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Start Your Return</h3>
                        <p className="text-brand-muted">
                          Log into your account and select the items you'd like to return.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Print Return Label</h3>
                        <p className="text-brand-muted">We'll email you a prepaid return shipping label.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Package & Ship</h3>
                        <p className="text-brand-muted">
                          Pack items in original packaging and drop off at any carrier location.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Get Your Refund</h3>
                        <p className="text-brand-muted">Refunds are processed within 5-7 business days of receipt.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button asChild className="bg-brand-primary hover:bg-brand-primary/90">
                      <Link href="/account/orders">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Start a Return
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Return Policy Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-brand-muted">
                    <div>
                      <h3 className="font-semibold text-brand-primary mb-2">Eligible Items</h3>
                      <ul className="space-y-1">
                        <li>• Items must be in original condition with tags attached</li>
                        <li>• Items must be unworn and unwashed</li>
                        <li>• Items must be returned within 30 days of delivery</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-primary mb-2">Non-Returnable Items</h3>
                      <ul className="space-y-1">
                        <li>• Intimate apparel and swimwear</li>
                        <li>• Personalized or customized items</li>
                        <li>• Items marked as final sale</li>
                        <li>• Gift cards</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-primary mb-2">Exchanges</h3>
                      <p>We offer exchanges for different sizes or colors of the same item, subject to availability.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
