const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Add new todo
router.post("/todos", authenticateToken, todoController.addTodo);
// Get all todos in DB
router.get("/todoall", authenticateToken, todoController.getTodoDB);
// Get all todos user yang login
router.get("/todos", authenticateToken, todoController.getAllTodos);
// Get todo by ID
router.get("/todos/:id", authenticateToken, todoController.getTodoById);
// Update todo by ID
router.put("/todos/:id", authenticateToken, todoController.updateTodoById);
// Delete todo by ID
router.delete("/todos/:id", authenticateToken, todoController.deleteTodoById);
// Delete all todos
router.delete("/todos", authenticateToken, todoController.deleteAllTodos);
router.delete("/todoall", authenticateToken, todoController.deleteAllDBTodo);
module.exports = router;
