// Exercise 1 : Promise.all()
// Instructions
// Use the Promise.all that will accept the 3 promises below.
// The method should accept an array of promises and return an array of resolved values.
// If any of the promises are rejected, the function should catch them.
// Explain in a comment how Promise.all work and why you receive this output.

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, "foo");
});
// expected output: Array [3, 42, "foo"]

const promises = [promise1, promise2, promise3];

// Promise.all is a method that takes an array of promises and returns a single promise that resolves when all of the promises in the array have resolved. If any of the promises are rejected, the returned promise will be rejected with the reason of the first promise that was rejected. The resolved value is an array containing the resolved values of each promise in the same order as they were passed in. In this case, we expect to receive an array with the values [3, 42, "foo"] after all promises have resolved.
Promise.all(promises)
    .then((values) => {
        console.log(values);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

