const express = require("express");
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/tasksController.js");

const {
    createTaskSchema,
    updateTaskSchema,
} = require("../validation/tasksSchema.js");

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTaskSchema, createTask);
router.put("/:id", updateTaskSchema, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
