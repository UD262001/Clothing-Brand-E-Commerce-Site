import mongoose from "mongoose";


const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required:true
    },
    userId: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires:'24h'
    }
})

const blackeListTokenModel = mongoose.models.blackListTokens || mongoose.model('blackListTokens', blackListTokenSchema)

export default blackeListTokenModel