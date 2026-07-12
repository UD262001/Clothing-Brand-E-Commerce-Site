import Stripe from 'stripe'
import RazorPay from 'razorpay'
import serverConfig from '../config/serverConfig.js'

export const currency = 'usd'
export const deliveryCharge = 10

export const stripe = new Stripe(serverConfig.STRIPE_SECRET_KEY)


// export const razorpayInstance = new RazorPay({
//     key_id:serverConfig.RAZORPAY_KEY_ID,
//     key_secret:serverConfig.RAZORPAY_KEY_SECRET
// }) 

