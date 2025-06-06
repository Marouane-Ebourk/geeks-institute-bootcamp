const { add, multiply } = require("./math.js");
const lodash = require("lodash");

const numbers = [2, 4, 6, 8];

console.log("(math.js) Add:", add(...numbers)); 
console.log("(math.js) Multiply:", multiply(...numbers));

console.log("(lodash) Sum:", lodash.sum(numbers));
console.log("(lodash) Max:", lodash.max(numbers));
console.log("(lodash) Min:", lodash.min(numbers));

console.log("Chunked (lodash):", lodash.chunk(numbers, 2));



