// const chalk = require("chalk");

async function greet(name) {
    const chalk = (await import("chalk")).default;
    let greeting = ""
    greeting += chalk.blue("hello")
    greeting += chalk.white.bold(" "+name)
    greeting += chalk.red("!")
    console.log(greeting);
};

module.exports = greet;
