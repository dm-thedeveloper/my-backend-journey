import { APIResponse } from "../util/apiresponse.util.js";
import { asyncHandler } from "../util/asynchandler.utis.js";



const Register =  asyncHandler ( async (req,res)=>{


    console.log(req.url);


    res
    .status(200)
    .json(
        new APIResponse("User  Not Registered !!" , "Success" , 202)
    )
    
})

export {Register}