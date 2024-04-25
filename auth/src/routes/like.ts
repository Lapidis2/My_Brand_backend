/**
 *  @openapi
 * tags:
 *   name: Likes
 *   description: The Likes managing API 
 * /blogs/{id}/like/{userId}:
 *   post:
 *     summary: Creates a like
 *     tags: [Likes]
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
 *         description: The User liked the blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Likes'
 *       403:
 *         description: Admin privileges needed
 * /blogs/{id}/like/{userId}/{likeId}:
 *   delete:
 *     summary: Remove a like
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: path
 *         name: likeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The like id
 *     responses:
 *       200:
 *         description: The like on the blog has been removed
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Likes'
 *       403:
 *         description: The blog or user was not found
 */ 
import express from 'express';



import { getAllLikes,LikeABlog } from '../controllers/like';

export default (router: express.Router) => {
    router.get('/like',getAllLikes);
    router.post('/like/:blogid/user/:userId',LikeABlog);
  };