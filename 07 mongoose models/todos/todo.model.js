
import mongoose from "mongoose";

const toodScheme =new mongoose.Schema({

    content:{
        type:String,
        require:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        Ref:"User"
    },
    subtod:[
{
    type: mongoose.Schema.Types.ObjectId,
    ref:"SubTodo"
}

    ]
},{timestamps:true});

export const Subtodo= mongoose.model("Subtodo",toodScheme);