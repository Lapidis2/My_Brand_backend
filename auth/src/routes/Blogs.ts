import express from "express"
import { addBlog, deleteBlog,updateBlog,getAllBlogs,getBlogById} from "../controllers/Blog"

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
route.get("/" ,getAllBlogs)

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

route.get("/:blogId", verfiyToken ,getBlogById)

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


route.post("/", verfiyToken ,upload.single('image'),addBlog)

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
route.put("/:blogId", verfiyToken ,updateBlog)

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
route.delete("/:blogId", verfiyToken ,deleteBlog)


const BlogRoute = module.exports = route
export default BlogRoute