import { APIError } from "../utils/apierror.utils.js";
import { asynHandler } from "../utils/asynhandler.utils.js";
import  jwt  from 'jsonwebtoken';
import { User } from "../models/user.model.js";

export  const verifyJWT = asynHandler ( async (req,_,next)=>{
    try {
const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

if(!token){
    throw new APIError("UnAuthorized Requiest ", 404);
}

const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
 const findUser  =  await User.findById(decodedToken._id).select("-password -confirmPassword -refreshToken");

if(!findUser){
    throw new APIError("Invalid Access Token :))" , 404)
}
 req.user = findUser; 
 next()

   } catch (error) {
throw new APIError("Invalid Access Token" , 404)        
    }
});



