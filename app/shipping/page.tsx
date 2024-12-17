import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, Globe, Package } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Shipping Information
              </Badge>
              <h1 className="font-display text-4xl font-bold text-brand-primary mb-4">Shipping & Delivery</h1>
              <p className="text-lg text-brand-muted">
                Fast, reliable shipping options to get your order to you quickly and safely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-brand-accent" />
                    Standard Shipping
                  </CardTitle>
                  <CardDescription>Free on orders over $200</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Delivery Time:</strong> 5-7 business days
                    </p>
                    <p>
                      <strong>Cost:</strong> $9.99 (Free over $200)
                    </p>
                    <p>
                      <strong>Tracking:</strong> Included
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-brand-accent" />
                    Express Shipping
                  </CardTitle>
                  <CardDescription>For when you need it fast</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Delivery Time:</strong> 2-3 business days
                    </p>
                    <p>
                      <strong>Cost:</strong> $19.99
                    </p>
                    <p>
                      <strong>Tracking:</strong> Real-time updates
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-brand-accent" />
                    Next Day Delivery
                  </CardTitle>
                  <CardDescription>Available in select areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Delivery Time:</strong> Next business day
                    </p>
                    <p>
                      <strong>Cost:</strong> $29.99
                    </p>
                    <p>
                      <strong>Cutoff:</strong> Order by 2 PM
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-brand-accent" />
                    International
                  </CardTitle>
                  <CardDescription>Worldwide delivery available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Delivery Time:</strong> 7-14 business days
                    </p>
                    <p>
                      <strong>Cost:</strong> Calculated at checkout
                    </p>
                    <p>
                      <strong>Duties:</strong> Customer responsibility
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Processing Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be
                    processed the next business day. You will receive a confirmation email with tracking information
                    once your order has shipped.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Restrictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-brand-muted">
                    <p>• We currently ship to all 50 US states and over 100 countries worldwide</p>
                    <p>• Some items may have shipping restrictions due to size or material</p>
                    <p>• International customers are responsible for customs duties and taxes</p>
                    <p>• PO Box addresses are not accepted for express or next-day delivery</p>
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
