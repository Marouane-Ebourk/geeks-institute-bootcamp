// Exercise 1 : Divisible By Three

let numbers = [123, 8409, 100053, 333333333, 7];
numbers.forEach((number) => {
    console.log(number % 3 == 0);
});

// Exercise 2 : Attendance

let guestList = {
    randy: "Germany",
    karla: "France",
    wendy: "Japan",
    norman: "England",
    sam: "Argentina",
    marouane: "Morocco"
};


// let student_name = prompt("Please enter your name")

// if (student_name in guestList) {
//     console.log(`Hi! I'm ${student_name}, and I'm from ${guestList[student_name]}.`, );
// } else {
//     console.log("Hi! I'm a guest");
// }


// Exercise 3 : Playing with numbers

let ages = [20,5,12,43,98,55];
let sum = 0
let highest = -1

ages.forEach(age => {
    sum += age
    if (age > highest) {
        highest = age
    }
})

console.log(sum)
console.log(highest)
