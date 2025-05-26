// Analyse the code below, and before executing it, predict the outcome of the last line.
const addTo = x => y => x + y;
const addToTen = addTo(10);
addToTen(3);

// prediction 
// the result: 13
// addTo(10) returns a function that returns 10 + y
// addToTen(3) runs that function on the parameter 3 so it returns 10 + 3 