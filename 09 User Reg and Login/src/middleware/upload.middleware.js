import multer from "multer";



// Configuartion

const storage = multer.diskStorage({

    destination:function (req,file,cb) {
        cb(null,"public/temp");
        
    },
    filename:function (req,file,cb) {
        cb(null,` _${Math.floor(Math.random()*999)}_${file.originalname}`)
        
    }
})



export const upload = multer ({storage})