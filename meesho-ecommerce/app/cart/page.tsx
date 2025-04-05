"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      price: 599,
      originalPrice: 999,
      quantity: 2,
      size: "L",
      color: "Black",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      price: 899,
      originalPrice: 1299,
      quantity: 1,
      size: "32",
      color: "Blue",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "3",
      name: "Casual Sneakers",
      price: 1299,
      originalPrice: 1999,
      quantity: 1,
      size: "UK 8",
      color: "White",
      image: "/placeholder.svg?height=200&width=200",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const discount = cartItems.reduce((total, item) => total + (item.originalPrice - item.price) * item.quantity, 0)

  const shipping = subtotal > 999 ? 0 : 99

  const total = subtotal + shipping

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "You will be redirected to the payment page",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative w-full sm:w-24 h-24 bg-muted rounded-md overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <div>
                              <Link
                                href={`/product/${item.id}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {item.name}
                              </Link>
                              <div className="text-sm text-muted-foreground mt-1">
                                <span>Size: {item.size}</span>
                                <span className="mx-2">•</span>
                                <span>Color: {item.color}</span>
                              </div>
                            </div>

                            <div className="flex flex-col items-start sm:items-end">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">₹{item.price}</span>
                                {item.originalPrice > item.price && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-green-600">
                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                            <div className="flex items-center mb-2 sm:mb-0">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <div className="h-8 w-10 flex items-center justify-center border-y">{item.quantity}</div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <div className="text-xs text-muted-foreground">* Free shipping on orders above ₹999</div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" onClick={handleCheckout}>
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Have a coupon?</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button variant="outline" className="shrink-0">
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

