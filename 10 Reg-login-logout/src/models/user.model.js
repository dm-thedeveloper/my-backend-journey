import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        trim:true,
        required:true,
        index:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        required:[true , "Password is required !!"],
    },
   confirmPassword:{
        type:String,
        required:[true , "Password is required !!"],
    },
    gender:{
        type:String,
        enum:["male" , "female"],
    default:"male" 
   },
   photo:{
    type:String,  // Third Party URL
    required:true,
},
coverPhoto:{
    type:String,  // Third Party URL
},
refreshToken:{
    type:String
}

},{timestamps:true});

// Hash the password 

userSchema.pre("save" , async function (next) {
// this.isModified(())
if(!(this.isModified("confirmPassword") && this.isModified("password"))) return next()

    this.password = await bcrypt.hash(this.password,10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword,10)
next();
    
})


// Create comapre method for Hashed and palin password

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password,this.password)
}


//  Create A Method which Generate an Access and refresh Token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY

                }
    )
} 

userSchema.methods.generateRefreshToken = function(){

    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET 
                ,{
                    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}

export const  User = mongoose.model("User" ,userSchema)