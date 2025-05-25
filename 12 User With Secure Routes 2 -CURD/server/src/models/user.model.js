import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// https://i.insider.com/63651dccc816990018947764?width=1000&format=jpeg&auto=webp

const userSchema  = new mongoose.Schema( {

fullname:{
    type:String, 
    lowercase:true,
    index:true, 
    required: true,   

},
username:{
    type:String, 
    lowercase:true,
    index:true, 
},
bio:{
    type:String,  // A short description or tagline about the user.
    lowercase:true,
} , 
profile:{
    type:String,  
    required:true, 
}, 
coverImage:{
    type:String,  
}, 
followers :{

    type: String
},
likes:{

    type:String
},
posts:{

    type:String
},
theme:{
    type:String , 
    enum : [ "dark" , "light"],
    default:"light"
},
github_link:{
    type:String
},
location:{
    type:String
},
email:{
    type:String, 
},
password:{
    type :String,
    required :true
},
confirmPassword:{
    type :String,
    required :true
},
refreshToken:{
    type:String
}
 },{ timestamps:true});


//  Hash The Password

userSchema.pre("save" , async function (next) {
if(!(this.isModified("password") || this.isModified("confirmPassword"))) next (); 

    this.password = await bcrypt.hash(this.password , 10)
    this.confirmPassword  = await bcrypt.hash(this.confirmPassword , 10)
    next()
});

// Create a Compare Method hashed === Plain 

userSchema.methods.isPasswordCorrect = async function  (password) {
    return await bcrypt.compare(password , this.password); 
    
};

userSchema.methods.isPasswordCorrectCorrect = async function (confirmPassword) {
    return await bcrypt.compare(confirmPassword , this.confirmPassword)
    
}

// generate Access

userSchema.methods.generateAccessToken = function () {

    return jwt.sign( 

        {
            _id  :this._id,
        }
         , process.env.ACCESS_TOKEN_SECRET , // secrets
          {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
          }
        )
    
}

// generate Refresh

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign( {
        _id: this._id
    } ,
     process.env.REFRESF_TOKEN_SECRET ,
     { 
        expiresIn : process.env.REFRESF_TOKEN_EXPIRY
     })
    
}

export const User = mongoose.model("User", userSchema)
