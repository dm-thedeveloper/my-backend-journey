import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asynchandler.utils.js";
import { APIError } from "../utils/error.utils.js";
import jwt from "jsonwebtoken"


const veriftJWT = asyncHandler( async(req,_, next)=>{
try {
    
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    // console.log( "Token" , token);
    
    if(!token){
        throw new APIError("UnAuthorized Request " ,404 )}
    const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
    const findUSer = await User.findById(decodedToken._id).select("-password -confirmPassword -refreshToken")
    
    if(!findUSer){
        throw new APIError("Invalid Access Token" , 404)
    }
    req.user = findUSer
    next()
} catch (error) {
    throw new APIError("Authentication Failed !!!!" ,403);}
})

export {veriftJWT}