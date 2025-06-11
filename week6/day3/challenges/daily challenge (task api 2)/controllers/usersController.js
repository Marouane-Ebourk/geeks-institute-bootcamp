const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { getuid } = require("process");

const filePath = path.join(__dirname, "../", "/data", "users.json");

function readData() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}
async function writeData(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function getAllUsers(req, res) {
    try {
        const data = await readData();
        if (!data || !data.users) {
            return res.status(404).json({ error: "No users found" });
        }

        res.status(200).json(data.users);
    } catch (err) {
        console.error("Error reading users:", err);
        return res.status(500).json({ error: "Failed to read users" });
    }
}

async function loginUser(req, res) {
    const errors = validationResult(req);
    console.log("Errors:", errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const data = await readData();

        const user = data.users.find((u) => u.userName === req.body.userName);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (!bcrypt.compareSync(req.body.password, user.password))
            return res.status(401).json({ error: "Invalid password" });
        else return res.status(200).json(user);
    } catch (err) {
        console.error("Error reading users:", err);
        return res.status(500).json({ error: "Failed to read user" });
    }
}

async function registerUser(req, res) {
    const errors = validationResult(req);
    console.log("Errors:", errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const data = await readData();
        const newUser = {
            id: data.users.length + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        };

        if (data.users.some((u) => u.userName === newUser.userName)) {
            return res.status(400).json({ error: "Username already exists" });
        }

        data.users.push(newUser);

        writeData(data).then(() => {
            res.status(201).json({
                message: "User created successfully",
                user: newUser,
            });
        });
    } catch (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ error: "Failed to register user" });
    }
}

async function getUserById(req, res) {
    try {
        const data = await readData();
        const user = data.users.find(
            (u) => u.id === parseInt(req.params.id)
        );
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: "Failed to fetch user" });
    }
}

async function updateUser(req, res) {
    try {
        const data = await readData();
        const userIndex = data.users.findIndex(
            (t) => t.id === parseInt(req.params.id)
        );
        if (userIndex === -1) {
            return res.status(404).json({ error: "user not found" });
        }

        const updatedUser = {
            ...data.users[userIndex],
            ...req.body,
        };

        data.users[userIndex] = updatedUser;

        writeData(data).then(() => {
            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser,
            });
        });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ error: "Failed to update user" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser
};
