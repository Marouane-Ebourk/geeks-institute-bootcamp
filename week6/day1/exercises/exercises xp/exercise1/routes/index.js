const exp = require("express");

const router = exp.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the home page!");
});

router.get("/about", (req, res) => {
    res.send("This is the about page.");
});

router.get("/contact", (req, res) => {
    res.send("This is the contact page.");
});

module.exports = { router };
