import { NextResponse } from "next/server"

// Mock products data
const products = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    description: "Comfortable cotton t-shirt with a modern fit.",
    price: 599,
    originalPrice: 999,
    discount: 40,
    category: "Men's Clothing",
    images: ["/placeholder.svg?height=600&width=600"],
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    description: "Classic slim fit jeans for everyday wear.",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    category: "Men's Clothing",
    images: ["/placeholder.svg?height=600&width=600"],
    rating: 4.2,
    reviewCount: 95,
    stock: 35,
  },
  // More products would be here
]

export async function GET(request: Request) {
  // Get URL and search params
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const query = searchParams.get("query")

  let filteredProducts = [...products]

  // Filter by category if provided
  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by search query if provided
  if (query) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()),
    )
  }

  return NextResponse.json(filteredProducts)
}

export async function POST(request: Request) {
  try {
    const productData = await request.json()

    // Validate product data
    if (!productData.name || !productData.price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 })
    }

    // In a real app, this would save to a database
    const newProduct = {
      id: (products.length + 1).toString(),
      ...productData,
      createdAt: new Date().toISOString(),
    }

    // Add to products array (in a real app, this would be a database operation)
    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

