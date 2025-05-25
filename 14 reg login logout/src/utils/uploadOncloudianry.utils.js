import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"; 
import {unlinkSync } from 'node:fs';


dotenv.config ( {path:".env"})

// Cloudinary Configuration
cloudinary.config ( {
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_API_SECRET
})




const uploadOnCloudinary  = async (filePath) =>{

    try {
        
        if(!filePath ) return null;
    const  response  = await cloudinary.uploader.upload(filePath)
unlinkSync(filePath)
console.log(response.url);

return response.url
    } catch (error) {
unlinkSync(filePath)

        console.log("File Not Uploaded " ,error);
        
        return null; 
        
    }
}


export {uploadOnCloudinary}
