import userModel from "../models/users.models.js"
import { validationResult } from "express-validator"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/Error.js"
import serverConfig from "../config/serverConfig.js"
import jwt from "jsonwebtoken"
import blackeListTokenModel from "../models/blackeListToken.models.js"





// User Login controller


 

export const loginUser = asyncHandler(async (req,res,next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new AppError('Validation Error',400,false,errors.array())
    }

    const { email, password } = req.body
    
    const user = await userModel.findOne({ email }).select('+password')
    
    
    if (!user) {
        return next()
    }
    


    const isPassMatched = await user.comparePassword(password)
    
    if (!isPassMatched) {
        throw new AppError('Invalid user or password',400,false)
    }

    const [accessToken, refreshToken] = user.generateAuthTokens()
    
    res.cookie('foreverRefresh', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: serverConfig.NODE_ENV === 'production',
        maxAge:7*24*60*60*1000
    })


    
    

    res.status(200).json({
    success: true,
    message: 'Login Successful',
    user,
    accessToken
    })
    
    
})


export const registerUser = asyncHandler(async (req, res,next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new AppError("Validation Error",400,false,errors.array())
    }

    const { name, email, password } = req.body

        const isAlreadyExists = await userModel.findOne({ email })
        
        if (isAlreadyExists) {
            throw new AppError('User already exists',401,false)
    }
    

        const hashPassword = await userModel.createHash(password)

        const user = await userModel.create({
            name,
            email,
            password: hashPassword
        })


        const [accessToken, refreshToken] = user.generateAuthTokens()



        res.cookie('foreverRefresh', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: serverConfig.NODE_ENV === 'production',
        maxAge:7*24*60*60*1000
        })
    
        

        return res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            user,
            accessToken,
        })    

})

export const updateCart = asyncHandler(async (req, res, next) => {
    
    const user = req.user
    const cartData = req.body

    await userModel.findByIdAndUpdate(user._id, { cartData }, { new: true })
    
    return res.status(200).json({
        success: true,
        message:'Cart Updated Successfully'
    })

})

// For user

export const onRefresh = asyncHandler(async (req, res, next) => {
    
    const token = req.cookies.foreverRefresh

    if (!token) {
        throw new AppError('Unauthorized',401,false)
    }
    
    const isBlackListed = await blackeListTokenModel.findOne({ token })
    
    if (isBlackListed) {
        throw new AppError('Unauthorized',401,false)
    }

    const decoded = jwt.verify(token, serverConfig.JWT_REFRESH_SECRET)
    
    const user = await userModel.findById(decoded._id)

    const [accessToken, refreshToken] = user.generateAuthTokens()

    await blackeListTokenModel.create({ token, userId: user._id })
        
    res.cookie('foreverRefresh', refreshToken, {
        httpOnly: true,
        secure: serverConfig.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge:7*24*60*60*1000
    })
    
    return res.status(200).json({
        success: true,
        accessToken,
        user
    })
    
})




export const logout = asyncHandler(async (req,res,next) => {
    
    const { token, user } = req

    await blackeListTokenModel.create({ token, userId: user._id })

    res.clearCookie('foreverRefresh',{
        httpOnly: true,
        sameSite: 'none',
        secure: serverConfig.NODE_ENV === 'production',
        maxAge:7*24*60*60*1000
    })
    
    res.status(200).json({
        success: true,
        message:'Logout Successfully'
    })

})



// admin login controller

export const adminLogin = asyncHandler(async (req, res,next) => {


    const { email, password } = req.body

  
    if (email === serverConfig.ADMIN_EMAIL && password === serverConfig.ADMIN_PASSWORD) {

        const accessToken = jwt.sign({credentials : `${email}_${password}`}, serverConfig.JWT_ACCESS_SECRET, { expiresIn: '10m' })
        
        const refreshToken = jwt.sign({credentials: `${email}_${password}`}, serverConfig.JWT_REFRESH_SECRET, { expiresIn: '7d' })

        res.cookie('adminRefresh', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: serverConfig.NODE_ENV === 'production',
        maxAge:7*24*60*60*1000
    })


        return res.status(200).json({
            success: true,
            message: "Admin login successful",
            token: accessToken,
            role:'admin'

        })
    }
    
    throw new AppError('Invalid email or password',400,false)
})


// For admin 

export const onRefreshAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies.adminRefresh

    if (!token) {
        throw new AppError('Unauthorized',401,false)
    }

    const decoded = jwt.verify(token, serverConfig.JWT_REFRESH_SECRET)

 

    await blackeListTokenModel.create({ token,userId:`${token+'admin'}` })
    
    const [email, password] = decoded.credentials.split('_')

    const newAccessToken = jwt.sign({credentials : `${email}_${password}`}, serverConfig.JWT_ACCESS_SECRET, { expiresIn: '10m' })
        
        const newRefreshToken = jwt.sign({credentials: `${email}_${password}`}, serverConfig.JWT_REFRESH_SECRET, { expiresIn: '7d' })

        res.cookie('adminRefresh', newRefreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: serverConfig.NODE_ENV === 'production',
        maxAge:7*24*60*60*1000
    })


        return res.status(200).json({
            success: true,
            message: "Token Refreshed Succesfully",
            token: newAccessToken,
            role:'admin'

        })
})

export const adminLogout = asyncHandler(async(req, res, next) => {

    const { token, userId } = req
    

    await blackeListTokenModel.create({token,userId})
    
    res.clearCookie('adminRefresh',{
        httpOnly: true,
        sameSite: 'none',
        secure: serverConfig.NODE_ENV === 'production',
        maxAge:7*24*60*60*1000
    })

    res.status(200).json({
        success: false,
        message:'Admin logout succesful'
    })
    
})