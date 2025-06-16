const express = require("express");
const path = require("path");
const app = express();

const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "London", "Paris", "Madrid"],
        answer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1,
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: [
            "Charles Dickens",
            "William Shakespeare",
            "Mark Twain",
            "Jane Austen",
        ],
        answer: 1,
    },
];

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/questions", (req, res) => {
    res.json(questions);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
