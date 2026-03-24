"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

export function Carousel({ children, className }: any) {
  const [index, setIndex] = React.useState(0)
  const total = React.Children.count(children)

  const next = () => setIndex((prev) => (prev + 1) % total)
  const prev = () => setIndex((prev) => (prev === 0 ? total - 1 : prev - 1))

  return (
    <div className={cn("relative overflow-hidden", className)}>
      
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {React.Children.map(children, (child) => (
          <div className="w-full flex-shrink-0">{child}</div>
        ))}
      </div>

      <Button onClick={prev} className="absolute left-4 top-1/2 z-30">
        <ChevronLeft />
      </Button>

      <Button onClick={next} className="absolute right-4 top-1/2 z-30">
        <ChevronRight />
      </Button>
    </div>
  )
}