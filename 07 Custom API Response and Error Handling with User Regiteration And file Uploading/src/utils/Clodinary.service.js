import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_SERVICE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const FileUploadOnCloudinary = async (localFilePath)=>{

try {
    // if agar file path nahe hoga to null de ga
if(!localFilePath) return null;

// file upload on cloudinary // 
const response = await cloudinary.uploader.upload(localFilePath,{
 resource_type:"auto",
})

// file is uploaded
console.log(`file is uploaded on cloudinary \n Local Path : ${response.url} \n content type:  ${response.contentType('auto')} `);
 return response;
    
} catch (error) {
// ab yahan hum ne error wale case m jo file error tak punhche ge hum ne use unlink yane delete kardiya apne syystem se he  //  Upload operation Got failed
    fs.unlinkSync(fileURLToPath);
    // or aakhir m null return kar de  ge 
    return null
    
}

}


export {FileUploadOnCloudinary};

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

