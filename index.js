const express = require("express");
const app = express();
require("dotenv").config();
// const { Todo } = require("./models/todo.js");
const todoRoutes = require("./routes/todoRoutes"); // Add this line

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
mongoose.connect(url);

const db = mongoose.connection;
db.once("open", () => console.log("we are connected "));

app.use(express.json());

// Use todo routes
app.use("/", todoRoutes); // Add this line

app.listen(process.env.PORT, () => {
  console.log(`Listening to port : ${process.env.PORT}`);
});
