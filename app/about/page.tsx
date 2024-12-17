import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Award, Leaf, Heart } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Heart,
    title: "Craftsmanship",
    description: "Every piece is meticulously crafted with attention to detail and quality that lasts.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We're committed to ethical practices and sustainable materials for a better future.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building connections through shared values of style, quality, and conscious living.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Pursuing perfection in every aspect, from design to customer experience.",
  },
]

const team = [
  {
    name: "Elena Rodriguez",
    role: "Creative Director",
    image: "/team-elena.png",
    bio: "Former Vogue editor with 15 years in luxury fashion",
  },
  {
    name: "Marcus Chen",
    role: "Head of Design",
    image: "/team-marcus.png",
    bio: "Award-winning designer from Milan's fashion houses",
  },
  {
    name: "Sofia Andersson",
    role: "Sustainability Lead",
    image: "/team-sofia.png",
    bio: "Environmental advocate and textile innovation expert",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <Image src="/about-hero-atelier.png" alt="Our Atelier" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-4 max-w-3xl px-4">
              <Badge variant="outline" className="border-white text-white bg-white/10">
                Our Story
              </Badge>
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                Crafting Tomorrow's Classics
              </h1>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                Founded on the belief that true luxury lies in timeless design, ethical practices, and exceptional
                craftsmanship
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary leading-tight">
                  A Vision Born from Passion
                </h2>
                <div className="space-y-4 text-brand-muted text-lg leading-relaxed">
                  <p>
                    In 2018, we began with a simple yet profound question: What if fashion could be both beautiful and
                    responsible? This inquiry led us on a journey to create clothing that honors both the wearer and the
                    world we share.
                  </p>
                  <p>
                    Our founders, united by their love for exceptional design and commitment to sustainability, set out
                    to challenge the industry's status quo. Every collection since has been a testament to the belief
                    that luxury and ethics are not mutually exclusive.
                  </p>
                  <p>
                    Today, we continue to push boundaries, working with artisans worldwide to create pieces that tell
                    stories of heritage, innovation, and hope for a more conscious future.
                  </p>
                </div>
                <Button className="bg-brand-primary hover:bg-brand-primary/90">
                  Explore Our Collections
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/founder-story-image.png"
                  alt="Our Founders"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-brand-light/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary mb-4">Our Values</h2>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                The principles that guide every decision, from design to delivery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="p-6 text-center border-0 shadow-lg">
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-brand-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-brand-primary mb-3">{value.title}</h3>
                  <p className="text-brand-muted leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-primary mb-4">Meet Our Team</h2>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto">The creative minds behind every collection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card key={member.name} className="overflow-hidden border-0 shadow-lg">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-brand-primary mb-1">{member.name}</h3>
                    <p className="text-brand-accent font-medium mb-3">{member.role}</p>
                    <p className="text-brand-muted text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold">Join Our Journey</h2>
              <p className="text-lg opacity-90 leading-relaxed">
                Be part of a community that values quality, sustainability, and timeless style. Discover pieces that
                will become treasured parts of your wardrobe for years to come.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-brand-primary hover:bg-white/90 font-semibold">
                  Shop Collections
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand-primary bg-transparent"
                >
                  Visit Our Stores
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
