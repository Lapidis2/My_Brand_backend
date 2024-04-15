import mongoose from "mongoose";


interface BlogModel{
    title:string,
    imageUrl: String ,
    description:string
   
}

const BlogSchema = new mongoose.Schema<BlogModel>({
    title: {type:String},
    imageUrl: {type:String},
    description: {type:String}
    
   

})
 const BlogModel = module.exports = mongoose.model("Blogs", BlogSchema)
 export default BlogModel


