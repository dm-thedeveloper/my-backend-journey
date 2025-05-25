import { v2 as Cloudinary } from "cloudinary";
import fs from "node:fs"

          
Cloudinary.config({ 
  cloud_name: 'dfyfvcrkd', 
  api_key: '578227542134946', 
  api_secret: 'k1cuYQ7ahOG38e1UeTQroIQr2qI' 
});



const fileUploadOnCloudinary = async(localPath)=>{
try {
    if( !localPath) return null;
    const response=  await Cloudinary.uploader.upload(localPath,{resource_type:"auto"});
    console.log(`file is uploadedon Cloudinary \n url: ${response.url}`);
    return response;
} catch (error) {
    fs.unlink(localPath);
    return null
}

}

export{fileUploadOnCloudinary}