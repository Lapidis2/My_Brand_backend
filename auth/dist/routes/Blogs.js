"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  @openapi
 * tags:
 *   name: Blogs
 *   description: The Blogs managing API
 * /blogs:
 *   get:
 *     summary: Lists all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: All blogs that were posted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Admin privileges needed
 *   post:
 *     summary: Creates a blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The created Blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Admin privileges needed
 * /updateBlog/{id}:
 *   patch:
 *     summary: Update a blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Blog id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The blog was updated
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Admin Privileges needed or The blog was not found
 * /deleteBlog/{id}:
 *   delete:
 *     summary: Remove a blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog has been removed
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Admin Privileges needed or The blog was not found
 *
 */
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
route.get("/", Blog_1.getAllBlogs);
route.get("/:blogId", Blog_1.getBlogById);
route.post("/", VerifyToken_1.verfiyToken, upload.single('image'), Blog_1.addBlog);
route.put("/:blogId", VerifyToken_1.verfiyToken, Blog_1.updateBlog);
route.delete("/:blogId", VerifyToken_1.verfiyToken, Blog_1.deleteBlog);
const BlogRoute = module.exports = route;
exports.default = BlogRoute;
