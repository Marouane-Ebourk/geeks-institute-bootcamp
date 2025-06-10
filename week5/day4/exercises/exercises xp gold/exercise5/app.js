
function returnNumbers(string) {
    return string.match(/\d+/g)?.join('') || '';
}

console.log(returnNumbers("k5k3q2g5z6x9bn"))
console.log(returnNumbers("kkqgzx97bn"))