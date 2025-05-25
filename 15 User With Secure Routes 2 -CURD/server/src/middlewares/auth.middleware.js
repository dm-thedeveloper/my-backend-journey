import { User } from "../models/user.model.js";
import { APIError } from "../utils/apierror.utils.js";
import { asyncHandler } from "../utils/asynHandler.utils.js";
import  jwt  from 'jsonwebtoken';



export const verifyJWT = asyncHandler( async (req,_,next)=>{
    try {
        
    // Access The refreshToken From cookies || header
    // verify the accesstoken  and get the paylods
    // findUser form verified Payloads _id 
    // create req.user p4eZc vb
    
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    // console.log( "Token : ",token);
    
    if(!token){
        throw new APIError("UnAuthorized Request ")
    }
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decodedToken);
    
    if(!decodedToken){
        throw new APIError("Invalid Access Token")
    }
    
    const findUser = await User.findById(decodedToken._id).select("-password -confirmPassword -refreshToken")
    // console.log(findUser);
    req.user = findUser ; 
    next();
    
    } catch (error) {
        throw new APIError(error.message || "Invalid Access Token")
    }
})