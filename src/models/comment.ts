
import mongoose from 'mongoose';
import { title } from 'process';
import UserModel from "./UserModel"


export const commentSchema = new mongoose.Schema({
  user: {
      type:String,
      required: true
  },
  text: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

export const commentModel = mongoose.model('Comments', commentSchema);


export const getComments = () => commentModel.find();
export const getBody=(body:string)=>commentModel.findOne({body});
export const createComment = (values: Record<string, any>) => new commentModel(values).save().then((comment) => comment.toObject());
export const deleteComentById = (id: string) =>commentModel.findOneAndDelete({ _id: id });