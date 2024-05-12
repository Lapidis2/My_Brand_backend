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
exports.createComments = exports.deleteComment = exports.getAllComments = void 0;
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const comment_1 = require("../models/comment");
const comment_2 = require("../models/comment");
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogcomments = yield comment_1.commentModel.find()
            .select('title description imageUrl comment Like')
            .exec();
        if (blogcomments.length >= 1) {
            res.status(200).json({
                message: "All Published comments",
                Comments: blogcomments
            });
        }
        else {
            res.status(404).json({
                message: "No Published Blogs Found"
            });
        }
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.getAllComments = getAllComments;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const deletedComment = yield (0, comment_2.deleteComentById)(_id);
        return res.json(deletedComment);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.deleteComment = deleteComment;
const createComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const { userId, blogId } = req.params;
        if (!text || !blogId || !userId) {
            return res.status(400).json({ message: "User is not aunticated or no comment written" });
        }
        const blog = yield BlogModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "no blog with that id" });
        }
        try {
            console.log(userId);
            const user = yield UserModel_1.default.findById(userId);
            console.log(user);
            //@ts-ignore
            let comment = { user: user === null || user === void 0 ? void 0 : user.username, text };
            blog.comment.push(comment);
            try {
                yield blog.save();
                return res.status(200).json(blog.comment).end();
            }
            catch (err) {
                console.log(err);
                return res.send("Check Errors");
            }
        }
        catch (_a) {
            return res.status(404).json({ message: "User not Found" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.createComments = createComments;
