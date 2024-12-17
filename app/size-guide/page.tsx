import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, User, Shirt, Package } from "lucide-react"

const womensSizes = [
  { size: "XS", bust: "32-33", waist: "24-25", hips: "34-35", uk: "6", eu: "34" },
  { size: "S", bust: "34-35", waist: "26-27", hips: "36-37", uk: "8", eu: "36" },
  { size: "M", bust: "36-37", waist: "28-29", hips: "38-39", uk: "10", eu: "38" },
  { size: "L", bust: "38-40", waist: "30-32", hips: "40-42", uk: "12", eu: "40" },
  { size: "XL", bust: "42-44", waist: "34-36", hips: "44-46", uk: "14", eu: "42" },
  { size: "XXL", bust: "46-48", waist: "38-40", hips: "48-50", uk: "16", eu: "44" },
]

const mensSizes = [
  { size: "XS", chest: "34-36", waist: "28-30", uk: "34", eu: "44" },
  { size: "S", chest: "36-38", waist: "30-32", uk: "36", eu: "46" },
  { size: "M", chest: "38-40", waist: "32-34", uk: "38", eu: "48" },
  { size: "L", chest: "40-42", waist: "34-36", uk: "40", eu: "50" },
  { size: "XL", chest: "42-44", waist: "36-38", uk: "42", eu: "52" },
  { size: "XXL", chest: "44-46", waist: "38-40", uk: "44", eu: "54" },
]

const shoeSizes = [
  { us: "5", uk: "2.5", eu: "35", cm: "22" },
  { us: "5.5", uk: "3", eu: "35.5", cm: "22.5" },
  { us: "6", uk: "3.5", eu: "36", cm: "23" },
  { us: "6.5", uk: "4", eu: "37", cm: "23.5" },
  { us: "7", uk: "4.5", eu: "37.5", cm: "24" },
  { us: "7.5", uk: "5", eu: "38", cm: "24.5" },
  { us: "8", uk: "5.5", eu: "38.5", cm: "25" },
  { us: "8.5", uk: "6", eu: "39", cm: "25.5" },
  { us: "9", uk: "6.5", eu: "40", cm: "26" },
  { us: "9.5", uk: "7", eu: "40.5", cm: "26.5" },
  { us: "10", uk: "7.5", eu: "41", cm: "27" },
  { us: "10.5", uk: "8", eu: "42", cm: "27.5" },
]

const measurementTips = [
  {
    icon: User,
    title: "Bust/Chest",
    description: "Measure around the fullest part of your bust/chest, keeping the tape parallel to the floor.",
  },
  {
    icon: Ruler,
    title: "Waist",
    description: "Measure around your natural waistline, which is typically the narrowest part of your torso.",
  },
  {
    icon: Shirt,
    title: "Hips",
    description: "Measure around the fullest part of your hips, approximately 8 inches below your waist.",
  },
  {
    icon: Package,
    title: "Length",
    description: "For tops, measure from the highest point of your shoulder down to where you want the garment to end.",
  },
]

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4">
              Size Guide
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-4">
              Find Your Perfect Fit
            </h1>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              Use our comprehensive size guide to ensure the perfect fit for every piece in your wardrobe.
            </p>
          </div>
        </section>

        {/* Measurement Tips */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-brand-primary mb-4">How to Measure</h2>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                Follow these simple steps to get accurate measurements for the best fit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {measurementTips.map((tip) => (
                <Card key={tip.title} className="p-6 text-center border-0 shadow-lg">
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tip.icon className="h-8 w-8 text-brand-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brand-primary mb-3">{tip.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{tip.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Size Charts */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-brand-primary mb-4">Size Charts</h2>
                <p className="text-brand-muted text-lg">All measurements are in inches unless otherwise specified</p>
              </div>

              <Tabs defaultValue="womens" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="womens">Women's</TabsTrigger>
                  <TabsTrigger value="mens">Men's</TabsTrigger>
                  <TabsTrigger value="shoes">Shoes</TabsTrigger>
                </TabsList>

                <TabsContent value="womens">
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-brand-light/50">
                          <tr>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">Size</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">Bust</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">Waist</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">Hips</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">UK</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">EU</th>
                          </tr>
                        </thead>
                        <tbody>
                          {womensSizes.map((size, index) => (
                            <tr key={size.size} className={index % 2 === 0 ? "bg-white" : "bg-brand-light/20"}>
                              <td className="px-6 py-4 font-semibold text-brand-primary">{size.size}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.bust}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.waist}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.hips}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.uk}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.eu}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="mens">
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-brand-light/50">
                          <tr>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">Size</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">Chest</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">Waist</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">UK</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">EU</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mensSizes.map((size, index) => (
                            <tr key={size.size} className={index % 2 === 0 ? "bg-white" : "bg-brand-light/20"}>
                              <td className="px-6 py-4 font-semibold text-brand-primary">{size.size}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.chest}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.waist}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.uk}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.eu}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="shoes">
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-brand-light/50">
                          <tr>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">US</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">UK</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">EU</th>
                            <th className="px-6 py-4 text-left font-display font-semibold text-brand-primary">CM</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shoeSizes.map((size, index) => (
                            <tr key={size.us} className={index % 2 === 0 ? "bg-white" : "bg-brand-light/20"}>
                              <td className="px-6 py-4 font-semibold text-brand-primary">{size.us}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.uk}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.eu}</td>
                              <td className="px-6 py-4 text-brand-muted">{size.cm}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Fit Guide */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-brand-primary mb-4">Fit Guide</h2>
                <p className="text-brand-muted text-lg">Understanding our different fits and silhouettes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6 border-0 shadow-lg text-center">
                  <h3 className="font-display text-xl font-semibold text-brand-primary mb-3">Relaxed Fit</h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-4">
                    Loose, comfortable silhouette with extra room through the body. Perfect for layering and casual
                    wear.
                  </p>
                  <Badge variant="outline">Oversized</Badge>
                </Card>

                <Card className="p-6 border-0 shadow-lg text-center">
                  <h3 className="font-display text-xl font-semibold text-brand-primary mb-3">Regular Fit</h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-4">
                    Classic fit that follows the natural shape of the body without being too tight or loose.
                  </p>
                  <Badge variant="outline">True to Size</Badge>
                </Card>

                <Card className="p-6 border-0 shadow-lg text-center">
                  <h3 className="font-display text-xl font-semibold text-brand-primary mb-3">Slim Fit</h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-4">
                    Tailored silhouette that follows the body's contours closely for a modern, streamlined look.
                  </p>
                  <Badge variant="outline">Fitted</Badge>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-display text-3xl font-bold">Still Unsure About Sizing?</h2>
              <p className="text-lg opacity-90">
                Our styling experts are here to help you find the perfect fit. Book a consultation or reach out to our
                customer service team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-brand-primary hover:bg-white/90 font-semibold">
                  Book Styling Session
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand-primary bg-transparent"
                >
                  Contact Support
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
