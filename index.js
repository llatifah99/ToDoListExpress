const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
mongoose.connect(url);

const db = mongoose.connection;
db.once("open", () => console.log("we are connected "));

app.use(express.json());

const authRoutes = require("./routes/userRoutes");
app.use("/", authRoutes);

const { authenticateToken } = require("./middlewares/authMiddleware");

const todoRoutes = require("./routes/todoRoutes");
app.use("/", authenticateToken, todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port : ${process.env.PORT}`);
});
