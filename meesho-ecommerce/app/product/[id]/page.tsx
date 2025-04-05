"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Share2, Star, Truck, ShieldCheck, RotateCcw, Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"
import { useToast } from "@/hooks/use-toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { toast } = useToast()

  // Mock product data
  const product = {
    id: params.id,
    name: "Premium Cotton T-Shirt with Embroidered Logo",
    price: 599,
    originalPrice: 999,
    discount: 40,
    rating: 4.5,
    reviewCount: 128,
    description:
      "This premium cotton t-shirt features a comfortable fit with an embroidered logo on the chest. Made from 100% organic cotton, it's perfect for everyday wear and special occasions.",
    features: [
      "100% organic cotton",
      "Embroidered logo",
      "Regular fit",
      "Machine washable",
      "Available in multiple colors",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Grey", "Red"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    stock: 15,
    sku: "TS-1234-BLK",
    brand: "Meesho Essentials",
    category: "Men's Clothing",
    tags: ["t-shirt", "cotton", "men", "casual"],
  }

  // Mock similar products
  const similarProducts = Array.from({ length: 5 }).map((_, i) => ({
    id: `similar-${i}`,
    name: `Similar Product ${i + 1}`,
    price: Math.floor(Math.random() * 1500) + 399,
    image: "/placeholder.svg?height=300&width=300",
    rating: Math.floor(Math.random() * 5) + 1,
    reviewCount: Math.floor(Math.random() * 100) + 10,
    discount: Math.floor(Math.random() * 40) + 10,
  }))

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) x ${quantity} added to your cart`,
    })
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before proceeding to checkout",
        variant: "destructive",
      })
      return
    }

    // Navigate to checkout
    toast({
      title: "Proceeding to checkout",
      description: "You will be redirected to the checkout page",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 mt-4 md:mt-0">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-16 h-16 border rounded ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <motion.div
              className="relative flex-1 aspect-square rounded-lg overflow-hidden bg-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={selectedImage}
            >
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-14 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share product</span>
              </Button>

              {product.discount > 0 && (
                <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">{product.discount}% OFF</Badge>
              )}
            </motion.div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                  <span>{product.rating}</span>
                  <Star className="h-3 w-3 ml-0.5 fill-white" />
                </div>
                <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-green-600">In Stock ({product.stock})</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold">₹{product.price}</span>
              {product.discount > 0 && (
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
              {product.discount > 0 && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>

            <p className="text-sm text-green-600">Free Delivery</p>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="h-10 w-10 rounded-full"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Select Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button key={color} variant="outline" className="px-4">
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="h-10 px-4 flex items-center justify-center border-y">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button className="flex-1 gap-2" variant="outline" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Easy Returns</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Product Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground">Brand</p>
                  <p>{product.brand}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground">Category</p>
                  <p>{product.category}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground">SKU</p>
                  <p>{product.sku}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground">Tags</p>
                  <p>{product.tags.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="prose max-w-none dark:prose-invert">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">{product.rating}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : i < product.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground mt-1">{product.reviewCount} reviews</span>
                </div>

                <div className="flex-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm">{5 - i} stars</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${Math.random() * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button>Write a Review</Button>

              <Separator />

              {/* Sample reviews */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Customer {i + 1}</h4>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                    </span>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                    tincidunt, nisl nisl aliquam nisl.
                  </p>
                  <Separator />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {similarProducts.map((product) => (
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
      </section>
    </div>
  )
}

