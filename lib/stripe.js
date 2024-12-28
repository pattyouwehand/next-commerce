import Stripe from "stripe"

// Should use a helper function here to secure the back end. This is not a 100% safe approach
// Check https://www.youtube.com/watch?v=o-fgWea75O4 at 3:37:00

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia'
  //Use latest API version
})

export default stripe