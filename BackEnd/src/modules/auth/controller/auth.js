import userModel from "../../../../DB/models/user.model.js";
import { compare, hash } from "../../../utils/hashAndCompare.js";

import jwt from "jsonwebtoken"

export const authModule = (req, res, next) => {
    res.json({ message: "hello from auth" })
}

export const signUp = async (req, res, next) => {
    try {
        const { fullName, email, age, country, address, password, Cpassword } = req.body
        console.log({ fullName, email, age, country, address, password });

        const cheackUser = await userModel.findOne({ email })
        if (cheackUser) {
            return res.status(504).json({ message: "email already exist" })
        }
        if (password != Cpassword) {
            return res.status(503).json({ message: "password not match" })
        }
        const hashPassword = hash({ plainText: password })
        const user = await userModel.create({ fullName, email, age, country, address, password: hashPassword })
        return res.status(201).json({ message: "Done", user })

    } catch (error) {
        return res.status(500).json({ message: "catch error", error })
    }
}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        console.log(user);
        if (!user) {
            return res.json({ message: "in valid -email or password " })
        }
        const isMatch = compare({ plainText: password, hashValue: user.password })
        console.log(isMatch);
        
        if (!isMatch) {
            return res.json({ message: "in valid -email or password " })
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role, FullName: user.fullName }, process.env.SIGN_TOKEN, { expiresIn: "2d" })
        return res.status(200).json({ message: "Done", token })

    } catch (error) {
        return res.status(500).json({ message: "catch error", error: error.message })
    }
}