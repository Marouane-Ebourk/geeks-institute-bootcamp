// Analyse the code below - what will be the output ?

function timesTwoAsync(x) {
    return new Promise((resolve) => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr).then((result) => {
    console.log(result);
});

// here we returned three promises each for a value of array 
// so the result will be the array [2, 4, 6]