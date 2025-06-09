const express = require("express");

let posts = [];
// Blog { id, title, content }

const router = express.Router();

router.get("/", (req, res) => {
    res.json(posts);
});

router.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id === req.params.id);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
});

router.post("/", (req, res) => {
    const { title, content } = req.body;
    if (
        !title ||
        typeof title !== "string" ||
        !content ||
        typeof content !== "string"
    ) {
        return res.status(400).json({
            error: "Title and content are required and must be strings",
        });
    }
    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title,
        content,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

router.put("/:id", (req, res) => {
    const { title, content } = req.body;
    const post = posts.find((p) => p.id == parseInt(req.params.id));
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    if (
        (!title || typeof title !== "string") &&
        (!content || typeof content !== "string")
    ) {
        return res.status(400).json({
            error: "At least one of title or content must be provided and must be a string",
        });
    }
    if (title && typeof title === "string") post.title = title;
    if (content && typeof content === "string") post.content = content;
    res.json(post);
});

router.delete("/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "Post not found" });
    }
    const deleted = posts.splice(index, 1)[0];
    res.json(deleted);
});

module.exports = { router };
