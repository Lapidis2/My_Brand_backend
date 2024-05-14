import mongoose from "mongoose";
import { LikeSchema } from "./like";
import {commentSchema} from "./comment"

interface BlogModel{
    title:string,
    imageUrl: String ,
    description:string,
    comment:string,
    createdAt: { type: Date },
    likes: String
   
}

const BlogSchema = new mongoose.Schema({
    imageUrl: {type:String},
    title: {type:String},
    description: {type:String},
    comment:[commentSchema],
    likes: [LikeSchema]
})
 const BlogModel = module.exports = mongoose.model("Blogs", BlogSchema)
 export default BlogModel


