// Write a JavaScript function that takes 2 parameters: a string and a number.
// The function should chop the string into chunks of your chosen length (the second parameter), and the outcome should be represented in an array.
// console.log(string_chop('developers',2));
// ["de", "ve", "lo", "pe", "rs"]

function string_chop(string, chunkSize) {
    // [ 'd', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', 's']
    return string.split("").reduce((accum, currChar) => {
        // if it was empty
        // []
        if (accum.length == 0) return [currChar];

        if (accum[accum.length - 1].length < chunkSize) {
            // if the last element didn't yet reach the chunk length
            // ["de", "v"]
            accum[accum.length - 1] += currChar;
            return accum;
        } else {
            // if the last element has already the chunkSize
            accum.push(currChar);
            return accum;
        }
    }, []);
}

console.log(string_chop("developers", 2));
