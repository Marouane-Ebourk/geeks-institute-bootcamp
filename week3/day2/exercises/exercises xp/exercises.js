// Exercise 1 : List Of People

// Part I - Review about arrays

const people = ["Greg", "Mary", "Devon", "James"];

// Remove "Greg"
people.shift();

// Replace "James" with "Jason"
people[people.indexOf("James")] = "Jason";

// Add your name to the end
people.push("Marouane");

// Log Mary's index
console.log(people.indexOf("Mary"));

// Make a copy without "Mary" and your name
const peopleCopy = people.slice(1, people.length - 1);

// Index of "Foo"
console.log(people.indexOf("Foo")); // returns -1 because "Foo" is not in the array

// Variable last is the last element
const last = people[people.length - 1];

// Part II - Loops

// Iterate and log each person
for (let person of people) {
    console.log(person);
}

// Iterate and exit after "Devon"
for (let person of people) {
    console.log(person);
    if (person === "Devon") break;
}

// Exercise 2 : Your Favorite Colors

const colors = ["black", "white", "red", "purple"];

for (let i = 0; i < colors.length; i++) {
    console.log(`My #${i + 1} choice is ${colors[i]}`);
}

const suffixes = ["st", "nd", "rd"];
for (let i = 0; i < colors.length; i++) {
    let n = i + 1;
    let suffix = suffixes[i] || "th";
    console.log(`My ${n}${suffix} choice is ${colors[i]}`);
}

// Exercise 3 : Repeat The Question

do {
    number = parseInt(prompt("Please give me a number: "))
}
while (number < 10);

// Exercise 4 : Building Management

const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent: {
        sarah: [3, 990],
        dan: [4, 1000],
        david: [1, 500],
    },
};

console.log(building["numberOfFloors"]);
console.log(building["numberOfAptByFloor"]["firstFloor"]);
console.log(building["numberOfAptByFloor"]["thirdFloor"]);

const secondTenant = building.nameOfTenants[1];
const roomsOfSecondTenant =
    building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0];

console.log(secondTenant, roomsOfSecondTenant);

const sarah_rent = building.numberOfRoomsAndRent["sarah"][1];
const david_rent = building.numberOfRoomsAndRent["david"][1];
const dan_rent = building.numberOfRoomsAndRent["dan"][1];

if (sarah_rent + david_rent > dan_rent) {
    building.numberOfRoomsAndRent["dan"][1] = 1200;
}

// Exercise 5 : Family

const family = {
    father: "John",
    mother: "Jane",
    son: "Alex",
    daughter: "Emily",
};

// Log keys
for (let key in family) {
    console.log(key);
}

// Log values
for (let key in family) {
    console.log(family[key]);
}

// Exercise 6 : Rudolf

const details = {
    my: "name",
    is: "Rudolf",
    the: "reindeer",
};

let result = ""
console.log(Object.keys(details))
for (let key in details) {
    result += key + " "
    result += details[key]
} 
console.log(result)

// Exercise 7 : Secret Group

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
names.sort()
let group_name = ""
names.forEach(name => {
    group_name += name[0]
});
console.log(group_name)
