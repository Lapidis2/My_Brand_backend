"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComentById = exports.createComment = exports.getBody = exports.getComments = exports.commentModel = exports.commentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
exports.commentSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: UserModel_1.default,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.commentModel = mongoose_1.default.model('Comment', exports.commentSchema);
const getComments = () => exports.commentModel.find();
exports.getComments = getComments;
const getBody = (body) => exports.commentModel.findOne({ body });
exports.getBody = getBody;
const createComment = (values) => new exports.commentModel(values).save().then((comment) => comment.toObject());
exports.createComment = createComment;
const deleteComentById = (id) => exports.commentModel.findOneAndDelete({ _id: id });
exports.deleteComentById = deleteComentById;
