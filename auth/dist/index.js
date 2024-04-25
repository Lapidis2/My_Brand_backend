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
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const app = (0, express_1.default)();
dotenv_1.default.config();
mongoose_1.default.connect(`${process.env.DATABASE_URL}`).then(() => {
    console.log("database connected");
}).catch((error) => {
    console.log(error.message);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", User_1.default);
app.use("/blogs", Blogs_1.default);
app.listen(5000, () => {
    console.log(process.env.CLOUDINERY_API_KEY);
    // @ts-ignore
    cloudinary_1.default.config({
        cloud_name: process.env.CLOUDINERY_CLOUD_NAME,
        api_key: process.env.CLOUDINERY_API_KEY,
        api_secret: process.env.CLOUDINERY_SECRET_KEY
    });
    console.log("server running on port 5000");
});
