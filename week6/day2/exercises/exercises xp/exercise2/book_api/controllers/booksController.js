const db = require("../modules/db.js");

async function getAllBooks(req, res) {
    try {
        const books = await db("books").select("*");
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
}

async function getBookById(req, res) {
    try {
        const book = await db("books").where({ id: req.params.id }).first();
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch book" });
    }
}


module.exports = {
    getAllBooks,
    getBookById,
};
