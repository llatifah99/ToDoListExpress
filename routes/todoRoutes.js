const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Add new todo
router.post("/todos", todoController.addTodo);
// Get all todos
router.get("/todos", todoController.getAllTodos);
// Get todo by ID
router.get("/todos/:id", todoController.getTodoById);
// Update todo by ID
router.put("/todos/:id", todoController.updateTodoById);
// Delete todo by ID
router.delete("/todos/:id", todoController.deleteTodoById);
// Delete all todos
router.delete("/todos", todoController.deleteAllTodos);
module.exports = router;
