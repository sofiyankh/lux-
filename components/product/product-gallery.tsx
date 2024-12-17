"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

export interface ProductGalleryProps {
  images: string[]
  alt: string
  className?: string
}

export function ProductGallery({ images, alt, className }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-light/20">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative h-full cursor-zoom-in group">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <ZoomIn className="h-4 w-4 text-brand-primary" />
                </div>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
            {/* Added DialogTitle for accessibility */}
            <DialogTitle className="sr-only">Product Image Preview</DialogTitle>

            <div className="relative h-full">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt={alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-10 w-10 p-0 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 h-10 w-10 p-0 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                index === currentImage ? "border-brand-accent" : "border-transparent hover:border-brand-light"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${alt} view ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 12vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}