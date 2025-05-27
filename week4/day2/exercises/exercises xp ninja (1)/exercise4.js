// Use a for loop to get this output { x: 1, y: 1, z: 2 };

const letters = ["x", "y", "z", "z"];
const result = {};
for (let letter of letters) {
    // check if the letter is already a key in the object
    if (letter in result) result[letter] += 1;
    // if not add it
    else result[letter] = 1;
}
console.log(result);

// Use the reduce() method to get this output { x: 1, y: 1, z: 2 };
const result1 = letters.reduce((accum, currLetter) => {
    currLetter in accum ? (accum[currLetter] += 1) : (accum[currLetter] = 1);
    return accum;
}, {});

console.log(result1)
