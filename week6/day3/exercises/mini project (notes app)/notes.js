const fs = require("fs");

async function readNotes() {
    try {
        const data = await fs.promises.readFile("notes.json", "utf8");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function writeNotes(notes) {
    try {
        await fs.promises.writeFile(
            "notes.json",
            JSON.stringify(notes, null, 2)
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = { readNotes, writeNotes };