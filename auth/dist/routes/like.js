"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const like_1 = require("../controllers/like");
exports.default = (router) => {
    router.get('/like', like_1.getAllLikes);
    router.post('/like/:blogid/user/:userId', like_1.LikeABlog);
};
