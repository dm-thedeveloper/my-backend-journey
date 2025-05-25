import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const  userSchema  = new mongoose.Schema({
fullname:{
    type:String,
    index:true,
    required:true,
    lowercase:true,
    trim:true
},
email:{
    type:String,
    index:true,
    required:true,
    lowercase:true,
    trim:true,
    // unique:true,
},
avatar:{
    type:String,
    required:true
},
coverImage:{
    type:String, // Cloudinary Image
}
,
watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
],
password:{
    type:String,
    required: [ true ,"Password is Required :)"]
},
confirmPassword:{
    type:String,
    required: [ true ,"Confirm Password is Required :)"]
},
refreshToken :{
    type:String
}
} , {timestamps:true})
;



// Hash The Password

userSchema.pre("save" , async function (next) {


if(!(this.isModified("password") || this.isModified("password"))) next();

    this.password =await bcrypt.hash(this.password,10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword , 10);
    
    next()


    
})



// Create A Comapre Method

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
} 

// Create JWt Methods

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id:this._id,
            fullname:this.fullname,
            email :this.email

                },
                process.env.ACCESS_TOKEN_SECRET,
                
                {
                    expiresIn:process.env.REFRESH_TOKEN_EXPIRY 
            // expiryIn
        }
    )
    
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign (
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
expiresIn:process.env.REFRESH_TOKEN_EXPIRY 
        }
    )
}



export const User =  mongoose.model("User" , userSchema) 