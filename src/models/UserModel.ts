import mongoose from "mongoose";


interface UserModel{
    username:string,
    email:string,
    password:string,
    _id:string

}

const UserSchema = new mongoose.Schema<UserModel>({
    username: {type:String},
    email: {type:String},
    password: {type:String},
    _id:{type:String}
})
 const UserModel = module.exports = mongoose.model("Users", UserSchema)
 export default UserModel


