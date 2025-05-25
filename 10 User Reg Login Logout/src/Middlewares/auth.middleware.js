import { asyncHandler } from "../utils/ayncHandler.utils.js";

export const  verifyJWT =  asyncHandler( async (req,res,net)=>{

  const token=  req.cookies?.accesToken || req.header("Authorization")?.replace("Bearer ","");

     
})