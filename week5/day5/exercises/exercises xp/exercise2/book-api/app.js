const express = require("express");

const app = express();

const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedYear: 1925,
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publishedYear: 1960,
    },
    { id: 3, title: "1984", author: "George Orwell", publishedYear: 1949 },
];

app.use(express.json());

// Read all
app.get("/api/books", (req, res) => {
    res.json(books);
});

// Read
app.get("/api/books/:bookId", (req, res) => {
    const bookId = req.params.bookId;

    const book = books.find((book) => book.id == bookId);
    if (!book) return res.status(400).json({ error: "Book not found" });

    res.status(200).json(book);
});

// Create
app.post("/api/books", (req, res) => {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear)
        return res.status(400).json({ error: "invalid input" });

    const newBook = {
        id: books.length ? books.length + 1 : 1,
        title: title,
        author: author,
        publishedYear: parseInt(publishedYear)
    }

    books.push(newBook)
    return res.status(201).json(newBook)

});

// invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(5000, () => {
    console.log("app listening to route 5000");
});
