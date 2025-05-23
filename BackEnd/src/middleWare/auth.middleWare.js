import jwt from "jsonwebtoken"
import userModel from "../../DB/models/user.model.js";

const auth = async (req, res, next) => {
    try {
        const { token } = req.headers
        // console.log(token);


        if (!token) {
            return res.json({ message: "Token is required" })
        }
        const decoded = jwt.verify(token, process.env.SIGN_TOKEN)
        if (!decoded?.id || !decoded?.role) {
            return res.json({ message: "in valid token payRool" })
        }
        // console.log(decoded);

        const authUser = await userModel.findById(decoded.id).select("fullName email _id role")
        if (!authUser) {
            return res.json({ message: "Not Rigister Account" })
        }
        req.user = authUser
        return next()
    } catch (error) {
        return res.status(500).json({ message: "Catch Error", error: error.message })
    }
};

const authAdmin = async (req, res, next) => {
    try {
        const { role, id } = req.user
        const user = await userModel.findOne({ role: "user" })
        if (role == "user") {
            return res.status(403).json({ message: "Not Admin" })
        }
        next()

    } catch (error) {
        return res.status(500).json({ message: "Catch Error", error: error.message })

    }
}

export { auth, authAdmin }