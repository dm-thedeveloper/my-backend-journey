import multer from "multer";


const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"./Public/temp")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
        console.log("File Name"+file.originalname);
    }
})


export const upload =multer({storage});