import jwt from "jsonwebtoken";
import { APIError } from "../utils/apierror.utils.js";
import { asynHandler } from "../utils/asyncHandler.utils.js";
import { User } from "../model/user.model.js";
import dotenv from "dotenv";

dotenv.config({path:".env"})

export const verifyJWT = asynHandler( async (req,_,next) =>{

    try {
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ",""); 
        if(!token){
            throw new APIError("UnAutrized Requiest",403)
        }
     const decodedToken  =   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET )
    
    console.log( "Decode Tokjne", decodedToken);
    
    
     const findUser = await User.findById(decodedToken.id).select("-password -refreshToken")
    
     if(!findUser){
        throw new APIError("Invalid Access Token ,,,");
     }
    
     req.user = findUser;
    
     next() ;
    } catch (error) {
        throw new APIError(error?.message || "Invalid Access Token")
        
        
    }

})