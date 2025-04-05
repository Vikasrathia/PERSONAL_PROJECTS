import { loadStripe } from "@stripe/stripe-js"

// Initialize Stripe with your publishable key
// In a real app, this would come from an environment variable
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder")

// Create a checkout session
export async function createCheckoutSession(items: any[]) {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    })

    const { sessionId } = await response.json()

    // Redirect to Stripe Checkout
    const stripe = await stripePromise
    const { error } = await stripe!.redirectToCheckout({ sessionId })

    if (error) {
      console.error("Stripe checkout error:", error)
      throw new Error(error.message)
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}

