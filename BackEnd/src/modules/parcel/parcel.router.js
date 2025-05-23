import { Router } from "express";
const router = Router();
import * as parcelController from "./controller/parcel.js"
import { auth, authAdmin } from "../../middleWare/auth.middleWare.js";

// add parcel
// router.post("/", auth,parcelController.addParcel)
router.post("/", parcelController.addParcel)


// get all parcel

// router.get("/",auth, authAdmin, parcelController.getAllParcel)
router.get("/", parcelController.getAllParcel)




// get parcel by id
router.get("/:id", parcelController.getParcelOne)


// update parcel
router.put("/:id", parcelController.updateParcel)



// delete parcel
router.delete("/:id", parcelController.deleteParcel)


// get user parcel

router.post("/me", parcelController.getUserParcel)


export default router