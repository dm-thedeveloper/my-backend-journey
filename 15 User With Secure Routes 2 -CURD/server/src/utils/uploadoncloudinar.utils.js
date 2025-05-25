import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
import { unlinkSync } from 'node:fs';

// Cloudinary Configuration

dotenv.config({path:".env"})


cloudinary.config ( {
    cloud_name :process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY ,
api_secret:process.env.CLOUD_API_SECRET
} );

export const uploadOnCloudinary = async (filePath)=>{
    try {
        if(!filePath) return;
        const response= await cloudinary.uploader.upload(filePath)

        await unlinkSync(filePath)
        return response.url
    } catch (error) {
        console.log("File Not Uploaded .. " , error);
        unlinkSync(filePath)
        return null
        
        
    }
}