const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt:{type:Date, default:Date.now},
    resetPasswordToken: {type: String, default: null},
    resetPasswordExpires: {type: Date, default: null},
})

const UserModel = mongoose.model("todo_users", UserSchema)

module.exports = UserModel