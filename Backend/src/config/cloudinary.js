import { v2 as cloudinary } from 'cloudinary'
import serverConfig from './serverConfig.js'




const connectCloudinary = async () => {
    
    cloudinary.config({
        cloud_name: serverConfig.CLOUDINARY_NAME,
        api_key: serverConfig.CLOUDINARY_API_KEY,
        api_secret:serverConfig.CLOUDINARY_SECRET_KEY
    })

    console.log('Cloudinary Configured');   
}

export default connectCloudinary