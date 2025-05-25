import multer from "multer"

// Multer Configuration

const storage   = multer.diskStorage({

    destination: function (req,file,cb) {
        cb(null,"public/temp")
    },
    filename:function (req,file,cb) {
        cb(null, `${Math.floor(Math.random()*99)}_${file.originalname}`)
    }
})


export const upload= multer( { storage})