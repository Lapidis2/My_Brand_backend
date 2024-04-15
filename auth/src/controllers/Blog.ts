import { Request, Response } from "express";
import BlogModel from "../models/BlogModel";
import {upload} from "../Multer/fileConfig";

//function for adding new blogs
export const addBlog = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userdata = (req as any).userdata;

    upload(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ message: 'File upload failed', error: err.message });
      }

      const blogImage = req.file?.filename;
      console.log("Uploaded File:", blogImage);

      // if (!blogImage) {
      //   return res.status(400).json({ message: 'No image provided' });
      // }

      if (userdata.data.email !== "hitapeter2@gmail.com") {
        return res.status(403).json({ message: "This route is for Lapidis only" });
      }

      const newBlog = {
        title,
        imageUrl: blogImage,
        description,
        createdAt: Date.now(),
       
      };

      console.log("New Blog Data:", newBlog);

      const InsertData = await BlogModel.create(newBlog);

      if (InsertData) {
        return res.status(201).json({ data: InsertData, userData: userdata });
      } else {
        throw new Error("Failed to create blog entry");
      }
    });

  } catch (error: any) {
    console.error("Error adding blog:", error);
    return res.status(500).json({ message: error.message });
  }
};
//function for updating blog
export const updateBlog=async(req:Request,res:Response) =>{
     const {blogId}=req.params;
     const {title,description}=req.body;
    try {
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, {title,description}, { new: true });
        if (!updatedBlog) {
          return res.status(404).json({ error: 'Blog not found' });
      }
       res.send(updatedBlog)
    } catch (error) {
        console.error("Error updating blog:", error);
      res.status(500).json({error:'internal server error'})
    }
}
   
// Function to get a blog by ID
    export const getBlogById =async(req:Request,res:Response)=> {
      const {blogId}=req.params;
    try {
        const blog = await BlogModel.findById(blogId);
        res.send(blog)
    } catch (error) {
        console.error("Error occured while getting blog by ID:", error);
       res.status(500).json({error:'internal server error'})
    }
}
//get all blogs
export const getAllBlogs = async (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  try {
      const allBlogs = await BlogModel.find()
          .select('title description')
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


// Function to delete a blog by ID
export const deleteBlog=async (req:Request,res:Response)=> {
  const {blogId}=req.params;
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


