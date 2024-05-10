import express from 'express';
import BlogModel from '../models/BlogModel';
import UserModel from '../models/UserModel';
import {getBody,getComments,deleteComentById,createComment} from "../models/comment";

export const getAllComments = async (req: express.Request, res: express.Response) => {
    try {
  
      const blogcomments = await getComments();
  
      return res.status(200).json(blogcomments);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
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
    blog.comment.push({ user:userId, text });
    await blog.save();

    return res.status(200).json(blog.comment).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }