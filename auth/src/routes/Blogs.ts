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
import express from "express"
import { addBlog, deleteBlog,updateBlog,getAllBlogs,getBlogById} from "../controllers/Blog"
import BlogModel from "../models/BlogModel"
import UserModel from "../models/UserModel"
import { verfiyToken } from "../middelware/VerifyToken"
    const multer = require('multer')
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        const uploadDir = 'src/uploads/';
       
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req: any, file: { originalname: string }, cb: (arg0: null, arg1: string) => void) {
        cb(null, file.originalname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

const route = express.Router()

route.get("/" ,getAllBlogs)
route.get("/:blogId" ,getBlogById)



route.post("/", verfiyToken ,upload.single('image'),addBlog)

route.put("/:blogId", verfiyToken ,updateBlog)

route.delete("/:blogId", verfiyToken ,deleteBlog)



const BlogRoute = module.exports = route
export default BlogRoute