const { readFile, writeFile } = require("./fileManager.js");

// Use the imported functions to read the content of the “Hello World.txt” text file and then write to the “Bye World.txt” with the content “Writing to the file”.

readFile("./Hello World.txt").then((data) => console.log(data));

writeFile("./Bye World.txt", "Writing to the file").then(() =>
    console.log("written in the file successfully")
);
