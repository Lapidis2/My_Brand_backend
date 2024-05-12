"use strict";
/**
 *  @openapi
 * tags:
 *   name: Blogs
 *   description: The Blogs managing API
 * /createComment/{blogid}/user/{userId}:
 *   post:
 *     summary: Creates a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: blog id
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         description: The User created comment on the blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 *       403:
 *         description: user or blog not found
 * /comments:
 *   get:
 *     summary: Lists all the comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: All comments that were posted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 *       403:
 *         description: Admin privileges needed
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = require("../controllers/comment");
const route = express_1.default.Router();
route.get('/getComments', comment_1.getAllComments);
route.post('/createComment/:blogId/user/:userId', comment_1.createComments);
route.delete("/:_id", comment_1.deleteComment);
const CommentRoutes = module.exports = route;
exports.default = CommentRoutes;
