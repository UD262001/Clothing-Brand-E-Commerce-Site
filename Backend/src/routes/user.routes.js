import express from 'express'
import { adminLogin, loginUser, registerUser, updateCart,onRefresh,logout, onRefreshAdmin,adminLogout } from '../controllers/users.controller.js'
import { body } from 'express-validator'
import adminAuth from '../middlewares/adminAuth.middleware.js'
import { userAuth } from '../middlewares/userAuth.middleware.js'

const router = express.Router()


router.post('/register', [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Empty Input')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Username must have at least 2 characters'),
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Empty Input')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password must have at least 6 characters')
], registerUser)

router.post('/login',[
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Empty Input')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password must have at least 6 characters')
],loginUser,adminLogin)


router.get('/refresh', onRefresh)


router.put('/updateCart', userAuth, updateCart)

router.get('/logout',userAuth,logout)

//Admin
router.get('/refreshAdmin', onRefreshAdmin)

router.get('/logoutAdmin',adminAuth,adminLogout)




export default router