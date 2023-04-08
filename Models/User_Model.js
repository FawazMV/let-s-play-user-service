import mongoose from 'mongoose'
const userSchema = new mongoose.Schema
    (
        {
            username: {
                type: String,
                trim: true
            },
            email: {
                type: String,
                unique: true,
                trim: true
            },
            mobile: {
                type: String,
                require: true,
                unique: true,
                trim: true
            },
            password: {
                type: String,
                trim: true,
                minlength: [6]
            },
            
        },
        {
            timestamps: true
        }
    )

const usermodel = mongoose.model('users', userSchema)

export default usermodel