import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middelware.js";


const router = Router();

router.route("/register").post(
    upload.fields([{
        name:"avatar",
        maxCount:1
    },{
        name:"coverImage",
        maxCount:1
    }]),
    registerUser

);


//here we give any name to the router with the default without default we  have to import thw statement as it is 

export default router;
