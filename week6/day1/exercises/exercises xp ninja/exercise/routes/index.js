const express = require("express");

const router = express.Router();

const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

router.get("/", (req, res) => {
    // res.send("whalecome to the home page");
    res.render("index", { emojis: emojis});
});

router.post("/greet", (req, res) => {
    const name = req.body.name;
    const emoji = req.body.emoji;

    if (!name || !emoji) {
        return res.status(400).send("Name and emoji are required");
    }

    res.render("greet", { name: name, emoji: emoji });
});

module.exports = router;
