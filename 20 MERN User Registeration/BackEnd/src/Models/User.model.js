import {model,Schema} from "mongoose";
import bcrypt from "bcrypt"




const UserSchema = new Schema({
name:{
    type:String,
    required: true,
},
fName:{
    type:String,
    required: true,
},
caste:{
    type:String,
    required: true,
},
phone:{
    type:Number,
    required: true,
},
address:{
    type:String,
    required: true,
},
profile:{
    type:String,
    required: true,
},
bgImage:{
    type:String,
    
},
email:{
    type:String,
    required: true,
},
password:{
    type:String,
    required: true,
},
msg:{
    type:String
},
refrshtoken:{
    type:String
},
watchHistory:[{type:String}]
},{timestamps: true });


UserSchema.pre("save" , async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    return next();
});


UserSchema.method.isPasswordCorrect = async function (password){

    return await bcrypt.compare(password,this.password) // returns true or false 
}









export const  User = model("User",UserSchema);