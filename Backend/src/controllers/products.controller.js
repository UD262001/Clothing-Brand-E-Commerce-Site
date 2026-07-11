import {v2 as cloudinary} from 'cloudinary'

// function for add product

import asyncHandler from "../utils/asyncHandler.js";
import productModel from '../models/product.models.js';
import AppError from '../utils/Error.js';

export const addProduct = asyncHandler(async (req, res) => {
    
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body
    
    const image1 = req.files.image1?.[0]
    
    const image2 = req.files.image2?.[0]
    
    const image3 = req.files.image3?.[0]
    
    const image4 = req.files.image4?.[0] 

    
    
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
    
    const imagesUrl = await Promise.all(
        images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image'})
            return result.secure_url
        })
    )
    
    
    const productData = {
        name,
        description,
        category,
        subCategory,
        price: Number(price),
        subCategory,
        bestseller: bestseller === 'true' ? true : false,
        sizes: sizes.split(','),
        image: imagesUrl,
    }
    
    const product = await productModel.create(productData)
    

    return res.status(201).json({
        success: true,
        message:"Product added successfully"
    })
    
})


export const listProduct = asyncHandler(async (req, res) => {
    
    const products = await productModel.find({})

   return res.status(200).json({
        sucess: true,
        message: 'products fetch successfully',
        products
    })
})


export const removeProduct = asyncHandler(async (req, res) => {
    
    const productId = req.params.id

    const product = await productModel.findByIdAndDelete(productId)

    if (!product) {
        throw new AppError('Product not found',404,false);
    }
    
    
    return res.status(200).json({
        sucess: true,
        message:'product deleted succefully'
    })

})


export const singleProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id

    const product = await productModel.findById(productId)

    if (!product) {
        throw new AppError('Product not found',404,false);
    }
    
    
    return res.status(200).json({
        sucess: true,
        message: 'product fetched succefully',
        product
    })
})