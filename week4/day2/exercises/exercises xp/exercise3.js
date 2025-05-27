// Analyze these pieces of code before executing them. What will be the outputs ?
// ------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
// prediction
// ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange'] ✅

// ------2------
const country = "USA";
console.log([...country]);
// prediction
// ['U', 'S', 'A'] ✅

// ------Bonus------
let newArray = [...[,]];
console.log(newArray);
// prediction
// [undefined, undefined, undefined] ❌
// right answer
// [undefined, undefined]