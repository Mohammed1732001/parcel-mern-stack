import userModel from "../../../../DB/models/user.model.js"


export const getAllUser = async (req, res, next) => {
    try {
        const user = await userModel.find().sort({ createdAt: -1 })
        return res.status(200).json({ message: "Done", user })
    } catch (error) {
        return res.status(500).json({ message: "catch error", error: error.message })
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await userModel.findByIdAndDelete(id)
        return res.status(200).json({ message: "Deleted user" })

    } catch (error) {
        return res.status(500).json({ message: "catch error", error })
    }
}
export const getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id)
        return res.status(200).json({ message: "Done" , user })

    } catch (error) {
        return res.status(500).json({ message: "catch error", error })
    }
}
export const UpdateUser = async (req, res, next) => {
  
        try {
            const { id } = req.params
            const user = await userModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json({ message: "Done", user })
    
        } catch (error) {
            res.status(500).json({ message: "catch error", error })
    
        }
  
    
    
}