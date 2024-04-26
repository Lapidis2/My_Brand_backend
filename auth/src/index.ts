import express from "express"
import mongoose from "mongoose"
import UserRoute from "./routes/User"
import dotenv from "dotenv"
import BlogRoute from "./routes/Blogs"
import CommentRoutes from "./routes/comment"
import like from "./routes/like"
import cors from "cors"
import cloudinary from 'cloudinary';
const app = express()
dotenv.config();
const PORT = 5000 


app.use(cors())
app.use(express.json())
app.use("/auth", UserRoute)
app.use("/blogs", BlogRoute)


    mongoose.connect(`${process.env.DATABASE_URL}`).then(()=>{
        console.log("database connected")
    }).catch((error)=>{
        console.log(error.message)
    })
    // @ts-ignore
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINERY_CLOUD_NAME, 
        api_key: process.env.CLOUDINERY_API_KEY, 
        api_secret: process.env.CLOUDINERY_SECRET_KEY 
      });
app.listen(PORT,()=>{
        console.log("server running on port 5000")
})
