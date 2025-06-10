const path = require("path");
const fs = require("fs");

async function displayfileInfo() {
    const filePath = path.join(__dirname, "data", "example.txt");
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        const stats = fs.statSync(filePath);
        console.log(`File: ${filePath}`);
        console.log(`Size: ${stats.size} bytes`);
        console.log(`Created: ${stats.birthtime}`);
    }
}

module.exports = { displayfileInfo };
