"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const like_1 = require("./like");
const comment_1 = require("./comment");
const BlogSchema = new mongoose_1.default.Schema({
    imageUrl: { type: String },
    title: { type: String },
    description: { type: String },
    comment: [comment_1.commentSchema],
    likes: [like_1.LikeSchema]
});
const BlogModel = module.exports = mongoose_1.default.model("Blogs", BlogSchema);
exports.default = BlogModel;
