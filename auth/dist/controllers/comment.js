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
exports.createComments = exports.getAllComments = void 0;
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const comment_1 = require("../models/comment");
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield (0, comment_1.getComments)();
        return res.status(200).json(blogs);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getAllComments = getAllComments;
const createComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const { userId } = req.params;
        const { blogId } = req.params;
        if (!text || !blogId || !userId) {
            return res.status(400).json({ message: "User is not aunticated or no comment written" });
        }
        const blog = yield BlogModel_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "no blog with that id" });
        }
        blog.comment.push({ user: userId, text });
        yield blog.save();
        return res.status(200).json(blog.comment).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.createComments = createComments;
