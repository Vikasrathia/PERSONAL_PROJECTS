"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("trending")

  const products = {
    trending: Array.from({ length: 5 }).map((_, i) => ({
      id: `trending-${i}`,
      name: `Trending Product ${i + 1}`,
      price: Math.floor(Math.random() * 2000) + 299,
      image: "/placeholder.svg?height=300&width=300",
      rating: Math.floor(Math.random() * 5) + 1,
      reviewCount: Math.floor(Math.random() * 100) + 20,
      discount: Math.floor(Math.random() * 40) + 10,
    })),
    bestsellers: Array.from({ length: 5 }).map((_, i) => ({
      id: `bestseller-${i}`,
      name: `Bestselling Product ${i + 1}`,
      price: Math.floor(Math.random() * 1500) + 399,
      image: "/placeholder.svg?height=300&width=300",
      rating: Math.floor(Math.random() * 5) + 1,
      reviewCount: Math.floor(Math.random() * 200) + 50,
      discount: Math.floor(Math.random() * 30) + 5,
    })),
    featured: Array.from({ length: 5 }).map((_, i) => ({
      id: `featured-${i}`,
      name: `Featured Product ${i + 1}`,
      price: Math.floor(Math.random() * 3000) + 499,
      image: "/placeholder.svg?height=300&width=300",
      rating: Math.floor(Math.random() * 5) + 1,
      reviewCount: Math.floor(Math.random() * 150) + 30,
      discount: Math.floor(Math.random() * 20) + 15,
    })),
  }

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Button variant="outline">View All</Button>
      </div>

      <Tabs defaultValue="trending" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.trending.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
                discount={product.discount}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bestsellers" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
                discount={product.discount}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.featured.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
                discount={product.discount}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

