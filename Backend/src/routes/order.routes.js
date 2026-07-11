import express from 'express'
import { getAllOrders, getUserOrders, placeOrdersCOD, placeOrdersRazorPay, placeOrdersStripe, updateOrderStatus,verifyRazorpay,verifyStripe } from '../controllers/orders.controller.js'
import adminAuth from '../middlewares/adminAuth.middleware.js'
import { userAuth } from '../middlewares/userAuth.middleware.js'

const router = express.Router()

// Admin Routes

router.get('/list', adminAuth, getAllOrders)

router.put('/status', adminAuth, updateOrderStatus)


// User Routes

router.post('/placeOrder/cod', userAuth, placeOrdersCOD)

router.post('/placeOrder/stripe', userAuth, placeOrdersStripe)

router.post('/placeOrder/razorpay', userAuth, placeOrdersRazorPay)

router.post('/verifyStripe', userAuth, verifyStripe)

router.post('/verifyRazorpay',userAuth,verifyRazorpay)

router.get('/userOrders', userAuth, getUserOrders)





export default router

