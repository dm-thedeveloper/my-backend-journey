import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
import { unlinkSync } from 'node:fs';


dotenv.config({path:".env"})

cloudinary.config( {
    cloud_name:process.env.CLOUD_NAME ,
    api_key:process.env.CLOUD_API_KEY ,
    api_secret:process.env.CLOUD_API_SECRET 
});

const  uploadOnCloudinary = async (filePath)=>{
    try {
if(!filePath) return ;
        const response = await cloudinary.uploader.upload(filePath)
console.log(response.url);

unlinkSync(filePath)
        return response.url
    } catch (error) {

        console.log("File Not Uploaded :)" , error);
unlinkSync(filePath)

        return null;
        
    }
}

const removeFromCloudinary = async(url)=>{
    try {
        const publicId = url.split('/').pop().split('.')[0];;
        const result = await cloudinary.uploader.destroy(url)
        console.log(`File is Deleted For ${publicId}` , result) ;            
        
    } catch (error) {
        
        console.log("File Not Deleted " , error);
        
    }
}

export  {uploadOnCloudinary , removeFromCloudinary}