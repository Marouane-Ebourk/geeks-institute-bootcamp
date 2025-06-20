const express = require("express");
const router = require("./routes/index.js");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use("/", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
