// Create a promise that resolves itself in 4 seconds and returns a “success” string.

const myPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("success");
    }, 4000);
});

myPromise.then((result) => {
    console.log(result);
})