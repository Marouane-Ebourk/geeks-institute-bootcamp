const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');

const filePath = path.join(__dirname, "../", "/data", "tasks.json");

function readData() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}
async function writeData(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function getAllTasks(req, res) {
    try {
        const data = await readData();
        if (!data || !data.tasks) {
            return res.status(404).json({ error: "No tasks found" });
        }

        res.status(200).json(data.tasks);
    } catch (err) {
        console.error("Error reading tasks:", err);
        return res.status(500).json({ error: "Failed to read tasks" });
    }
}

async function getTaskById(req, res) {
    try {
        const data = await readData();
        if (!data || !data.tasks) {
            return res.status(404).json({ error: "No tasks found" });
        }
        const task = data.tasks.find((t) => t.id === parseInt(req.params.id));
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
    } catch (err) {
        console.error("Error reading tasks:", err);
        return res.status(500).json({ error: "Failed to read tasks" });
    }
}

async function createTask(req, res) {
    const errors = validationResult(req);
    console.log("Errors:", errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const data = await readData();
        const newTask = {
            id: data.tasks.length + 1,
            title: req.body.title,
            completed: req.body.completed || false,
            dueDate: req.body.dueDate || null,
        };

        data.tasks.push(newTask);

        writeData(data).then(() => {
            res.status(201).json({
                message: "Task created successfully",
                task: newTask,
            });
        });
    } catch (err) {
        console.error("Error creating task:", err);
        return res.status(500).json({ error: "Failed to create task" });
    }
}

async function updateTask(req, res) {
    try {
        const data = await readData();
        const taskIndex = data.tasks.findIndex(
            (t) => t.id === parseInt(req.params.id)
        );
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found" });
        }

        const updatedTask = {
            ...data.tasks[taskIndex],
            ...req.body,
        };

        data.tasks[taskIndex] = updatedTask;

        writeData(data).then(() => {
            res.status(200).json({
                message: "Task updated successfully",
                task: updatedTask,
            });
        });
    } catch (err) {
        console.error("Error updating task:", err);
        return res.status(500).json({ error: "Failed to update task" });
    }
}

async function deleteTask(req, res) {
    try {
        const data = await readData();
        const taskIndex = data.tasks.findIndex(
            (t) => t.id === parseInt(req.params.id)
        );
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found" });
        }

        data.tasks.splice(taskIndex, 1);

        writeData(data).then(() => {
            res.status(200).json({
                message: "Task deleted successfully",
            });
        });
    } catch (err) {
        console.error("Error deleting task:", err);
        return res.status(500).json({ error: "Failed to delete task" });
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
