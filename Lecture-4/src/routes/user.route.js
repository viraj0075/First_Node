import { Router } from "express";
import { loginUser, logoutUser, registerUser,refreshAccessToken } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middelware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

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

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/refresh-token").post(verifyJWT , refreshAccessToken)



//here we give any name to the router with the default without default we  have to import thw statement as it is 

export default router;
