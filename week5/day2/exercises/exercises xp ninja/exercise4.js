// Analyze the code provided below - what will be the outcome?

let resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

// This function does not handle errors. See warning below!
let parallelPromise = function () {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
}

setTimeout(parallelPromise, 13000)


// prediction

// waits for 13s
// "==PARALLEL with Promise.then==" 
// "starting slow promise"
// "starging fast promise"
// waits for 1s
// "fast promise is done"
// "fast"
// waits for 1s (1s + 1s = 2s) // runs concurrently
// "slow promise is done"
// "slow"