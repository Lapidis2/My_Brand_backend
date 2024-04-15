"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Blog_1 = require("../controllers/Blog");
const VerifyToken_1 = require("../middelware/VerifyToken");
const route = express_1.default.Router();
route.post("/addBlog", VerifyToken_1.verfiyToken, Blog_1.addBlog);
const BlogRoute = module.exports = route;
exports.default = BlogRoute;
