import { faker } from "@faker-js/faker";
import promptSync from "prompt-sync";

const users = [];

function generateUser() {
    const user = {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        country: faker.location.country(),
    };
    return user;
}

function addUsers() {
    for (let i = 0; i < 10; i++) {
        users.push(generateUser());
    }
}

addUsers();

const prompt = promptSync();

const userName = prompt("Enter your name: ");
const userAddressStreet = prompt("Enter your address: ");
const userCountry = prompt("Enter your country: ");

users.push({
    name: userName,
    address: userAddressStreet,
    country: userCountry,
});

console.log(users)