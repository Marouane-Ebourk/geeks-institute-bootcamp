const express = require("express");
const router = express.Router();

// Example in-memory books array
let books = [
    { id: 1, title: "Book One", author: "Author A" },
    { id: 2, title: "Book Two", author: "Author B" },
];

router.get("/", (req, res) => {
    res.json(books);
});

router.get("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
});

router.post("/", (req, res) => {
    const { title, author } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author,
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send("Book not found");
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
});

router.delete("/:id", (req, res) => {
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send("Book not found");
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
});

module.exports = router;
