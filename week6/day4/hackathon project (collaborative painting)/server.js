const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));

const activeUsers = new Set();
const socketToUsername = new Map();

io.on("connection", (socket) => {
    socket.on("join", (username) => {
        activeUsers.add(username);
        socketToUsername.set(socket.id, username);
        console.log(`${username} has joined the chat`);
        io.emit("update-users", Array.from(activeUsers));
    });

    socket.on("draw", (data) => {
        io.emit("draw", data);
    });

    socket.on("disconnect", () => {
        const username = socketToUsername.get(socket.id);
        if (username) {
            activeUsers.delete(username);
            socketToUsername.delete(socket.id);
            console.log(`${username} has left the chat`);
            io.emit("update-users", Array.from(activeUsers));
        } else {
            console.log("A user disconnected");
        }
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
