import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY)