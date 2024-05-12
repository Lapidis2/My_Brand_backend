"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeABlog = exports.getAllLikes = void 0;
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const like_1 = require("../models/like");
const getAllLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Likes = yield (0, like_1.getLikes)();
        return res.status(200).json(Likes);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getAllLikes = getAllLikes;
const LikeABlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, blogid } = req.params;
        if (!blogid || !userId) {
            return res.status(400).json({ message: "Error Occured" });
        }
        const blog = yield BlogModel_1.default.findById(blogid);
        if (!blog) {
            return res.status(404).json({ message: "no blog with that id" });
        }
        const alreadyLiked = blog.likes.some(like => like.user.toString() === userId);
        if (alreadyLiked) {
            const likeIndex = blog.likes.findIndex(like => like.user.toString() === userId);
            blog.likes.splice(likeIndex, 1);
            yield blog.save();
            return res.status(201).json({ message: "unLiked the Blog" });
        }
        blog.likes.push({ user: userId });
        yield blog.save();
        return res.status(200).json({ message: "Liked Blog" }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.LikeABlog = LikeABlog;
