//Write a function called reverseArray which accepts an array and returns the array with all values reversed. See if you can do this without creating a new array!

function reverseArray(array) {
    return array.reduce((accum, curr) => [curr, ...accum], [])
}

console.log(reverseArray([1, 2, 3, 4, 5])); // [5,4,3,2,1]
console.log(reverseArray([1, 2])); // [2,1]
console.log(reverseArray([])); // []
console.log(reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // [10,9,8,7,6,5,4,3,2,1]
