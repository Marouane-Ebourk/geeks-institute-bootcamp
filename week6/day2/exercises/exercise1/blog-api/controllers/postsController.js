const db = require("../modules/db.js");

async function getAllPosts(req, res) {
    try {
        const posts = await db("posts").select("*");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
}

async function getPostById(req, res) {
    try {
        const post = await db("posts").where({ id: req.params.id }).first();
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch post" });
    }
}

async function createPost(req, res) {
    try {
        const post = {
            title: req.body.title,
            content: req.body.content,
        };
        const newPost = await db("posts").insert(post).returning("*");
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: "Failed to create post" });
    }
}
async function updatePost(req, res) {
    try {
        const post = {
            title: req.body.title,
            content: req.body.content,
        };
        const updated = await db("posts")
            .where({ id: req.params.id })
            .update(post)
            .returning("*");
        if (!updated) return res.status(404).json({ error: "Post not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Failed to update post" });
    }
}
async function deletePost(req, res) {
    try {
        const deleted = await db("posts")
            .where({ id: req.params.id })
            .del()
            .returning("id");
        if (!deleted) return res.status(404).json({ error: "Post not found" });
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete post" });
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
