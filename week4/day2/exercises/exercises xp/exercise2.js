const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];
// Write a JavaScript program that displays the colors in the following order : “1st choice is Blue .” “2nd choice is Green.” “3rd choice is Red.” ect…
// Hint : Use the array methods taught in class and ternary operator.

colors.forEach((value, index) => {
    const remainder = (index + 1) % 10
    const ordinalSuffix = remainder > 0 && remainder < ordinal.length ? ordinal[remainder] : ordinal[0]
    console.log(`${index+1}${ordinalSuffix} choice is ${value}`)
})

