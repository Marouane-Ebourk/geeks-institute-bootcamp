const startLine = "     ||<- Start line";
let turtle = "🐢";
let rabbit = "🐇";
// Line up the Turtle and the Rabbit at the start line.

// + 1 of the character
// + 2 of the the ||
turtle = turtle.padStart(startLine.indexOf("||")+ 3, " ");
rabbit = rabbit.padStart(startLine.indexOf("||")+ 3, " ");
console.log(startLine.indexOf('||'))

console.log(startLine);
console.log(turtle);
console.log(rabbit);

turtle = turtle.trim().padEnd(9, '=')
// what happens ?
// it removes all the spaces around
// and then adds "=" 8 times because the turtle already takes up one space