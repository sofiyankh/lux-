import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
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
              <h1 className="font-display text-4xl font-bold text-brand-primary mb-4">Privacy Policy</h1>
              <p className="text-lg text-brand-muted">Last updated: January 1, 2024</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <p className="text-brand-muted">
                      We collect information you provide directly to us, such as when you create an account, make a
                      purchase, or contact us for support. This may include your name, email address, phone number,
                      shipping address, and payment information.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Usage Information</h3>
                    <p className="text-brand-muted">
                      We automatically collect certain information about your use of our website, including your IP
                      address, browser type, pages visited, and the time and date of your visits.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-brand-muted">
                    <li>• Process and fulfill your orders</li>
                    <li>• Communicate with you about your orders and account</li>
                    <li>• Send you marketing communications (with your consent)</li>
                    <li>• Improve our website and services</li>
                    <li>• Prevent fraud and ensure security</li>
                    <li>• Comply with legal obligations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Information Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties except in
                    the following circumstances:
                  </p>
                  <ul className="space-y-2 text-brand-muted">
                    <li>• With service providers who help us operate our business</li>
                    <li>• When required by law or to protect our rights</li>
                    <li>• In connection with a business transfer or merger</li>
                    <li>• With your explicit consent</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    We implement appropriate security measures to protect your personal information against unauthorized
                    access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                    is 100% secure.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Your Rights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted mb-4">
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <ul className="space-y-2 text-brand-muted">
                    <li>• Access and receive a copy of your personal information</li>
                    <li>• Correct inaccurate or incomplete information</li>
                    <li>• Delete your personal information</li>
                    <li>• Restrict or object to processing</li>
                    <li>• Data portability</li>
                    <li>• Withdraw consent</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Cookies and Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    We use cookies and similar tracking technologies to enhance your browsing experience, analyze
                    website traffic, and personalize content. You can control cookie settings through your browser
                    preferences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-muted">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at
                    privacy@luxefashion.com or through our contact page.
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
