import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// In a real app, this would come from an environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const { items } = await request.json()

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: item.price * 100, // Stripe expects amount in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${request.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cart`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}

