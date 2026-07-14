import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import ordersRouter from './routes/order.routes.js'
import cookieParser from 'cookie-parser'


const app = express()

// middlewares

app.use(express.json())
app.use(cors({
  origin: ['https://forever-clothing-six.vercel.app', 'http://localhost:5174'],
  credentials:true
}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())





app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders',ordersRouter)





app.get('/', (req,res) => {
  res.send('Hello from server')  
})



// error handling middleware

app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message:'Page Not Found'
    })
})

app.use((err, req, res, next) => {
  
  return res.status(err.statusCode || 500).json({
    success: err.successStatus || false,
    message: err.message || 'Internal server error',
    ...(err.errorData && { Data: err.errorData }),
  })
})






export default app