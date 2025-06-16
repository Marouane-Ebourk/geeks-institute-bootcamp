const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
const users = [];

// User Registration
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ message: "Username already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully." });
});

// User Login
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({ message: "Invalid credentials." });
    }
    res.json({ message: "Login successful." });
});

// User Profile
app.get("/api/profile", (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ message: "Username is required." });
    }
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    res.json({ username: user.username });
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
