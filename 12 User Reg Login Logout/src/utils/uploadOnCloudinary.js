import { v2 as Cloudinary } from 'cloudinary';
import fs from 'node:fs';

Cloudinary.config({
  cloud_name: 'dfyfvcrkd',
  api_key: '578227542134946',
  api_secret: 'k1cuYQ7ahOG38e1UeTQroIQr2qI',
});


const UploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await Cloudinary.uploader.upload(localFilePath);
    // File uploaded successfully to Cloudinary, now delete local file
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // Handle the error and delete the local file synchronously
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

export { UploadOnCloudinary };
