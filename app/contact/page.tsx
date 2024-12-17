import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react"

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our style experts",
    action: "Start Chat",
    available: "Available 9AM-9PM EST",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our customer care team",
    action: "Call (555) 123-4567",
    available: "Mon-Fri 9AM-7PM EST",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    action: "hello@luxefashion.com",
    available: "Response within 24 hours",
  },
  {
    icon: Headphones,
    title: "Styling Consultation",
    description: "Book a personal styling session",
    action: "Schedule Appointment",
    available: "By appointment only",
  },
]

const stores = [
  {
    name: "New York Flagship",
    address: "123 Fifth Avenue, New York, NY 10001",
    phone: "(555) 123-4567",
    hours: "Mon-Sat 10AM-8PM, Sun 12PM-6PM",
  },
  {
    name: "Los Angeles Boutique",
    address: "456 Rodeo Drive, Beverly Hills, CA 90210",
    phone: "(555) 234-5678",
    hours: "Mon-Sat 10AM-7PM, Sun 12PM-5PM",
  },
  {
    name: "London Showroom",
    address: "789 King's Road, Chelsea, London SW3 4RP",
    phone: "+44 20 7123 4567",
    hours: "Mon-Sat 10AM-7PM, Sun 12PM-5PM",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4">
              Get in Touch
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-4">We're Here to Help</h1>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              Whether you need styling advice, have questions about an order, or want to learn more about our
              collections, our team is ready to assist you.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method) => (
                <Card
                  key={method.title}
                  className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-8 w-8 text-brand-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-2">{method.title}</h3>
                  <p className="text-brand-muted text-sm mb-4 leading-relaxed">{method.description}</p>
                  <Button variant="outline" size="sm" className="mb-2 bg-transparent">
                    {method.action}
                  </Button>
                  <p className="text-xs text-brand-muted">{method.available}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Store Info */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-primary mb-6">Send Us a Message</h2>
                <Card className="p-8 border-0 shadow-lg">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-primary mb-2">First Name</label>
                        <Input placeholder="Enter your first name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-primary mb-2">Last Name</label>
                        <Input placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">Email Address</label>
                      <Input type="email" placeholder="Enter your email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">Subject</label>
                      <Input placeholder="What can we help you with?" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-primary mb-2">Message</label>
                      <Textarea placeholder="Tell us more about your inquiry..." rows={6} />
                    </div>
                    <Button className="w-full bg-brand-primary hover:bg-brand-primary/90">Send Message</Button>
                  </form>
                </Card>
              </div>

              {/* Store Locations */}
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-primary mb-6">Visit Our Stores</h2>
                <div className="space-y-6">
                  {stores.map((store) => (
                    <Card key={store.name} className="p-6 border-0 shadow-lg">
                      <h3 className="font-display text-xl font-semibold text-brand-primary mb-3">{store.name}</h3>
                      <div className="space-y-2 text-brand-muted">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-brand-accent mt-0.5 flex-shrink-0" />
                          <p>{store.address}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-brand-accent flex-shrink-0" />
                          <p>{store.phone}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-brand-accent mt-0.5 flex-shrink-0" />
                          <p>{store.hours}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                        Get Directions
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-brand-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-brand-muted text-lg mb-8 max-w-2xl mx-auto">
              Find quick answers to common questions about orders, shipping, returns, and more.
            </p>
            <Button variant="outline" className="bg-transparent">
              View All FAQs
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
