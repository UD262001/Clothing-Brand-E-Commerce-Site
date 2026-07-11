import serverConfig from "../config/serverConfig.js"
import blackeListTokenModel from "../models/blackeListToken.models.js"
import userModel from "../models/users.models.js"
import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/Error.js"
import jwt from 'jsonwebtoken'

export const  userAuth = asyncHandler(async(req, res, next) => {
    
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        throw new AppError('Unauthorized',401,false)
    }

    const isBlackListed = await blackeListTokenModel.findOne({ token })
    
    if (isBlackListed) {
        throw new AppError('Unauthorized',401,false)
    }

    const decoded = jwt.verify(token, serverConfig.JWT_ACCESS_SECRET)

    const user = await userModel.findById(decoded._id)

    if (!user) {
        throw new AppError('Unauthorized',401,false)
    }

    req.user = user

    req.token = token

    next()

})