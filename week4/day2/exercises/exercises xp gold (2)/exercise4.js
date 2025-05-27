// Write a JavaScript function to concatenate a given string n times (default is 1).
// Create the repeat function yourself:

function repeat(input, n) {
    return [...new Array(n)].reduce((accum, curr, index) => accum + input, "");
}

console.log(repeat('5', 5));
