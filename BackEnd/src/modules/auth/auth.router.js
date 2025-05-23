import { Router } from "express";

const router = Router();

import * as authController from "./controller/auth.js"


router.get("/" ,authController.authModule )

router.post("/signUp" , authController.signUp) 
router.post("/login" , authController.login) 





export default router