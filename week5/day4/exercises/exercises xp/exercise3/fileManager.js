const fs = require("fs");
const path = require("path");

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(filePath), "utf-8", (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function writeFile(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.resolve(filePath),
            content,
            { flag: "a+", encoding: "utf-8" },
            (err) => {
                if (err) return reject(err);
                resolve();
            }
        );
    });
}

module.exports = {
    readFile,
    writeFile,
};
