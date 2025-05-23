import { Schema, model } from "mongoose";


const userSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, age: Number,
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "user", 
        enum: ["user", "Admin"]
    },

}, { timestamps: true })


const userModel = model("user", userSchema)
export default userModel