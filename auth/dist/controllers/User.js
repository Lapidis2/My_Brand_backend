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
exports.login = exports.register = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const InsertData = yield UserModel_1.default.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        if (InsertData) {
            const secrete = process.env.JWT_SECRETE;
            const token = jsonwebtoken_1.default.sign({ data: InsertData }, "mysecretekey123", {
                expiresIn: "1 h",
            });
            res.status(201).json({ message: "register successfully", token: token });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existUser = yield UserModel_1.default.findOne({ email: email });
        if (existUser) {
            const comparedPassword = bcrypt_1.default.compareSync(password, existUser.password);
            if (comparedPassword) {
                const secrete = process.env.JWT_SECRETE;
                const token = jsonwebtoken_1.default.sign({ data: existUser }, "oursecretekey123", {
                    expiresIn: "1 h",
                });
                res.status(200).json({ message: "login successfully", token: token, userId: existUser._id });
            }
            else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
