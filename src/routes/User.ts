import express from "express"
import { register,login } from "../controllers/User"

const route = express.Router()

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registering  a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *              
 *     responses:
 *       '201':
 *         description: register successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *      
 *       '500':
 *         description: Internal server error
 */

route.post("/register", register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Log in an existing user.
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User log in successfully.
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Unauthorized.
 */
route.post("/auth", login)

const UserRoute = module.exports = route
export default UserRoute