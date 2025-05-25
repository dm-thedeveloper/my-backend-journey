import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'node:fs';
import {unlink} from "node:fs/promises";


// Configure Cloudinary with your credentials
cloudinary.config({ 
    cloud_name: 'dfyfvcrkd', 
    api_key: '578227542134946', 
    api_secret: 'k1cuYQ7ahOG38e1UeTQroIQr2qI' 
});

// Function to upload an image to Cloudinary and return the URL
const uploadToCloudinary = async (imageFile) => {
    try {
        if (!imageFile) return null;

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(imageFile);
        // Delete the file after successful upload
        await unlink(imageFile);     
console.log(result.url);

        return result.url;
    } catch (error) {
        // Delete the file in case of error
        // await unlink(imageFile).catch(err => console.error('Error deleting file:', err));
        unlinkSync(imageFile);
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

export { uploadToCloudinary };
