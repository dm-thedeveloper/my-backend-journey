import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";



const userSchema = new Schema(
    
    {
        username: {
            type: String,
            required: true,
            // unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            // unique: true,
            lowercase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type:String
            }
            // {
            //     type: Schema.Types.ObjectId,
            //     ref: "Video"
            // }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },

    {
        timestamps: true
    }
)


// Hash the Password Before(pre) Save ("save")

userSchema.pre("save", async function (next){

if(!this.isModified("password")) return next();

this.password = await bcrypt.hash(this.password,10); 

next();

})

//  Create a Method Which comapre the Hashed and Plain Password

userSchema.methods.isPasswordCorrect = async function(palinPaswword){
    return await bcrypt.compare(palinPaswword,this.password)
}
// JWT Method ----- Create a Access (short Live) Refresh (long Lived)



//  Access 
// => Requirements ::::: 1) access_secret 2) expiryIn


userSchema.methods.generateAccessToken = function () {
    
return jwt.sign(

    {
        _id: this._id,
        name:this.name,
        email:this.email,
        fullName:this.fullName

    },
process.env.ACCESS_TOKEN_SECRET,
    {

    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    },
    (err,token)=>{ console.log("Access Token : ",token);
    }
)
    
}


//  Refresh 
userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(

        {

id:this._id
        },
        
        process.env.REFRESH_TOKEN_SECRET
        ,
        {

            expiresIn:process.env.REFRESH_TOKEN_EXPIRY

        }
    )
    
}







export const User = mongoose.model("User",userSchema)