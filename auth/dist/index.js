"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./routes/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const Blogs_1 = __importDefault(require("./routes/Blogs"));
const comment_1 = __importDefault(require("./routes/comment"));
const like_1 = __importDefault(require("./routes/like"));
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require("swagger-ui-express");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    credentials: true,
}));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MyBrand api doc",
            version: "0.1",
            description: "This is swagger documentation for myBrand project."
        },
        servers: [{
                url: "https://my-brand-backend-tsc3.onrender.com"
            }]
    },
    apis: ["./src/routes/*.ts"]
};
const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome To Hitayezu Site" });
});
app.use("/auth", User_1.default);
app.use("/blogs", Blogs_1.default);
app.use("/Comments", comment_1.default);
app.use("/like", like_1.default);
mongoose_1.default.connect(`${process.env.DATABASE_URL}`).then(() => {
    console.log("database connected");
}).catch((error) => {
    console.log(error.message);
});
// @ts-ignore
cloudinary_1.default.config({
    cloud_name: process.env.CLOUDINERY_CLOUD_NAME,
    api_key: process.env.CLOUDINERY_API_KEY,
    api_secret: process.env.CLOUDINERY_SECRET_KEY
});
app.listen(PORT, () => {
    console.log("server running on port 5000");
});
