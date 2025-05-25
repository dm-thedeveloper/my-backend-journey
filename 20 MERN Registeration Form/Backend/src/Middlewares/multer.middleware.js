import multer from 'multer';

// Storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Define the destination where uploaded files will be stored
        cb(null, 'public/temp'); // Adjust the destination directory as needed
    },
    filename: function(req, file, cb) {
        // Define how filenames are determined
        cb(null, Date.now() + '-' + file.originalname); // Use current timestamp + original filename
    }
});

export const upload = multer({ storage});
