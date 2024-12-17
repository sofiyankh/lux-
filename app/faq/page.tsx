import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle } from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    title: "Orders & Shipping",
    faqs: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days. Next-day delivery is available in select areas for orders placed before 2 PM.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free standard shipping on all orders over $200. Express and next-day shipping options are available for an additional fee.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Orders can be modified or cancelled within 1 hour of placement. After that, orders enter our fulfillment process and cannot be changed. Please contact customer service immediately if you need assistance.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for all items in original condition with tags attached. Items must be unworn and unwashed. Return shipping is free for domestic orders.",
      },
      {
        question: "How do I return an item?",
        answer:
          "Log into your account, select the items you'd like to return, and we'll email you a prepaid return label. Package the items and drop them off at any carrier location.",
      },
      {
        question: "Can I exchange an item for a different size?",
        answer:
          "Yes! We offer exchanges for different sizes or colors of the same item, subject to availability. The exchange process is the same as returns.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are processed within 5-7 business days of receiving your returned items. The refund will be credited to your original payment method.",
      },
    ],
  },
  {
    title: "Sizing & Fit",
    faqs: [
      {
        question: "How do I find my size?",
        answer:
          "Check our detailed size guide for measurements and fit information. Each product page also includes specific sizing notes and fit details.",
      },
      {
        question: "What if an item doesn't fit?",
        answer:
          "No problem! You can return or exchange items that don't fit within 30 days. We recommend checking our size guide before ordering to ensure the best fit.",
      },
      {
        question: "Do your clothes run true to size?",
        answer:
          "Our items generally run true to size, but fit can vary by style and brand. Check the product description and size guide for specific fit information.",
      },
    ],
  },
  {
    title: "Account & Payment",
    faqs: [
      {
        question: "Do I need an account to place an order?",
        answer:
          "While you can checkout as a guest, creating an account allows you to track orders, save items to your wishlist, and manage your preferences.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes! We use SSL encryption and secure payment processing to protect your information. We never store your complete credit card details.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Frequently Asked Questions
              </Badge>
              <h1 className="font-display text-4xl font-bold text-brand-primary mb-4">How can we help?</h1>
              <p className="text-lg text-brand-muted mb-8">
                Find answers to common questions about orders, shipping, returns, and more.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-muted" />
                <Input
                  placeholder="Search for answers..."
                  className="pl-10 bg-brand-light/50 border-0 focus-visible:ring-1 focus-visible:ring-brand-accent"
                />
              </div>
            </div>

            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={category.title}>
                  <h2 className="font-display text-2xl font-bold text-brand-primary mb-6">{category.title}</h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border border-brand-light/50 rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-brand-muted">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="mt-16 text-center bg-brand-light/30 rounded-lg p-8">
              <MessageCircle className="h-12 w-12 text-brand-accent mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-brand-primary mb-4">Still need help?</h2>
              <p className="text-brand-muted mb-6">
                Can't find what you're looking for? Our customer service team is here to help.
              </p>
              <Button asChild className="bg-brand-primary hover:bg-brand-primary/90">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
