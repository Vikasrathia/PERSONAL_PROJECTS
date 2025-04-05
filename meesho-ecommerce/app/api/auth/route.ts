import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// This would be replaced with actual database logic
const users = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    name: "John Doe",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create JWT token
    // In a real app, JWT_SECRET would be an environment variable
    const token = jwt.sign({ id: user.id, email: user.email }, "your-jwt-secret", { expiresIn: "7d" })

    // Return user info and token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

