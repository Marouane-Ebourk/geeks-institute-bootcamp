const express = require("express");
const {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/todosController.js");

const router = express.Router();

// get all todos
router.get("/", getAllTodos);

// get todo by id
router.get("/:id", getTodoById);

// create a new todo
router.post("/", createTodo);

// update a todo
router.put("/:id", updateTodo);

// delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
