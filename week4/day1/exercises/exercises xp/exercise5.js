// Function Declaration
function kgToGrams1(kg) {
  return kg * 1000;
}
console.log(kgToGrams1(5));

// Function Expression
const kgToGrams2 = function(kg) {
  return kg * 1000;
};
console.log(kgToGrams2(3)); // 3000

// Difference: Function declarations can be used anywhere in the code, even before you write them. Function expressions can only be used after you create them.

// Arrow Function (one line)
const kgToGrams3 = kg => kg * 1000;
console.log(kgToGrams3(7)); // 7000