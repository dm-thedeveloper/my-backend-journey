import { v2 as cloudinary } from "cloudinary";
import  dotenv  from 'dotenv';
import { unlinkSync } from 'node:fs';



dotenv.config({path:".env"})


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})




const UploadOnCloudinary = async (path) =>{
try {

if(!path) return;


    const response = await cloudinary.uploader.upload(path)
    console.log(response.url);
    unlinkSync(path)
    return response.url
    
} catch (error) {
    unlinkSync(path)

    console.log("File Not Uploaded" + error);
}


};

export {UploadOnCloudinary}