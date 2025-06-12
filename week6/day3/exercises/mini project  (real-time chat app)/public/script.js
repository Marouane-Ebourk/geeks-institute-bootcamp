let currentRoom = null;
let username = null;

const rooms = document.querySelectorAll(".room-btn");
const chatHeader = document.getElementById("current-room");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const usernameModal = document.getElementById("username-modal");
const usernameInput = document.getElementById("username-input");
const usernameSubmit = document.getElementById("username-submit");
const currentUsername = document.getElementById("current-username");

// socket.io instance
const socket = io();

// Store messages per room
const roomMessages = {};

// Handle room selection
rooms.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!username) {
            usernameModal.style.display = "flex";
            usernameInput.focus();
            usernameSubmit.onclick = () => {
                const val = usernameInput.value.trim();
                if (val) {
                    username = val;
                    currentUsername.textContent = "👤 " + username;
                    usernameModal.style.display = "none";

                    // emit 'join' event to server
                    socket.emit("join", {
                        room: btn.dataset.room,
                        user: username,
                    });

                    selectRoom(btn.dataset.room);
                }
            };
            // submit username on Enter key
            usernameInput.onkeydown = (e) => {
                if (e.key === "Enter") usernameSubmit.click();
            };
        } else {
            selectRoom(btn.dataset.room);
        }
    });
});

function selectRoom(room) {
    currentRoom = room;
    chatHeader.textContent = room;
    chatForm.style.display = "flex";
    fetchMessages(currentRoom).then(() => {
        renderMessages();
    });
}

async function fetchMessages(room) {
    try {
        const response = await fetch(`/messages/${room}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        roomMessages[room] = data;
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// Render messages for current room
function renderMessages() {
    chatMessages.innerHTML = "";
    const msgs = roomMessages[currentRoom] || [];
    if (msgs.length === 0) {
        chatMessages.innerHTML =
            '<p class="text-gray-400">No messages yet. Say hello!</p>';
    } else {
        msgs.forEach((msg) => {
            const div = document.createElement("div");
            div.className = "mb-3";
            if (msg.type === "alert")
                div.innerHTML = `<p class="text-gray-400">${msg.text}</p>`;
            else if (msg.type === "msg")
                div.innerHTML = `<span class="font-semibold text-blue-600">${msg.user}:</span> <span>${msg.text}</span>`;
            chatMessages.appendChild(div);
        });
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle sending messages
chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (text && currentRoom && username) {
        if (!roomMessages[currentRoom]) roomMessages[currentRoom] = [];
        roomMessages[currentRoom].push({ user: username, text });
        chatInput.value = "";
        socket.emit("msg", {
            room: currentRoom,
            user: username,
            text: text,
        });
        renderMessages();
    }
});

// listen for incoming messages
socket.on("alert", (data) => {
    if (data.room === currentRoom) {
        roomMessages[data.room] = data.messages;
        renderMessages();
    }
});

socket.on("msg", (msg) => {
    if (msg.room === currentRoom) {
        if (!roomMessages[msg.room]) roomMessages[msg.room] = [];
        roomMessages[msg.room].push({
            type: "msg",
            text: msg.text,
            user: msg.user,
        });
        renderMessages();
    }
});
