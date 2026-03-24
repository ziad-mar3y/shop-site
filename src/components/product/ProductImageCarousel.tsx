"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductImageCarousel({ images, title }: any) {
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) {
    return <div className="bg-gray-200 h-64 flex items-center justify-center">No image</div>
  }

  const safeIndex = index % images.length

  return (
    <div className="relative h-64 overflow-hidden group">

      <Image
        src={images[safeIndex]}
        alt={title}
        fill
        className="object-cover"
      />

      {images.length > 1 && (
        <>
          <Button
            onClick={() => setIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
            className="absolute left-2 top-1/2 z-20 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft />
          </Button>

          <Button
            onClick={() => setIndex(prev => (prev + 1) % images.length)}
            className="absolute right-2 top-1/2 z-20 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight />
          </Button>
        </>
      )}
    </div>
  )
}