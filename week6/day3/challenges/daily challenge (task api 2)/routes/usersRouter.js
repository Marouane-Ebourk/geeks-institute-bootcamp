const express = require("express");
const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser
} = require("../controllers/usersController.js");

const {
    registerUserSchema,
    loginUserSchema
} = require("../validation/usersSchema.js");

const router = express.Router();

router.post("/register", registerUserSchema, registerUser);
router.post("/login", loginUserSchema, loginUser); 
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);

module.exports = router;
