import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema = mongoose.Schema({
name:{
    type:String,
    unique:true,
    required:true,
    index: true,
    trim: true
},
caste:{
    type:String,
    required:true,
    index: true,
    trim: true
},
address:{
    type:String,
    required:true,
    index: true,
    trim: true
},
contact:{
    type:Number,
    unique:true,
    required:true,
    index: true,
    trim: true,
},
email:{
    type:String,
    unique:true,
    required:true,
    index: true,
    trim: true
},
password:{
    type:String,
    unique:true,
    required:true,
    index: true,
    trim: true
},
profile:{
    type:String, // cloudinary url
    required: true,
},
bgImage:{
    type:String

},
watchHistory:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"video"

   },

],
refreshtoken:{
    type: String
    
}






},{timestamps: true});

// hash the password

userSchema.pre("save", async function (next){
if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10);
    return next();


})
// compare the hashed and normal password;

userSchema.method.isPasswordCorrect= async function (password){
    return await  bcrypt.compare(password,this.password) 
}


userSchema.methods.generateAceestoken = function(){

return jwt.sign({
    _id: this._id,
    email: this.email
},
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})

};

userSchema.methods.generateRefreshtoken = function(){
    return jwt.sign(
        {
          _id:this._id
        },
      process.env.REFRESH_TOKEN_SECRET,
        
       {
       expiresIn: process.env.REFRESH_TOKEN_EXPIRY
       }

    )
};



export const User = mongoose.model("User",userSchema);