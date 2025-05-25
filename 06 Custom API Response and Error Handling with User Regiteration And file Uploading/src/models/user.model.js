import mongoose,{Schema,model} from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema= new Schema(
    {
        userNamee:{
            type:String,
            required:true,
            lowerCase:true,
            unique:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            lowerCase:true,
            unique:true,
            trim:true,
        
        },
        password:{type:String},
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        
        }, 
        avatar:{
            type:String, // cloudinary url
            required:true
        },
        coverImage:{
            type: String, //cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:'videos'

            }
        ],
        refreshtoken:{
            type:String
        }

        




     },
     {timestamps:true});

userSchema.pre('save',async function (next){

    if(!this.isModified('password')) return next();
 this.password =  await  bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password){
     
   return await bcrypt.compare(password,this.password); // return true or False

}





userSchema.method.generateAccessToken =  function(){
  return  jwt.sign(
        {
            _id:this._id
        },
        process.env.ACCESS_tOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_tOKEN_EXPIRY
        }
    )
 }

userSchema.method.generateRefreshToken = async function(){

    return  jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_tOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_tOKEN_EXPIRY
        }
    )
}

export const user= model('user',userSchema);