/* 
Write a JavaScript arrow function that checks whether the value of the argument passed, is a string or not. The function should return true or false
Check out the example below to see the expected output
Example:

console.log(isString('hello')); 
//true
console.log(isString([1, 2, 4, 0]));
//false
*/

const isString = (input) => typeof input === 'string'
console.log(isString('hello')); 
console.log(isString([1, 2, 4, 0]));