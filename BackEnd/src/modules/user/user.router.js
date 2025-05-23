import { Router } from "express";
import * as userController from "./controller/user.js"
import { auth, authAdmin } from "../../middleWare/auth.middleWare.js";
const router = Router();



router.get("/",userController.getAllUser)
router.get("/:id",userController.getOneUser)
router.delete("/:id", userController.deleteUser)
router.put("/:id", userController.UpdateUser)




export default router