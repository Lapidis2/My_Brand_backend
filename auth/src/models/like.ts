
import mongoose from 'mongoose';
import UserModel from "../models/UserModel"

export const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});




export const LikeModel = mongoose.model('Like', LikeSchema);
export const getLikes= () => LikeModel.find();
export const LikeBlog= (values: Record<string, any>) => new LikeModel(values).save().then((comment) => comment.toObject());
export const deleteLikeById = (id: string) => LikeModel.findOneAndDelete({_id: id});