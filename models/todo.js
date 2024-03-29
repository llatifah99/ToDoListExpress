const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: "Incomplete" },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    collection: "todo",
  }
);
const Todo = mongoose.model("todo", todoSchema);

module.exports = {
  Todo,
};
