const express = require("express")
const todoRouter = require("./routes/todoRouter.js")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/todos", todoRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});