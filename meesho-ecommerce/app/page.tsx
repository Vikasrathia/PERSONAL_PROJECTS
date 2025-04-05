import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <CategoryCard
            name="Women's Fashion"
            image="/placeholder.svg?height=200&width=200"
            href="/category/womens-fashion"
          />
          <CategoryCard
            name="Men's Fashion"
            image="/placeholder.svg?height=200&width=200"
            href="/category/mens-fashion"
          />
          <CategoryCard name="Kids Wear" image="/placeholder.svg?height=200&width=200" href="/category/kids-wear" />
          <CategoryCard
            name="Home & Kitchen"
            image="/placeholder.svg?height=200&width=200"
            href="/category/home-kitchen"
          />
          <CategoryCard
            name="Beauty & Health"
            image="/placeholder.svg?height=200&width=200"
            href="/category/beauty-health"
          />
          <CategoryCard name="Electronics" image="/placeholder.svg?height=200&width=200" href="/category/electronics" />
        </div>
      </section>

      <FeaturedProducts />

      <section className="my-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCard
              key={i}
              id={`product-${i}`}
              name={`Product ${i + 1}`}
              price={Math.floor(Math.random() * 2000) + 199}
              image="/placeholder.svg?height=300&width=300"
              rating={Math.floor(Math.random() * 5) + 1}
              reviewCount={Math.floor(Math.random() * 100) + 10}
              discount={Math.floor(Math.random() * 50) + 10}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

