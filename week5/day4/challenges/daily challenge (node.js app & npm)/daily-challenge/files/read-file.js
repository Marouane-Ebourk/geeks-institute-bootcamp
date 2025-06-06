const fs = require("fs");
const path = require("path");

function displayFileContent() {
    const filePath = path.join(__dirname, "file-data.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err.message);
        } else {
            console.log(data);
        }
    });
}

module.exports = displayFileContent;
