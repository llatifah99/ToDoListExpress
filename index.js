const express = require("express");
const app = express();
require("dotenv").config();
const { Todo } = require("./models/todo.js");

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
mongoose.connect(url);

const db = mongoose.connection;
db.once("open", () => console.log("we are connected "));

app.use(express.json());
// Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTodo = new Todo({ title, description, status });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port : ${process.env.PORT}`);
});
