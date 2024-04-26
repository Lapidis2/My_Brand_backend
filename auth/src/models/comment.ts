

import mongoose from 'mongoose';
import { title } from 'process';
import UserModel from "../models/UserModel"


export const commentSchema = new mongoose.Schema({
  userName:  {type:String},
  comment: {type:String},
  
});

export const commentModel = mongoose.model('Comment', commentSchema);


export const getComments = () => commentModel.find();
export const getBody=(body:string)=>commentModel.findOne({body});
export const createComment = (values: Record<string, any>) => new commentModel(values).save().then((comment) => comment.toObject());
export const deleteComentById = (id: string) =>commentModel.findOneAndDelete({ _id: id });
