import parcelModel from "../../../../DB/models/parcel.model.js"




export const addParcel = async (req, res, next) => {
    try {

        const { from, to, senderName, recipientName, senderEmail, recipientEmail, wieght, date, senderphone, recipientphone } = req.body
        const parcel = await parcelModel.create(req.body)
        res.status(201).json({ message: "Done", parcel })
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
}

export const getAllParcel = async (req, res, next) => {
    try {
        const parcels = await parcelModel.find().sort({ createdAt: -1 })
        res.status(200).json({ message: "Done", parcels })
    } catch (error) {
        res.status(500).json({ message: "catch error", error })

    }
}

export const getParcelOne = async (req, res, next) => {
    try {
        const {id} = req.params
        // console.log(id);
        if (!id) {
            res.json({ message: "not found Id" })

        }
        const parcel = await parcelModel.findById(id)
        res.status(200).json({ message: "Done", parcel })
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
}

export const updateParcel = async (req, res, next) => {
    try {
        const { id } = req.params
        const parcel = await parcelModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: "Done", parcel })

    } catch (error) {
        res.status(500).json({ message: "catch error", error })

    }
}


export const deleteParcel = async (req, res, next) => {
    try {
        const { id } = req.params
        const parcel = await parcelModel.findByIdAndDelete(id)
        res.status(200).json({ message: "DELETED" })

    } catch (error) {
        res.status(500).json({ message: "catch error", error })

    }
}

export const getUserParcel = async (req, res, next) => {
    try {
        const { email } = req.body
        const parcels = await parcelModel.find({ assignedToEmail: email }).sort({ createdAt: -1 });
        res.status(200).json({ message: "Done", parcels })
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
}