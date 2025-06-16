const db = require("../config/db");

exports.getQuestion = (req, res) => {
    const qid = req.query.qid || 1;
    // Using Knex to fetch the question
    db("questions")
        .where({ id: qid })
        .first()
        .then((question) => {
            if (!question)
                return res.status(404).json({ error: "Question not found" });
            // Using Knex to fetch the options
            return db("options as o")
                .join("questions_options as qo", "qo.option_id", "o.id")
                .where("qo.question_id", qid)
                .select("o.id", "o.option")
                .then((options) => {
                    res.json({
                        id: question.id,
                        question: question.question,
                        options,
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: "Database error" });
        });
};

exports.checkAnswer = (req, res) => {
    const { qid, answer } = req.body;
    db("questions")
        .where({ id: qid })
        .first()
        .then((question) => {
            if (!question)
                return res.status(404).json({ error: "Question not found" });
            const correct = question.correctanswer == answer;
            res.json({ correct });
        })
        .catch((err) => {
            res.status(500).json({ error: "Database error" });
        });
};
