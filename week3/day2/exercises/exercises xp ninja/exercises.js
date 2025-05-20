/* 
Create two objects, each object should hold a person’s details. Here are the details:
FullName
Mass
Height
*/

person1 = {
    fullname: "Bob Frank",
    mass: "90",
    height: "180",
    get bmi() {
        return this.mass / (this.height ** 2)
    }
}

person2 = {
    fullname: "Tommy bowe",
    mass: "70",
    height: "180",
    get bmi() {
        return this.mass / (this.height ** 2)
    }
}
function compare(p1, p2) {
    if(p1.bmi > p2.bmi) 
        console.log(`${p1.fullname} has the largest bmi`);
    else 
        console.log(`${p2.fullname} has the largest bmi`);
}

compare(person1, person2)

// Exercise 2 : Grade Average 

function findAvg(numbersList) {
    let sum = 0
    numbersList.forEach(num => {
        sum += num
    });
    let avg = sum / numbersList.length
    console.log(avg)
    return avg
}

function passed(gradesList) {
    let avg = findAvg(gradesList)
    if (avg > 65) 
        console.log("Congratulations! you passed.")
    else 
        console.log("You must repeat this course.")
}

passed([40, 100, 57, 14, 70, 80])