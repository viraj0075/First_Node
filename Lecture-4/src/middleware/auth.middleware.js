import { ApiError } from "../utils/apiErrors.js";
import { AsyncHandlers } from "../utils/asyncHandlers.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"



export const verifyJWT = AsyncHandlers(async (req, res, next) => {
  //for the web and mobile auth
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
  
  
    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }
  
    const decodedToken  = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
    if(!user){
      throw new ApiError(401,"Invalid Access Token")
    }

    req.user = user;
    next();
  
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid Access Token")
  }

});

