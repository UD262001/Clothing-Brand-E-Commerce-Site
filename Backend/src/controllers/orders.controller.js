import asyncHandler from "../utils/asyncHandler.js";
import orderModel from "../models/order.models.js";
import userModel from "../models/users.models.js";
import AppError from "../utils/Error.js";
import serverConfig from "../config/serverConfig.js";
import { currency, deliveryCharge, stripe } from "../services/payment.service.js";




export const placeOrdersCOD = asyncHandler(async (req, res, next) => {

    const { _id } = req.user
    const {firstName,lastName, address, amount, paymentMethod,contact,cartData } = req.body
    
    await orderModel.create({ userId: _id, address:{...address,firstName,lastName}, amount, paymentMethod, contact, items: cartData })
    
    await userModel.findByIdAndUpdate(_id, { cartData: {} })

    return res.status(201).json({
        success: true,
        message:'Order Placed Successfully'
    })
})



export const placeOrdersStripe = asyncHandler(async (req, res, next) => {

    
    
    const { _id } = req.user
    const { firstName, lastName, address, amount, paymentMethod, contact, cartData } = req.body
    const { origin } = req
    
    
    
   
    
       
    const order = await orderModel.create({ userId: _id, address: { ...address, firstName, lastName }, amount, paymentMethod, contact, items: cartData })
      
    const line_items = order.items.map((item) => ({
        price_data: {
            currency: currency,
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100
        },
        quantity: item.quantity
    }))

    line_items.push({
        price_data: {
            currency: currency,
            product_data: {
                name: 'Delivery Charges'
            },
            unit_amount: deliveryCharge * 100
        },
        quantity: 1
    })
    
    const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${order._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
        line_items,
        mode: 'payment'
    })

    return res.status(200).json({
        success: true,
        session_url: session.url
    })

})

export const verifyStripe = asyncHandler(async (req, res, next) => {
    
    const { orderId, success, userId } = req.body

    if (!orderId) {
        return res.status(400).json({
            success: false,
            message: 'Missing orderId'
        })
    }

    const isSuccessfulPayment = success === true || success === 'true'

    if (isSuccessfulPayment) {
        await orderModel.findByIdAndUpdate(orderId, { payment: true })
        if (userId) {
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
        }
        return res.status(200).json({
            success: true,
            message: 'Payment Done'
        })
    }

    await orderModel.findByIdAndDelete(orderId)

    return res.status(200).json({
        success: false,
        message: 'Payment Failed'
    })
})


export const placeOrdersRazorPay = asyncHandler(async (req, res, next) => {
     const { _id } = req.user
    const { firstName, lastName, address, amount, paymentMethod, contact, cartData } = req.body
  
    
   
    
       
    const order = await orderModel.create({ userId: _id, address: { ...address, firstName, lastName }, amount, paymentMethod, contact, items: cartData })

    const options = {
        amount: amount * 100,
        currency: currency.toUpperCase(),
        receipt:order._id.toString()
    }

    await razorpayInstance.orders.create(options, (error, order) => {
        if (error) {
            throw new AppError(error.message,401,false)
        }

        res.status(200).json({
            success: true,
            order
        })
    })


})




export const verifyRazorpay = asyncHandler(async (req, res, next) => {

    const userId = req.user._id

    const { razorpay_order_id } = req.body
    
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    if (orderInfo.status === 'paid') {
        await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        return res.status(200).json({
            success: true,
            message:'Payment Done'
        })  
    }

    return res.status(401).json({
        success: true,
        message:'Payment Failed'
    })
    
})




export const getUserOrders = asyncHandler(async (req, res, next) => {

    const user = req.user

    const orders = await orderModel.find({ userId : user._id })
    
    res.status(200).json({
        success:true,
        message: 'Orders fetched successfully',
        orders
    })    
})




// admin

export const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await orderModel.find()
    
    res.status(200).json({
        success:true,
        message: 'Orders fetched successfully',
        orders
    })    
})



export const updateOrderStatus = asyncHandler(async (req, res, next) => {

    const { orderId, status } = req.body
    
    await orderModel.findByIdAndUpdate(orderId, { status: status })
    
    res.status(200).json({
        success: true,
        message:'Order Status Updatad'
    })

    
})




