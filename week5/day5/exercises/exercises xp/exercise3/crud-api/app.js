const express = require("express");
const { fetchPosts } = require("./data/dataService.js");

const app = express();

app.get("/posts", async (req, res) => {
    try {
        const posts = await fetchPosts();
        console.log("Posts fetched successfully");
        return res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ error: "Failed to fetch posts" });
    }
});

app.listen(5000, () => {
    console.log("listening on port 5000!");
});
