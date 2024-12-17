import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Legal
              </Badge>
              <h1 className="font-display text-4xl font-bold text-brand-primary mb-4">Terms of Service</h1>
              <p className="text-lg text-brand-muted">Last updated: January 1, 2024</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of
                    this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Use License</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted mb-4">
                    Permission is granted to temporarily download one copy of the materials on Luxe Fashion's website
                    for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer
                    of title, and under this license you may not:
                  </p>
                  <ul className="space-y-2 text-brand-muted">
                    <li>• Modify or copy the materials</li>
                    <li>• Use the materials for any commercial purpose or for any public display</li>
                    <li>• Attempt to reverse engineer any software contained on the website</li>
                    <li>• Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    We strive to provide accurate product information, including descriptions, prices, and availability.
                    However, we do not warrant that product descriptions or other content is accurate, complete,
                    reliable, current, or error-free.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Pricing and Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-brand-muted">
                    <p>
                      All prices are subject to change without notice. We reserve the right to modify or discontinue
                      products at any time.
                    </p>
                    <p>
                      Payment must be received by us before we dispatch your order. We accept major credit cards,
                      PayPal, and other payment methods as indicated on our website.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Shipping and Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    Shipping and return policies are detailed on our dedicated shipping and returns pages. By placing an
                    order, you agree to these policies.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>User Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-brand-muted">
                    <p>
                      When you create an account, you must provide accurate and complete information. You are
                      responsible for maintaining the confidentiality of your account credentials.
                    </p>
                    <p>
                      You agree to notify us immediately of any unauthorized use of your account or any other breach of
                      security.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    In no event shall Luxe Fashion or its suppliers be liable for any damages (including, without
                    limitation, damages for loss of data or profit, or due to business interruption) arising out of the
                    use or inability to use the materials on our website.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    These terms and conditions are governed by and construed in accordance with the laws of [Your
                    Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that state
                    or location.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    If you have any questions about these Terms of Service, please contact us at legal@luxefashion.com
                    or through our contact page.
                  </p>
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
