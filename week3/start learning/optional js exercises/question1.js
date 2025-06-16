/*
Clean the room function:

Given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that organizes these, into individual array that is ordered.

For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591].

 */

function answer(arr) {
    let result = [];
    let temp = [];

    // Sort the array
    arr.sort((a, b) => a - b);

    for (let i = 0; i < arr.length; i++) {
        if (temp.length === 0 || arr[i] === temp[temp.length - 1]) {
            // if the current number is the same as the last one, add it to temp
            temp.push(arr[i]);
        } else {
            // if it's different, push the temp array to result and reset temp
            if (temp.length > 1) {
                result.push(temp);
            } else {
                result.push(temp[0]);
            }
            temp = [arr[i]];
        }
    }

    if (temp.length > 0) {
        if (temp.length > 1) {
            result.push(temp);
        } else {
            result.push(temp[0]);
        }
    }

    console.log(result);
}

arr = [1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20];

answer(arr);
