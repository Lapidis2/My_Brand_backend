import express from "express"
import mongoose from "mongoose"
import UserRoute from "./routes/User"
import dotenv from "dotenv"
import BlogRoute from "./routes/Blogs"
import CommentRoutes from "./routes/comment"
import like from "./routes/like"
import cors from "cors"
import cloudinary from 'cloudinary';


const swaggerjsdoc=require('swagger-jsdoc');

const swaggerui=require("swagger-ui-express");

const app = express()
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
  }));

const options = {
    definition: {
      openapi: "3.0.0",
      info:{
        title:"MyBrand api doc",
        version:"0.1",
        description:"This is swagger documentation for myBrand project."
      },
      servers: [{
        url: "https://my-brand-backend-tsc3.onrender.com"
      }]
    },
    apis: ["./src/routes/*.ts"]
  };

  const specs = swaggerjsdoc(options);

  app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(specs)
  );

app.use(cors())
app.use(express.json())
app.get("/", (req:any, res:any)=>{
  return res.status(200).json({message: "Welcome To Hitayezu Site"})
})
app.use("/auth", UserRoute)
app.use("/blogs", BlogRoute)
app.use("/Comments", CommentRoutes)
app.use("/like", like)

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
