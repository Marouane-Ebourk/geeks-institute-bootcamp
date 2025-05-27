// Write a JavaScript program to remove duplicate items in an array.
function removeDuplicates(arr) {
    return arr.reduce((accuArray, currentValue) => {
        if (!accuArray.includes(currentValue)) return [...accuArray, currentValue];
        else return accuArray;
    }, [arr[0]]);
}

const array = [1, 1, 2, 2, 3, 3, 3];
console.log(removeDuplicates(array));
