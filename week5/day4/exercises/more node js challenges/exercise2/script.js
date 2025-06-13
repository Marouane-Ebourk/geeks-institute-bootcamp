const prompt = require("prompt-sync")();
const { getMinutesLived } = require("./date");

const userBirthdate = prompt(
    "Enter your birthdate (YYYY-MM-DD or YYYY-MM-DD HH:mm:ss): "
);
console.log(`You have lived ${getMinutesLived(userBirthdate)} minutes.`);
