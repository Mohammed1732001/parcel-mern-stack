import { Schema, model } from "mongoose";


const parcelSchema = new Schema({

    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    recipientName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    recipientEmail: {
        type: String,
        required: true
    },
    wieght: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    note: {
        type: String,
    },
    feedback: {
        type: String,

    },
    status: {
        type: Number,
        default: 0
    },
    senderphone: {
        type: String,
        required: true
    },
    recipientphone: {
        type: String,
        required: true
    },
}, { timestamps: true })


const parcelModel = model("parcel", parcelSchema)
export default parcelModel