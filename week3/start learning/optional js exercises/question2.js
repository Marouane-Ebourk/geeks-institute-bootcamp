/*
Write a javascript function that takes an array of numbers and a target number.

The function should find two different numbers in the array that, when added together, give the target number.

For example: answer([1,2,3], 4) should return [1,3]

 */

function answer(arr, number) {
    let seen = new Set()

    for (let i = 0; i < arr.length; i++) {
        let num = arr[i]
        let complement = number - num
        if (seen.has(complement)){
            return [num, complement]
        }
        seen.add(num)
    }

    return null
}

console.log(answer([1,2,3], 4))
console.log(answer([2, 7, 11, 15], 9))      
console.log(answer([3, 2, 4], 6))  
console.log(answer([1, 5, 3, 7], 8))  
console.log(answer([1, 2, 3], 10)) 