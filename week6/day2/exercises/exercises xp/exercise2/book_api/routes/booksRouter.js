const express = require("express");
const {
    getAllBooks,
    getBookById,
} = require("../controllers/booksController.js");

const router = express.Router();

// get all books
router.get("/", getAllBooks);

// get book by id
router.get("/:id", getBookById);


module.exports = router;
