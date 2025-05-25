import {Schema,model} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema= new Schema(
    {
        VideoFile:{
            type:String, // cloudinary url
            required: true 
        },
        thumbnail:{
            type:String, // cloudinary url
            required: true 
        },
        title:{
            type:String, 
            required: true 
        },
        Descrpition:{
            type:String, 
            required: true 
        },
        Duration:{
            type:Number,
            required: true 
        },
       views:{
            type:Number,
            default: 0
        
        },
       isPublished:{
            type:Boolean,
            default:true
         
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"user"
        }






     },
{timestamps:true});

VideoSchema.plugin(mongooseAggregatePaginate)

export const video = model('video',VideoSchema)