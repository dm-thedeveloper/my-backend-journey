import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({ 

username :{
    type:String,
    required:true,
    // unique:true,
    lowercase :true,
    trim:true,
    index:true

},
email :{
    type:String,
    required:true,
    // unique:true,
    lowercase :true,
    trim:true,
},
avatar:{
    type:String , // Cloudinary URL,
    required:true
},
coverImage: {
    type: String, // cloudinary url
},
watchHistory :[
    {
        type:String
        // type:Schema.Types.ObjectId,
        // ref: "Video"
    }
],
password: {
    type:String,
    required: [ true ,"Password is Required "]
},
refreshToken:{
type:String
}

} , {timestamps:true})


// Hash The Password
userSchema.pre("save" , async function(next) {
if(!this.isModified("password"))  next();

this.password = await bcrypt.hash(this.password , 10)
next()
    
})



// Create a Method For Comapre the hashed And Plain Password 

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)
    
}

// Create Methods for generating Access And Refresh Token

userSchema.methods.generateAccessToke = function (){

    return jwt.sign(
        {
id:this._id,
username:this.userSchema,
email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET 
,        {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY 
        }
    
    )
}

userSchema.methods.generateRefreshToken = function (){

    return jwt.sign(
        {
            _id: this._id

        },
process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY 

        }
    )
} 


export const User = mongoose.model("User" , userSchema);