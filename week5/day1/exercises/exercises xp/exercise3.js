// Use Promise.resolve(value) to create a promise that will resolve itself with a value of 3.
// Use Promise.reject(error) to create a promise that will reject itself with the string “Boo!”

const resolvedPromise = new Promise.resolve(3)
const rejectedPromise = new Promise.reject("Boo!")
