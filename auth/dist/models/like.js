"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLikeById = exports.LikeBlog = exports.getLikes = exports.LikeModel = exports.LikeSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
exports.LikeSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: UserModel_1.default,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.LikeModel = mongoose_1.default.model('Like', exports.LikeSchema);
const getLikes = () => exports.LikeModel.find();
exports.getLikes = getLikes;
const LikeBlog = (values) => new exports.LikeModel(values).save().then((comment) => comment.toObject());
exports.LikeBlog = LikeBlog;
const deleteLikeById = (id) => exports.LikeModel.findOneAndDelete({ _id: id });
exports.deleteLikeById = deleteLikeById;
