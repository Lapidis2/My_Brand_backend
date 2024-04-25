"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Blog_1 = require("../controllers/Blog");
const VerifyToken_1 = require("../middelware/VerifyToken");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'src/uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage });
const route = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API endpoints for Blog Posts
 */
/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve all blog posts.
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Blog posts retrieved successfully.
 */
route.get("/", Blog_1.getAllBlogs);
/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Retrieve a single blog post by ID
 *     description: Retrieve the content and details of a single blog post by providing its ID.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog post to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully.
 *       404:
 *         description: Blog post not found.
 */
route.get("/:blogId", VerifyToken_1.verfiyToken, Blog_1.getBlogById);
/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog post
 *     description: Create a new blog post
 *     tags: [blogs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *
 *               content:
 *                 type: string
 *               blogImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Blog post created successfully
 *       '401':
 *         description: Not authorized
 */
route.post("/", VerifyToken_1.verfiyToken, upload.single('image'), Blog_1.addBlog);
/**
 * @swagger
 * /blogs/{blogId}:
 *   put:
 *     summary: Update a blog post
 *     description: Update an existing blog post
 *     tags: [blogs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *               updatedBlogImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Blog  updated successfully
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Blog post not found
 */
route.put("/:blogId", VerifyToken_1.verfiyToken, Blog_1.updateBlog);
/**
 * @swagger
 * /blogs/{blogId}:
 *   delete:
 *     summary: Delete a blog by id
 *     description: Delete an existing blog post
 *     tags: [blogs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post
 *     responses:
 *       '200':
 *         description: Blog post deleted successfully
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Blog post not found
 */
route.delete("/:blogId", VerifyToken_1.verfiyToken, Blog_1.deleteBlog);
const BlogRoute = module.exports = route;
exports.default = BlogRoute;
