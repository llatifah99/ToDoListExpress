const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/todos", authenticateToken, todoController.addTodo);
router.get("/todos", authenticateToken, todoController.getAllTodos);
router.get("/todos/:id", authenticateToken, todoController.getTodoById);
router.put("/todos/:id", authenticateToken, todoController.updateTodoById);
router.delete("/todos/:id", authenticateToken, todoController.deleteTodoById);
router.delete("/todos", authenticateToken, todoController.deleteAllTodos);
module.exports = router;
