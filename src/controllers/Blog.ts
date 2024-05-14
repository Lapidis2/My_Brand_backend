import { Request, Response } from "express";
import BlogModel from "../models/BlogModel";
import {upload} from "../Multer/fileConfig";
import cloudinary from 'cloudinary'
// import like from "../routes/like";

export const addBlog= async (req:any, res:any) =>{
  try {

      const { title, description} = req.body;
      const imagePath = req.file ? req.file.path : null;
      let blogImage=''
      if (req.file) {
        // @ts-ignore
          const result = await cloudinary.uploader.upload(req.file.path);
          blogImage = result.secure_url; 

      }

      
      const newBlog = {
        imageUrl: blogImage,
        title,
        description,
        createdAt: Date.now(),
       
      };

      const InsertData = await BlogModel.create(newBlog);

      if (InsertData) {
        return res.status(201).json({ data: InsertData, userData: InsertData });
      } else {
        throw new Error("Failed to create blog entry");
      }

      
  } catch (err) {
      console.log('Error: ', err);
      res.status(500).json({
          message: "Internal Server Error!"
      });
  }
};

export const updateBlog=async(req:Request,res:Response) =>{
     const {blogId}=req.params;
     const {title,description }=req.body;
     let  imageUrl=""
     if (req.file) {
      // @ts-ignore
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url; 
    }
  

    try {
    
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, {title,description}, { new: true });
        console.log("updated blog",updatedBlog)
      
        if (!updatedBlog) {
          return res.status(404).json({ error: 'Blog not found' });
         
      }
       res.send(updatedBlog)
    } catch (error) {
        console.error("Error updating blog:", error);
      res.status(500).json({error:'internal server error'})
    }
    
}
   

export const getBlogById =async(req:Request,res:Response)=> {
      const {blogId}=req.params;
    try {
        const blog = await BlogModel.findById(blogId)
        res.send(blog)
    } catch (error) {
        console.error("Error occured while getting blog by ID:", error);
       res.status(500).json({error:'internal server error'})
    }
}

export const getAllBlogs = async (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  try {
      const allBlogs = await BlogModel.find()
          .select('title description imageUrl comment Like')
          .exec();
      if (allBlogs.length >= 1) {
          res.status(200).json({
              message: "All Published Blogs",
              blogs: allBlogs
          });
      } else {
          res.status(404).json({
              message: "No Published Blogs Found"
          });
      }
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({
          message: "Internal Server Error"
      });
  }
};


export const deleteBlog=async (req:Request,res:Response)=> {
  const {blogId}=req.params;
  console.log(blogId)
    try {
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
        if (!deletedBlog) {
          return res.status(404).json({ error: 'Blog not found' });
      }
        else if (deletedBlog) {
            res.send('The blog deletion successfully')
        }
       
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({error:'the error occured in deleting blog'})
    }
}


