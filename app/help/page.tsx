import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Package, CreditCard, RotateCcw, Truck, Users, Ruler, Leaf } from "lucide-react"

const helpCategories = [
  {
    icon: Package,
    title: "Orders & Shipping",
    description: "Track orders, shipping info, and delivery updates",
    count: "12 articles",
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges",
    description: "Return policy, exchange process, and refunds",
    count: "8 articles",
  },
  {
    icon: CreditCard,
    title: "Payment & Billing",
    description: "Payment methods, billing issues, and pricing",
    count: "6 articles",
  },
  {
    icon: Ruler,
    title: "Size Guide",
    description: "Sizing charts, fit guides, and measurements",
    count: "5 articles",
  },
  {
    icon: Users,
    title: "Account & Profile",
    description: "Account settings, profile management, and security",
    count: "7 articles",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Our eco-friendly practices and materials",
    count: "4 articles",
  },
]

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days within the US. Express shipping (1-2 business days) and international shipping options are also available. Free shipping is included on orders over $200.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free within the US, and we provide a prepaid return label with every order.",
  },
  {
    question: "How do I find my size?",
    answer:
      "Use our detailed size guide which includes measurements for each garment. We also offer virtual styling consultations to help you find the perfect fit. If you're between sizes, we generally recommend sizing up.",
  },
  {
    question: "Do you offer alterations?",
    answer:
      "Yes! We partner with skilled tailors in major cities to offer professional alterations. Contact our customer service team to find an authorized tailor near you.",
  },
  {
    question: "Are your materials sustainable?",
    answer:
      "Absolutely. We use certified organic cotton, recycled fibers, and work with suppliers who meet our strict environmental and ethical standards. Each product page details the specific materials used.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, you'll receive a tracking number via email once your order ships. You can also track your order status in your account dashboard or by entering your order number on our tracking page.",
  },
  {
    question: "Do you have physical stores?",
    answer:
      "We have flagship stores in New York, Los Angeles, and London. You can visit for personal styling consultations, try on pieces, or attend our exclusive events. Check our store locator for hours and locations.",
  },
  {
    question: "How do I care for my garments?",
    answer:
      "Each item comes with specific care instructions on the label. Generally, we recommend gentle machine wash or dry cleaning for delicate fabrics. Our customer service team can provide detailed care guidance for specific pieces.",
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4">
              Help Center
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-4">
              How Can We Help You?
            </h1>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto mb-8">
              Find answers to your questions, get support, and learn more about our products and services.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-muted" />
              <Input placeholder="Search for help articles..." className="pl-10 py-3 text-center" />
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-brand-primary text-center mb-12">Browse by Category</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category) => (
                <Card
                  key={category.title}
                  className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-accent/20 transition-colors">
                    <category.icon className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-2">{category.title}</h3>
                  <p className="text-brand-muted text-sm mb-3 leading-relaxed">{category.description}</p>
                  <p className="text-xs text-brand-accent font-medium">{category.count}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-brand-primary mb-4">Frequently Asked Questions</h2>
                <p className="text-brand-muted text-lg">Quick answers to the most common questions</p>
              </div>

              <Card className="border-0 shadow-lg">
                <Accordion type="single" collapsible className="p-6">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-brand-light/50">
                      <AccordionTrigger className="text-left font-display font-semibold text-brand-primary hover:text-brand-accent">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-brand-muted leading-relaxed pt-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-brand-primary mb-4">Still Need Help?</h2>
              <p className="text-brand-muted text-lg mb-8">
                Our customer service team is here to assist you with any questions or concerns.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 border-0 shadow-lg">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-brand-primary mb-2">Live Chat</h3>
                  <p className="text-brand-muted text-sm mb-4">Get instant help</p>
                  <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/90">
                    Start Chat
                  </Button>
                </Card>

                <Card className="p-6 border-0 shadow-lg">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-brand-primary mb-2">Email Support</h3>
                  <p className="text-brand-muted text-sm mb-4">Detailed assistance</p>
                  <Button size="sm" variant="outline">
                    Send Email
                  </Button>
                </Card>

                <Card className="p-6 border-0 shadow-lg">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-6 w-6 text-brand-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-brand-primary mb-2">Phone Support</h3>
                  <p className="text-brand-muted text-sm mb-4">Speak with an expert</p>
                  <Button size="sm" variant="outline">
                    Call Now
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
