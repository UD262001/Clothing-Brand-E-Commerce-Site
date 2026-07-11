import express from 'express'
import { listProduct,addProduct,removeProduct,singleProduct } from '../controllers/products.controller.js'
import upload from '../middlewares/multer.middleware.js'
import adminAuth from '../middlewares/adminAuth.middleware.js'


const router = express.Router()


router.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }]), addProduct)


router.delete('/remove/:id',adminAuth, removeProduct)


router.get('/single/:id', singleProduct)


router.get('/productList', listProduct)



export default router