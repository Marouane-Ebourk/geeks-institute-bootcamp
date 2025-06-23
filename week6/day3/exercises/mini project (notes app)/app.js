const _ = require("lodash");
const { readNotes, writeNotes } = require("./notes");

(async () => {
    const yargsModule = await import("yargs");
    const { hideBin } = await import("yargs/helpers");

    const argv = yargsModule.default(hideBin(process.argv)).parse();

    if (argv._ === undefined) throw new Error("No command specified");

    let notes = await readNotes();

    switch (argv._[0]) {
        case "add":
            if (argv.title === undefined) throw new Error("Title is required");
            if (notes.some((note) => note.title === argv.title))
                console.log("Note already exists");
            else {
                console.log("Adding note:", argv.title);
                notes.push({
                    title: argv.title,
                    body: argv.body || "",
                });
                await writeNotes(notes);
            }
            break;
        case "list":
            console.log("Listing notes:");
            if (notes.length === 0) console.log("No notes found");
            else
                notes.forEach((note) => {
                    console.log(note.title);
                });
            break;
        case "delete":
            if (argv.title === undefined) throw new Error("Title is required");
            if (!notes.some((note) => note.title === argv.title))
                console.log("Note not found");
            else {
                console.log("Deleting note:", argv.title);
                notes = notes.filter((note) => note.title !== argv.title);
                await writeNotes(notes);
            }
            break;
        default:
            throw new Error("Invalid command");
    }
})();