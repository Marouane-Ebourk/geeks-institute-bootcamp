// Analyse the code below, and before executing it, predict the outcome of the last line.
const curriedSum = (a) => (b) => a + b
curriedSum(30)(1)

// prediction:
// result : 31
// explaination:
// curriedSum(30) returned the function (b) => 30 + b
// curriedSum(30)(1) returned 31