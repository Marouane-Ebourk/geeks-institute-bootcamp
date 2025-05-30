// Create a function that returns true if all parameters are truthy, and false otherwise.

function allTruthy(...args) {
    return args.every(arg => Boolean(arg));
}

console.log(allTruthy(true, true, true)); // ➞ true
console.log(allTruthy(true, false, true)); // ➞ false
console.log(allTruthy(5, 4, 3, 2, 1, 0)); // ➞ false
