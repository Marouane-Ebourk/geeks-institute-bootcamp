const express = require("express")
const postsRouter = require("./routes/postsRouter.js")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/posts", postsRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});