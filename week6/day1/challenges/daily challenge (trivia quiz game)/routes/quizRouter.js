const express = require("express");
const router = express.Router();

const triviaQuestions = [
    {
        question: "What is the capital of France?",
        answer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
    },
    {
        question: "What is the largest mammal in the world?",
        answer: "Blue whale",
    },
];

let currentQuestion = 0;
let score = 0;

router.get("/", (req, res) => {
    currentQuestion = 0;
    score = 0;
    res.send(`
        <h2>Trivia Quiz</h2>
        <form method="POST" action="/quiz">
            <p>${triviaQuestions[0].question}</p>
            <input type="text" name="answer" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

router.post("/", (req, res) => {
    console.log("Received answer:", req.body);
    const userAnswer = req.body.answer
        ? req.body.answer.trim()
        : "";
    const correctAnswer = triviaQuestions[currentQuestion].answer;

    let feedback = "";
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
        feedback = '<p style="color:green;">Correct!</p>';
    } else {
        feedback = `<p style="color:red;">Incorrect! The correct answer was: ${correctAnswer}</p>`;
    }

    currentQuestion++;

    if (currentQuestion < triviaQuestions.length) {
        res.send(`
            ${feedback}
            <form method="POST" action="/quiz">
                <p>${triviaQuestions[currentQuestion].question}</p>
                <input type="text" name="answer" required />
                <button type="submit">Submit</button>
            </form>
        `);
    } else {
        res.redirect("/quiz/score");
    }
});

router.get("/score", (req, res) => {
    res.send(`
        <h2>Quiz Complete!</h2>
        <p>Your final score: ${score} / ${triviaQuestions.length}</p>
        <a href="/quiz">Play Again</a>
    `);
});

module.exports = router;
