// Analyse the code below, and before executing it, predict the outcome of the last line.
const curriedSum = (a) => (b) => a + b
const add5 = curriedSum(5)
result = add5(12)

// prediction:
// result: 17
// explaination:
// curriedSum(5) returned (b) => 5 + b
// add5(12) returned 17