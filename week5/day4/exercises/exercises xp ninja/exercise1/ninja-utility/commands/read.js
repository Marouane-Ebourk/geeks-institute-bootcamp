const fs = require("fs");
const path = require("path");

function readFile(filePath) {
    const absolutePath = path.resolve(filePath);

    fs.readFile(absolutePath, "utf8", (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.message}`);
            process.exit(1);
        }
        console.log(data);
    });
}

module.exports = readFile
