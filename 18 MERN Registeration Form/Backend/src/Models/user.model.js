import mongoose from "mongoose";
import bcrypt from "bcrypt"
// import { bcrypt } from 'bc';

const UserSchema = mongoose.Schema({
name: {
    type:String,
    required: true
},
profession: {
    type:String,
    required: true
},
gender: {
    type:String,
    required: true
},
email: {
    type:String,
    required: true,
    unique: true
},
password: {
    type:String,
    required: true
},
contact: {
    type:Number,
    required: true
},
refreshtoken: {
    type:String,
    // required: true
},
profile: {
    type:String,
    required: true
}
},{timestamps: true});





// UserSchema.pre("save",()=>{});


// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function(next) {
    // Check if the password field is modified
    if (!this.isModified('password')) {
        return next();   
     }
 this.password = await bcrypt.hash(this.password, 10);
        next();
    });


export const User = mongoose.model("User",UserSchema);



