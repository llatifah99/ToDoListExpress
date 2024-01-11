const { Todo } = require("../models/todo.js");

// Add new todo
const addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTodo = new Todo({ title, description, status });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get todo by ID
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update todo by ID
const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete todo by ID
const deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete all todos
const deleteAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany();
    res.status(200).json({ message: "All todos deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  addTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  deleteAllTodos,
};
