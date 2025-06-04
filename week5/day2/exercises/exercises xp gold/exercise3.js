// Analyse the code provided below - what will be the outcome?

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

let concurrentStart = async function () {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();
    console.log(await slow);
    console.log(await fast);
}

setTimeout(concurrentStart, 4000)

// prediction
// waits for 4s
// "==CONCURRENT START with await=="
// "starting slow promise"
// "starting fast promise"
// waits for 1s
// "fast promsie is done"
// waits for 1s (1s + 1s = 2s) // it ran concurrently
// "slow promise is done"
// "slow"
// "fast"