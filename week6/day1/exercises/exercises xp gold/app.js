const express = require("express");
const { router: postsRouter } = require("./routes/posts");

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: "Internal server error" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
