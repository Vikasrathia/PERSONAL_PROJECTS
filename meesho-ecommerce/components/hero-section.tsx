"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "Summer Collection 2023",
      description: "Discover the latest trends for the season",
      cta: "Shop Now",
      link: "/category/summer",
    },
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "Up to 70% Off",
      description: "End of season sale. Limited time offer",
      cta: "View Deals",
      link: "/sale",
    },
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "New Arrivals",
      description: "Be the first to shop our newest styles",
      cta: "Explore",
      link: "/new-arrivals",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="relative overflow-hidden rounded-lg h-[300px] sm:h-[400px] md:h-[500px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-lg text-white"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
                <p className="text-lg md:text-xl mb-6">{slides[currentSlide].description}</p>
                <Button size="lg" asChild>
                  <a href={slides[currentSlide].link}>{slides[currentSlide].cta}</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 backdrop-blur-sm text-white hover:bg-background/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 backdrop-blur-sm text-white hover:bg-background/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

