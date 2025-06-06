// In app.js, import the array of person objects from the data.js module.
import {people} from "./data.js"

// Write a function that calculates and prints the average age of all the persons in the array.
function printAvgAge(people) {
    const sumOfAges = people.reduce((acc, person, index) => acc + person.age, 0);
    console.log(Math.floor(sumOfAges / people.length))
}

printAvgAge(people)