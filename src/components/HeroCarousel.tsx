"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { apiServices } from "@/apiServices/apiServices"

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // ✅ Add CSS animation to head
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes progressiveScale {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.08);
        }
        100% {
          transform: scale(1.15);
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // ✅ Helper function to limit words
  const limitWords = (text: string, maxWords: number = 4): string => {
    if (!text) return ""
    const words = text.trim().split(/\s+/)
    return words.slice(0, maxWords).join(" ")
  }

  // ✅ Static carousel data with specific images
  const carouselData = [
    {
      id: 0,
      title: limitWords("Summer Collection 2024", 4),
      subtitle: limitWords("Discover latest trends", 4),
      description: limitWords("Up to 50% off on selected items", 4),
      image: "/images/carsoule8.jpg",
      cta: "Shop Now",
      ctaLink: "/products"
    },
    {
      id: 1,
      title: limitWords("Tech Gadgets", 4),
      subtitle: limitWords("Innovation at your fingertips", 4),
      description: limitWords("Cutting-edge technology for modern lifestyle", 4),
      image: "/images/carsoule9.jpg",
      cta: "Explore Tech",
      ctaLink: "/products"
    },
    {
      id: 2,
      title: limitWords("Fashion Forward", 4),
      subtitle: limitWords("Style meets comfort", 4),
      description: limitWords("Premium quality fashion essentials", 4),
      image: "/images/carousel10.jpg",
      cta: "View Collection",
      ctaLink: "/products"
    }
  ]

  const data = carouselData

  // ✅ Autoplay
  useEffect(() => {
    if (isHovering || data.length === 0) return

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % data.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isHovering, data])

  // ✅ Swipe
  const handleTouchStart = (e: any) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: any) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) prev()
    if (diff < -50) next()
  }

  const prev = () => setIndex(index === 0 ? data.length - 1 : index - 1)
  const next = () => setIndex((index + 1) % data.length)

  const current = data[index % data.length]

  return (
    <div
      className="relative w-full h-[600px] lg:h-[80vh] max-h-[800px] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images */}
      {data.map((item, i) => (
        <div key={item.id} className="absolute inset-0">
          <div
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === index 
                ? "opacity-100 scale-100 z-10" 
                : "opacity-0 scale-105 z-0"
            }`}
            style={{ 
              transform: i === index 
                ? 'scale(1)' 
                : 'scale(1.05)'
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              style={{ 
                objectPosition: 'center center',
                animation: i === index ? 'progressiveScale 4s ease-in-out' : 'none'
              }}
              sizes="100vw"
              priority={i === 0}
              unoptimized={item.image.startsWith('http')}
              onError={(e) => {
                console.error("Image failed to load:", item.image)
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
            {/* Green Overlay */}
            <div 
              className="absolute inset-0 bg-green-900 opacity-70 z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(14, 227, 92, 0.3) 0%, rgba(5, 211, 81, 0.2) 50%, rgba(14, 132, 57, 0.3) 100%)',
                animation: i === index ? 'progressiveScale 4s ease-in-out' : 'none'
              }}
            />
          </div>
        </div>
      ))}

      {/* ✅ Fallback background if no images */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 z-0" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-20" />

      {/* Content */}
      <div className="relative z-30 h-full flex items-start lg:items-center px-6 lg:px-12 pt-20 lg:pt-0">
        <div className="text-white max-w-xl lg:max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold">{current.title}</h1>
          <p className="text-lg lg:text-xl mt-2">{current.subtitle}</p>
          <p className="mt-4 text-sm lg:text-base text-white/80">{current.description}</p>

          {/* <Button className="mt-6" asChild>
            <Link href={current.ctaLink}>
              {current.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button> */}
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 z-40">
        <ChevronLeft className="text-white" />
      </button>

      <button onClick={next} className="absolute right-4 top-1/2 z-40">
        <ChevronRight className="text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {data.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full cursor-pointer transition-all ${
              i === index ? "bg-white w-8" : "bg-white/50 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  )
}