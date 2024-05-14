import express from 'express';
import BlogModel from '../models/BlogModel';
import UserModel from '../models/UserModel';
import { commentModel } from '../models/comment';
import {getBody,getComments,deleteComentById,createComment} from "../models/comment";

export const getAllComments = async (req: express.Request, res: express.Response) => {
    try {
  
     
      
        const blogcomments = await commentModel.find()
            .select('title description imageUrl comment Like')
            .exec();
        if (blogcomments.length >= 1) {
            res.status(200).json({
                message: "All Published comments",
                Comments: blogcomments
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
  
  


  export const deleteComment = async (req: express.Request, res: express.Response) => {
    try {
      const { _id } = req.params;
  
      const deletedComment = await deleteComentById(_id);
  
      return res.json(deletedComment);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  export const createComments = async (req: express.Request, res: express.Response) => {
    try {
      const {text} = req.body;
      const{userId,blogId}=req.params;

      if (!text || !blogId || !userId ) {
        return res.status(400).json({message: "User is not aunticated or no comment written"})
      }

      const blog = await BlogModel.findById(blogId);

      if (!blog) {
        return res.status(404).json({message: "no blog with that id"});
    }
    try{
      console.log(userId)
      
      const user= await UserModel.findById(userId)
      console.log(user)
      //@ts-ignore
       let comment={ user:user?.username, text }
       blog.comment.push(comment);
       try{
        await blog.save();
        return res.status(200).json(blog.comment).end();
       }catch(err){
        console.log(err)
        return res.send("Check Errors")
       }
     
    }catch{
      return res.status(404).json({message: "User not Found"})
    }
    }catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }