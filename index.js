const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
mongoose.connect(url);

const db = mongoose.connection;
db.once("open", () => console.log("we are connected "));

app.use(express.json());

// Authentication routes
const authRoutes = require("./routes/userRoutes");
app.use("/auth", authRoutes);

// Middleware for authentication
const { authenticateToken } = require("./middlewares/authMiddleware");

// todo routes
const todoRoutes = require("./routes/todoRoutes"); // Add this line
// Use todo routes
app.use("/", authenticateToken, todoRoutes); // Add this line

app.listen(process.env.PORT, () => {
  console.log(`Listening to port : ${process.env.PORT}`);
});
