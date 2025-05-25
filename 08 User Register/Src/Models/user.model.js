import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema= mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        unique:true,
        lowerCase: true,
        index:true,
        trim: true

    },
   lastName:{
        type:String,
        required:true,
        unique:true,
        lowerCase: true,
        index:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase: true,

    },
    password:{
        type:String,
        required:true,
        unique:true,
    },

    profile:{
        type:String, //Cloudinary URL
        required:true,
    },
coverImage:{
    type:String //Cloudinary URL
}



},{timestamps: true});

// Hash the Password Before the save in DB
userSchema.pre("save", async function (next){

if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10);
    next();

})

// compare the Hashed and Normal password

userSchema.method.isPasswordCorrect=async function (password){
return await bcrypt.compare(password,this.password)
}
export const User=mongoose.model("User",userSchema);
