const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    todoEntry: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "todo_users", required: true },
    completed: { type: Boolean, default: false }
})

const TodoModel = mongoose.model('TodoLists', TodoSchema)

module.exports = TodoModel