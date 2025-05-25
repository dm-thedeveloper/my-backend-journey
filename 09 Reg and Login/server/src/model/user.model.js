import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

name:{
    type:String,
    trim:true,
    index:true
},
avatar:{
    type:String,
    required:true
},
coverImage:{
    type:String,
},
refereshToken:{
    type:String,
    // required:true
},
email:{
    type:String,
    required:true,
    // unique:true,
},
password:{
    type:String,
    required:true,
}



},{timestamps:true})



// Hash the Password 
userSchema.pre("save" , async function (next) {
if(!this.isModified("password")) return next(); 

this.password = await bcrypt.hash(this.password,10)
next()    
})



//  Create a method for creating a Compare a hashed and Plain Pasword


userSchema.methods.isPasswordCorrect  = async function (password) {
    return await bcrypt.compare(password,this.password);
}



//  Ceate a Generating a Refresh and Access Methods

userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            name:this.name
                },
                process.env.ACCESS_TOKEN_SECRET 
                ,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 

        }
    )
    
}


userSchema.methods.generaterefereshToken = function () {

    return jwt.sign(
        {
            _id : this._id
        },
process.env.REFRESH_TOKEN_EXPIRY,
        {
expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}















export const User = mongoose.model("User" , userSchema)


