import express from 'express';
import  blogModel from '../models/BlogModel';
import UserModel  from '../models/UserModel';
import {getBody,getComments,deleteComentById,createComment  } from '../models/comment';
import { getLikes,LikeBlog} from '../models/like';


export const getAllLikes= async (req: express.Request, res: express.Response) => {
    try {
      const Likes = await getLikes();
  
      return res.status(200).json(Likes);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

export const LikeABlog = async (req: express.Request, res: express.Response) => {
    try {
      const{userId,blogid}=req.params;

      if (!blogid || !userId ) {
        return res.status(400).json({message: "Error Occured"})
      }

      const blog = await blogModel.findById(blogid);

      if (!blog) {
        return res.status(404).json({message: "no blog with that id"});
    }
    const alreadyLiked = blog.likes.some(like => like.user.toString() === userId);
    if(alreadyLiked){
        const likeIndex = blog.likes.findIndex(like => like.user.toString() === userId);
        blog.likes.splice(likeIndex, 1);
        await blog.save();
        return res.status(201).json({message: "unLiked the Blog"})
    }
    blog.likes.push({ user:userId});
    await blog.save();
     
    return res.status(200).json({message: "Liked Blog"}).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    
  

};