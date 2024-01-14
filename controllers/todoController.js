const { Todo } = require("../models/todo.js");
const { checkTodoOwnership } = require("../middlewares/authMiddleware");
// Add new todo
const addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.userId;
    const newTodo = new Todo({ title, description, status, userId });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getTodoDB = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all todos from user yang login
const getAllTodos = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get todo by ID
// const getTodoById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await Todo.findById(id);
//     if (!todo) {
//       return res.status(404).json({ message: "Todo not found" });
//     }
//     res.status(200).json(todo);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
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
    const userId = req.user.userId;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(500).json({ message: "Error updating the todo" });
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
    const userId = req.user.userId;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Ensure that only todos owned by the logged-in user are deleted
    await Todo.deleteMany({ userId });
    res.status(200).json({ message: "All user's todos deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete all todo in DB
const deleteAllDBTodo = async (req, res) => {
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
  deleteAllDBTodo,
  getTodoDB,
};
