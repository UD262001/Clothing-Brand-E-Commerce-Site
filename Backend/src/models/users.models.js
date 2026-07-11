import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import serverConfig from "../config/serverConfig.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true,
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    cartData: {
        type: Object,
        default:{}
    }

},{minimize:false})


userSchema.statics.createHash = async function (password) {
    return await bcrypt.hash(password,10)
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAuthTokens = function () {
    
    const accessToken = jwt.sign({ _id: this._id }, serverConfig.JWT_ACCESS_SECRET, { expiresIn: '10m' })
    
    const refreshToken = jwt.sign({ _id: this._id }, serverConfig.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    
    return [accessToken, refreshToken]
}

const userModel = mongoose.models.users || mongoose.model('User', userSchema)

export default userModel