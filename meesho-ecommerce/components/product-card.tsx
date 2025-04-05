"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  rating: number
  reviewCount: number
  discount?: number
  className?: string
}

export function ProductCard({ id, name, price, image, rating, reviewCount, discount, className }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const originalPrice = discount ? Math.round(price / (1 - discount / 100)) : price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className={cn("overflow-hidden group h-full", className)}>
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/product/${id}`}>
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={cn("h-4 w-4", isWishlisted ? "fill-red-500 text-red-500" : "")} />
            <span className="sr-only">Add to wishlist</span>
          </Button>

          {discount && <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">{discount}% OFF</Badge>}
        </div>

        <CardContent className="p-4">
          <Link href={`/product/${id}`} className="block">
            <h3 className="font-medium line-clamp-2 mb-1 hover:text-primary transition-colors">{name}</h3>
          </Link>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
              <span>{rating}</span>
              <Star className="h-3 w-3 ml-0.5 fill-white" />
            </div>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">₹{price}</span>
            {discount && <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>}
          </div>

          <p className="text-xs text-green-600 mt-1">Free Delivery</p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full gap-2" size="sm">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

