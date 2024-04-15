import express from "express"
import { addBlog, deleteBlog,updateBlog,getAllBlogs,getBlogById} from "../controllers/Blog"

import { verfiyToken } from "../middelware/VerifyToken"
import { upload } from "../Multer/fileConfig"


const route = express.Router()

route.post("/", verfiyToken ,upload,addBlog)
route.put("/:blogId", verfiyToken ,updateBlog)
route.get("/:blogId", verfiyToken ,getBlogById)
route.get("/" ,getAllBlogs) 
route.delete("/:blogId", verfiyToken ,deleteBlog)
const BlogRoute = module.exports = route
export default BlogRoute