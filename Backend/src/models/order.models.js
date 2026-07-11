import mongoose, { trusted } from "mongoose";

const ordersSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    items: {
        type: Array,
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    address: {
        type: Object,
        required:true
    },
    contact: {
        type: Number,
        required:true
    },
    status: {
        type: String,
        required: true,
        default:'Order Placed'
    },

    paymentMethod: {
        type: String,
        required:true
    },
    payment: {
        type: Boolean,
        required: true,
        default:false
    },
    date: {
        type: Date,
        default:Date.now()
    }

})

const orderModel = mongoose.models.orders || mongoose.model('orders', ordersSchema)

export default orderModel

