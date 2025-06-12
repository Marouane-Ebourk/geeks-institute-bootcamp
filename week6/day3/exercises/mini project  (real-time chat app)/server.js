const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));

const chats = {
    general: [],
    sports: [],
    tech: [],
    music: [],
};

app.get("/messages/:room", (req, res) => {
    const room = req.params.room;
    if (chats[room]) {
        res.json(chats[room]);
    } else {
        res.status(404).json({ error: "Room not found" });
    }
})

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", (obj) => {
        if (obj.room && obj.user) {
            chats[obj.room].push({
                type: "alert",
                text: `${obj.user} has joined the chat`,
                user: "sys",
            });

            io.emit("alert", {
                room: obj.room,
                messages: chats[obj.room],
            });
        }
    });

    socket.on("msg", (msg) => {
        console.log("Message received: " + msg);
        if (msg && msg.room && msg.text && msg.user) {
            chats[msg.room].push({
                type: "msg",
                text: msg.text,
                user: msg.user,
            });
        }
        io.emit("msg", msg);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
