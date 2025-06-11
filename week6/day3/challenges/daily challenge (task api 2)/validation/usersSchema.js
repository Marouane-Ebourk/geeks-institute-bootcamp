const { body } = require("express-validator");

const registerUserSchema = [
    body("firstName")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("First name is required")
        .isString()
        .withMessage("First name must be a string")
        .notEmpty()
        .withMessage("First name cannot be empty"),
    body("lastName")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name must be a string")
        .notEmpty()
        .withMessage("Last name cannot be empty"),
    body("userName")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string")
        .notEmpty()
        .withMessage("Username cannot be empty"),
    body("email")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address"),
    body("password")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

const loginUserSchema = [
    body("userName")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string")
        .notEmpty()
        .withMessage("Username cannot be empty"),
    body("password")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password cannot be empty"),
];


module.exports = {
    registerUserSchema,
    loginUserSchema
};
