// Analyse the code below, and before executing it, predict the outcome of the last line.
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5 = (num) => num + 5;
compose(add1, add5)(10)

// prediction:
// result: 16
// explaination:
// compose(add1, add5) returned (a) => add1(add5(a))
// so compose(add1, add5)(10) returned 16