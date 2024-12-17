import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, RotateCcw, Clock, Shield, Package, Globe, CreditCard, CheckCircle } from "lucide-react"

const shippingOptions = [
  {
    name: "Standard Shipping",
    time: "3-5 business days",
    cost: "Free on orders $200+",
    description: "Our most popular shipping option with reliable delivery",
  },
  {
    name: "Express Shipping",
    time: "1-2 business days",
    cost: "$15",
    description: "Fast delivery for when you need it quickly",
  },
  {
    name: "Next Day Delivery",
    time: "Next business day",
    cost: "$25",
    description: "Available in select metropolitan areas",
  },
  {
    name: "International Shipping",
    time: "7-14 business days",
    cost: "Varies by location",
    description: "We ship to over 50 countries worldwide",
  },
]

const returnSteps = [
  {
    step: "1",
    title: "Initiate Return",
    description: "Log into your account and select the items you'd like to return",
  },
  {
    step: "2",
    title: "Print Label",
    description: "Download and print your prepaid return shipping label",
  },
  {
    step: "3",
    title: "Package Items",
    description: "Pack items in original packaging with tags attached",
  },
  {
    step: "4",
    title: "Ship Back",
    description: "Drop off at any authorized shipping location",
  },
  {
    step: "5",
    title: "Get Refund",
    description: "Receive your refund within 5-7 business days",
  },
]

const internationalCountries = [
  "Canada",
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Austria",
  "Sweden",
  "Norway",
  "Denmark",
  "Australia",
  "New Zealand",
  "Japan",
  "South Korea",
  "Singapore",
  "Hong Kong",
]

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4">
              Shipping & Returns
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-4">
              Delivery & Returns Made Simple
            </h1>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              Fast, reliable shipping and hassle-free returns to ensure your complete satisfaction.
            </p>
          </div>
        </section>

        {/* Shipping & Returns Tabs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="shipping" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-12">
                  <TabsTrigger value="shipping" className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Shipping Information
                  </TabsTrigger>
                  <TabsTrigger value="returns" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Returns & Exchanges
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="shipping" className="space-y-12">
                  {/* Shipping Options */}
                  <div>
                    <h2 className="font-display text-3xl font-bold text-brand-primary mb-8 text-center">
                      Shipping Options
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {shippingOptions.map((option) => (
                        <Card key={option.name} className="p-6 border-0 shadow-lg">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-display text-xl font-semibold text-brand-primary mb-1">
                                {option.name}
                              </h3>
                              <div className="flex items-center gap-2 text-brand-accent">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium">{option.time}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="font-semibold">
                              {option.cost}
                            </Badge>
                          </div>
                          <p className="text-brand-muted text-sm leading-relaxed">{option.description}</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-brand-primary mb-6">Shipping Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Package className="h-5 w-5 text-brand-accent mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-brand-primary mb-1">Order Processing</h4>
                            <p className="text-brand-muted text-sm">
                              Orders placed before 2 PM EST ship the same business day
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-brand-accent mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-brand-primary mb-1">Secure Packaging</h4>
                            <p className="text-brand-muted text-sm">
                              All items are carefully packaged to ensure safe delivery
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-brand-accent mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-brand-primary mb-1">Order Tracking</h4>
                            <p className="text-brand-muted text-sm">
                              Receive tracking information via email once your order ships
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-bold text-brand-primary mb-6">
                        International Shipping
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Globe className="h-5 w-5 text-brand-accent mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-brand-primary mb-1">Global Delivery</h4>
                            <p className="text-brand-muted text-sm">We ship to over 50 countries worldwide</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CreditCard className="h-5 w-5 text-brand-accent mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-brand-primary mb-1">Duties & Taxes</h4>
                            <p className="text-brand-muted text-sm">
                              Additional fees may apply and are the customer's responsibility
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-brand-accent mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-brand-primary mb-1">Delivery Time</h4>
                            <p className="text-brand-muted text-sm">7-14 business days depending on destination</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Countries List */}
                  <div>
                    <h3 className="font-display text-2xl font-bold text-brand-primary mb-6 text-center">
                      Countries We Ship To
                    </h3>
                    <Card className="p-6 border-0 shadow-lg">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {internationalCountries.map((country) => (
                          <div key={country} className="text-brand-muted text-sm">
                            {country}
                          </div>
                        ))}
                      </div>
                      <p className="text-brand-muted text-sm mt-4 text-center">
                        Don't see your country?{" "}
                        <Button variant="link" className="p-0 h-auto text-brand-accent">
                          Contact us
                        </Button>{" "}
                        for availability.
                      </p>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="returns" className="space-y-12">
                  {/* Return Policy */}
                  <div className="text-center mb-12">
                    <h2 className="font-display text-3xl font-bold text-brand-primary mb-4">30-Day Return Policy</h2>
                    <p className="text-brand-muted text-lg max-w-3xl mx-auto">
                      We want you to love your purchase. If you're not completely satisfied, return unworn items within
                      30 days for a full refund.
                    </p>
                  </div>

                  {/* Return Process */}
                  <div>
                    <h3 className="font-display text-2xl font-bold text-brand-primary mb-8 text-center">
                      How to Return
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      {returnSteps.map((step, index) => (
                        <div key={step.step} className="text-center">
                          <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                            {step.step}
                          </div>
                          <h4 className="font-display font-semibold text-brand-primary mb-2">{step.title}</h4>
                          <p className="text-brand-muted text-sm leading-relaxed">{step.description}</p>
                          {index < returnSteps.length - 1 && (
                            <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-brand-light transform translate-x-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Return Conditions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <Card className="p-6 border-0 shadow-lg">
                      <h3 className="font-display text-xl font-bold text-brand-primary mb-4 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        What Can Be Returned
                      </h3>
                      <ul className="space-y-2 text-brand-muted text-sm">
                        <li>• Items in original condition with tags attached</li>
                        <li>• Unworn and unwashed garments</li>
                        <li>• Items returned within 30 days of delivery</li>
                        <li>• Original packaging when possible</li>
                        <li>• Accessories in original condition</li>
                      </ul>
                    </Card>

                    <Card className="p-6 border-0 shadow-lg">
                      <h3 className="font-display text-xl font-bold text-brand-primary mb-4 flex items-center gap-2">
                        <Package className="h-5 w-5 text-brand-accent" />
                        Return Exceptions
                      </h3>
                      <ul className="space-y-2 text-brand-muted text-sm">
                        <li>• Personalized or customized items</li>
                        <li>• Intimate apparel and swimwear</li>
                        <li>• Items damaged by normal wear</li>
                        <li>• Items without original tags</li>
                        <li>• Final sale items (marked as such)</li>
                      </ul>
                    </Card>
                  </div>

                  {/* Exchange Information */}
                  <Card className="p-8 border-0 shadow-lg bg-brand-light/30">
                    <div className="text-center">
                      <h3 className="font-display text-2xl font-bold text-brand-primary mb-4">Exchanges</h3>
                      <p className="text-brand-muted mb-6 max-w-2xl mx-auto">
                        Need a different size or color? We offer free exchanges within the US. Simply return your
                        original item and place a new order for the item you want.
                      </p>
                      <Button className="bg-brand-primary hover:bg-brand-primary/90">Start Exchange</Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-display text-3xl font-bold">Questions About Shipping or Returns?</h2>
              <p className="text-lg opacity-90">
                Our customer service team is here to help with any questions about your order, shipping, or returns
                process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-brand-primary hover:bg-white/90 font-semibold">Contact Support</Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand-primary bg-transparent"
                >
                  Track Your Order
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
