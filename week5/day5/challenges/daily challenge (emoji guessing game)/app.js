const express = require("express");
const path = require("path");
const app = express();

const emojis = [
    { emoji: "😀", name: "Smile" },
    { emoji: "🐶", name: "Dog" },
    { emoji: "🌮", name: "Taco" },
    { emoji: "🚗", name: "Car" },
    { emoji: "🍕", name: "Pizza" },
    { emoji: "🐱", name: "Cat" },
    { emoji: "🎸", name: "Guitar" },
    { emoji: "🏀", name: "Basketball" },
    { emoji: "🌈", name: "Rainbow" },
    { emoji: "🍔", name: "Burger" },
];

let leaderboard = [];
let currentGames = {};

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function getRandomEmojiAndOptions() {
    const correctIndex = Math.floor(Math.random() * emojis.length);
    const correct = emojis[correctIndex];

    let options = [correct.name];
    while (options.length < 4) {
        const rand = emojis[Math.floor(Math.random() * emojis.length)].name;
        if (!options.includes(rand)) options.push(rand);
    }

    options = options.sort(() => Math.random() - 0.5);
    return { emoji: correct.emoji, answer: correct.name, options };
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/question", (req, res) => {
    const player = req.query.player;
    if (!player) {
        return res.status(400).json({ error: "Player name is required." });
    }
    const { emoji, answer, options } = getRandomEmojiAndOptions();
    if (!currentGames[player]) currentGames[player] = { score: 0 };
    currentGames[player].currentAnswer = answer;
    res.json({ emoji, options, score: currentGames[player].score });
});

app.post("/api/guess", (req, res) => {
    const { guess, player } = req.body;
    if (!player) {
        return res.status(400).json({ error: "Player name is required." });
    }
    const game = currentGames[player];
    if (!game || !game.currentAnswer) {
        return res.status(400).json({ error: "No active game." });
    }
    let correct = false;
    if (guess === game.currentAnswer) {
        game.score += 1;
        correct = true;
    }
    if (correct) {
        let entry = leaderboard.find((e) => e.player === player);
        if (entry) {
            if (game.score > entry.score) entry.score = game.score;
        } else {
            leaderboard.push({ player, score: game.score });
        }
        leaderboard = leaderboard
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
    }
    res.json({ correct, answer: game.currentAnswer, score: game.score });
});

app.get("/api/leaderboard", (req, res) => {
    res.json(leaderboard);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Emoji Guessing Game running on http://localhost:${PORT}`);
});
