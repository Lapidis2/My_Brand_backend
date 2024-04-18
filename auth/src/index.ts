import express from "express"
import mongoose from "mongoose"
import UserRoute from "./routes/User"
import dotenv from "dotenv"
import BlogRoute from "./routes/Blogs"
import cors from "cors"
import cloudinary from 'cloudinary';
const app = express()
dotenv.config();

mongoose.connect("mongodb://localhost:27017/teamdavid").then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log(error.message)
})

app.use(cors())
app.use(express.json())
app.use("/auth", UserRoute)
app.use("/blogs", BlogRoute)

app.listen(5000,()=>{
    console.log(process.env.CLOUDINERY_API_KEY)
    // @ts-ignore
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINERY_CLOUD_NAME, 
        api_key: process.env.CLOUDINERY_API_KEY, 
        api_secret: process.env.CLOUDINERY_SECRET_KEY 
      });
    console.log("server running on port 5000")
})
