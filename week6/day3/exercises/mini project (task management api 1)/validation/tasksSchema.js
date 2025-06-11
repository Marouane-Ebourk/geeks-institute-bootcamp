const { body } = require("express-validator");

const createTaskSchema = [
    body("title")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string")
        .notEmpty()
        .withMessage("Title cannot be empty"),
    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be a boolean"),
    body("dueDate")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("Due date must be a valid date")
        .toDate(),
];

const updateTaskSchema = [
    body("title")
        .optional()
        .isString()
        .withMessage("Title must be a string")
        .notEmpty()
        .withMessage("Title cannot be empty"),
    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be a boolean"),
    body("dueDate")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("Due date must be a valid date")
        .toDate(),
];

module.exports = {
    createTaskSchema,
    updateTaskSchema,
};
