import mongoose, { Schema } from "mongoose"


const subscriptionSchema = new  mongoose.Schema( {
    subscriber:{
        type:Schema.Types.ObjectId,   // One Who is Subscribing
        ref:"User"
    }, 
    channel:{
        type: Schema.Types.ObjectId ,  // One Whom 'Subscriber' is Subscribing ;;; 
        ref:"User"

    }


} , {timestamps:true})

// timestamps:true ::: Addes Two fields in model createdAt updatedAt 


export const Subscription = mongoose.model("Subscription" , subscriptionSchema) 