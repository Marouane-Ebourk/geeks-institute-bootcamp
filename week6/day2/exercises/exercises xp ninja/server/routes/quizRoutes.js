const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get("/question", quizController.getQuestion);
router.post("/answer", quizController.checkAnswer);

module.exports = router;
