const express = require("express");
const quizRouter = require("./routes/quizRouter");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

const port = 3000;


// Use the separated router
app.use("/quiz", quizRouter);

app.listen(port, () => {
    console.log(`Trivia quiz app listening at http://localhost:${port}`);
});
