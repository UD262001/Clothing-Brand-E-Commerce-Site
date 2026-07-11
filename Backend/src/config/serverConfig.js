import dotenv from 'dotenv'
dotenv.config()

const envVariable = ['PORT', 'MONGO_URI', 'CLOUDINARY_API_KEY', 'CLOUDINARY_NAME', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'NODE_ENV', 'ADMIN_EMAIL', 'ADMIN_PASSWORD','STRIPE_SECRET_KEY']

envVariable.forEach(key => {
    
    if (!process.env[key]) {
        throw new Error(`${key} not defined`);
    }
});


const serverConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY
}


export default serverConfig