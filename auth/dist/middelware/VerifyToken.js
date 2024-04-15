"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verfiyToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const verfiyToken = (req, res, next) => {
    const tokenRequest = req;
    const BearerToken = req.header('authorization');
    const token = BearerToken.split(' ')[1];
    if (typeof token === "undefined") {
        res.json({ message: "no token found" });
    }
    const secrete = process.env.JWT_SECRETE;
    jsonwebtoken_1.default.verify(token, "oursecretekey123", (err, decoded) => {
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            res.json({ message: "expired token" });
        }
        else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            res.json({ message: "invalid token" });
        }
        else if (err) {
            res.json({ message: "something went wrong" });
        }
        else {
            req.userdata = decoded;
            next();
        }
    });
};
exports.verfiyToken = verfiyToken;
