// Write a JavaScript function to remove: null, 0, "", false, undefined and NaN values from an array.
// Sample array : [NaN, 0, 15, false, -22, '',undefined, 47, null]
// Expected result : [15, -22, 47]


function onlyNumberValues(array) {
    return array.filter(value => value)
}

const array = [NaN, 0, 15, false, -22, '',undefined, 47, null]
console.log(onlyNumberValues(array))