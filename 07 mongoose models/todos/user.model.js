import { strict } from "assert";
import mongoose  from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
    {
 

name:{
    type:String,
    required:[true,"Name is Required"],
    unique: true,
    lowercase:true
},
Email:{
    type:String,
    required:[true,"Email is Required"],
    unique:true,
    lowercase:true
},
password:{
    type:String,
    unique:true

}        
    }
    ,{timestamps:true});

export const User= mongoose.model("User",userSchema);