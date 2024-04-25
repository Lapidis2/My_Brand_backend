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
exports.deleteBlog = exports.getAllBlogs = exports.getBlogById = exports.updateBlog = exports.addBlog = void 0;
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const addBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { title, description } = req.body;
        const imagePath = req.file ? req.file.path : null;
        let blogImage = '';
        if (req.file) {
            // @ts-ignore
            const result = yield cloudinary_1.default.uploader.upload(req.file.path);
            blogImage = result.secure_url;
        }
        const newBlog = {
            imageUrl: blogImage,
            title,
            description,
            createdAt: Date.now(),
        };
        const InsertData = yield BlogModel_1.default.create(newBlog);
        if (InsertData) {
            return res.status(201).json({ data: InsertData, userData: InsertData });
        }
        else {
            throw new Error("Failed to create blog entry");
        }
    }
    catch (err) {
        console.log('Error: ', err);
        res.status(500).json({
            message: "Internal Server Error!"
        });
    }
});
exports.addBlog = addBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const { title, description } = req.body;
    let imageUrl = "";
    if (req.file) {
        // @ts-ignore
        const result = yield cloudinary_1.default.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
    }
    console.log("debugging the issue for updating");
    try {
        const updatedBlog = yield BlogModel_1.default.findByIdAndUpdate(blogId, { title, description }, { new: true });
        console.log("updated blog", updatedBlog);
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.send(updatedBlog);
    }
    catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: 'internal server error' });
    }
});
exports.updateBlog = updateBlog;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const blog = yield BlogModel_1.default.findById(blogId);
        res.send(blog);
    }
    catch (error) {
        console.error("Error occured while getting blog by ID:", error);
        res.status(500).json({ error: 'internal server error' });
    }
});
exports.getBlogById = getBlogById;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        const allBlogs = yield BlogModel_1.default.find()
            .select('title description imageUrl')
            .exec();
        if (allBlogs.length >= 1) {
            res.status(200).json({
                message: "All Published Blogs",
                blogs: allBlogs
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
exports.getAllBlogs = getAllBlogs;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    console.log(blogId);
    try {
        const deletedBlog = yield BlogModel_1.default.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        else if (deletedBlog) {
            res.send('The blog deletion successfully');
        }
    }
    catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: 'the error occured in deleting blog' });
    }
});
exports.deleteBlog = deleteBlog;
