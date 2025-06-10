const db = require("../modules/db.js");
const { v4: uuidv4 } = require("uuid");

// get all tasks
async function getAllTodos(req, res) {
    try {
        const tasks = await db("tasks").select("*");
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
}

// get task by id
async function getTodoById(req, res) {
    try {
        const task = await db("tasks").where({ id: req.params.id }).first();
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch task" });
    }
}

// create a new task
async function createTodo(req, res) {
    try {
        const task = {
            id: uuidv4(),
            title: req.body.title,
            completed: req.body.completed ?? false,
        };
        const newTask = await db("tasks").insert(task).returning("*");
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Failed to create task" });
    }
}

// update a task
async function updateTodo(req, res) {
    try {
        const task = {
            title: req.body.title,
            completed: req.body.completed,
        };
        const updated = await db("tasks")
            .where({ id: req.params.id })
            .update(task)
            .returning("*");
        if (!updated || updated.length === 0)
            return res.status(404).json({ error: "Task not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Failed to update task" });
    }
}

// delete a task
async function deleteTodo(req, res) {
    try {
        const deleted = await db("tasks")
            .where({ id: req.params.id })
            .del()
            .returning("id");
        if (!deleted || deleted.length === 0)
            return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task" });
    }
}

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
};
