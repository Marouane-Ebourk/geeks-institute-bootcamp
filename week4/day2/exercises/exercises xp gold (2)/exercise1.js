// Write a JavaScript program to find the sum of all elements in an array.

function sum(arr) {
    return arr.reduce((accu, curr, index) => accu + curr)
}

const array = [23, 1, 4, 4]
console.log(sum(array))