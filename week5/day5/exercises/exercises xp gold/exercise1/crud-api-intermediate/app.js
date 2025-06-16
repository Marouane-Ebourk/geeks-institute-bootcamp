const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/api/posts", (req, res) => {
    // JSONPlaceholder API
    axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((respone) => {
            res.status(200).json(respone.data);
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to fetch posts" });
        });
});

app.get("/api/posts/:id", (req, res) => {
    const postId = req.params.id;
    axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => {
            if (response.data) {
                res.status(200).json(response.data);
            } else {
                res.status(404).json({ error: "Post not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to fetch post" });
        });
});

app.post("/api/posts", (req, res) => {
    const newPost = req.body;
    axios
        .post("https://jsonplaceholder.typicode.com/posts", newPost)
        .then((response) => {
            res.status(201).json(response.data);
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to create post" });
        });
});

app.put("/api/posts/:id", (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;
    axios
        .put(
            `https://jsonplaceholder.typicode.com/posts/${postId}`,
            updatedPost
        )
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to update post" });
        });
});

app.delete("/api/posts/:id", (req, res) => {
    const postId = req.params.id;
    axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => {
            if (response.status === 200) {
                res.status(200).json({ message: "Post deleted successfully" });
            } else {
                res.status(404).json({ error: "Post not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to delete post" });
        });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
