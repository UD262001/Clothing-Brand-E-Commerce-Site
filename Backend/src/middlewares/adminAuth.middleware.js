import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from '../utils/asyncHandler.js'
import AppError from '../utils/Error.js'
import serverConfig from '../config/serverConfig.js'


const adminAuth = asyncHandler(async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        throw new AppError('Unauthorized',401,false)
    }

    const decoded = jwt.verify(token, serverConfig.JWT_ACCESS_SECRET)
    
    const [email, password] = decoded.credentials.split('_')
    
    if (email === serverConfig.ADMIN_EMAIL && password === serverConfig.ADMIN_PASSWORD) {
       return next()
    }


    throw new AppError('Unauthorized',401,false)   
    
})

export default adminAuth






