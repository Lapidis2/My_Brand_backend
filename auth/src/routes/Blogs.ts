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

route.get("/blog/:blogId",async (req:any,res:any)=>{
    const {blogId}= req.params
    const blog= await BlogModel.findById(blogId)
    if(!blog){
        return res.status(401).json({message: "The Blog not found"})
    }
    return res.status(200).json({message: "Welcome to the comments", blogId})
})

route.get("/users",async (req:any, res:any) => {
        const users= await UserModel.find()
        return res.json(users)
})

route.post("/blog/:blogId/:userId",verfiyToken, async (req:any, res:any)=>{
    const {blogId, userId}= req.params
    const {commentMsg} = req.body
    const blog= await BlogModel.findById(blogId) 
    const user= await UserModel.findById(userId) 
    if(blog && user){
        let commentMessage = {
            userName: user.username, // Assuming the username is stored in the user object
            comment: commentMsg
        };
    
        // Update the comment for the blog post with the new comment message
        blog.comment.push(commentMessage)
        try{
            console.log(commentMsg)
            await blog.save()
            return res.status(200).json({userName: user["username"],blogTitle: blog["title"], commentMsg: commentMsg})

        }catch(err){
            return res.status(404).json({Message: "Not Found"})
        }
    }
    return res.status(404).json({message: "User doesnt'exists"})
    
})
route.get("/:blogId" ,getBlogById)



route.post("/", verfiyToken ,upload.single('image'),addBlog)

route.put("/:blogId", verfiyToken ,updateBlog)

route.delete("/:blogId", verfiyToken ,deleteBlog)



const BlogRoute = module.exports = route
export default BlogRoute