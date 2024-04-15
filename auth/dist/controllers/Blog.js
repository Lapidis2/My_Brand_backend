"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBlog = void 0;
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const addBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const userdata = req.userdata;
        if (userdata.data.username === "hirwa") {
            const InsertData = yield BlogModel_1.default.create({
                title,
                description
            });
            if (InsertData) {
                res.json({ data: InsertData, userData: userdata });
            }
        }
        else {
            res.json({ message: "This Route is for Hirwa only" });
        }
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.addBlog = addBlog;
