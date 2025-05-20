const numbers = [5,0,9,1,7,4,2,6,3,8];

console.log(numbers.toString())

console.log(numbers.join("+"))
console.log(numbers.join(" "))
console.log(numbers.join(""))

function bubbleSort(array) {
    // loop for passes
    for (let i = 0; i < array.length; i ++ ) {
        // swap with bigger numbers until the number reaches the end 
        for (let j = 0; j < array.length - i; j ++ ) {
            num1 = array[j]
            num2 = array[j + 1]

            if (array[j] < array[j + 1]) {
                // swap 
                temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }
        }
    }
    return array
}

console.log(bubbleSort(numbers))
