// mergeWords('There')('is')('no')('spoon.')();
// should return 'There is no spoon.'

function mergeWords(string) {
    return function (nextString) {
        if (nextString == undefined) return string;
        else return mergeWords(`${string} ${nextString}`);
    };
}
result = mergeWords("There")("is")("no")("spoon.")();
console.log(result);

const mergeWords = (string) => (nextString) =>
    nextString === undefined ? string : mergeWords(`${string} ${nextString}`);

result = mergeWords("There")("is")("no")("spoon.")();
console.log(result);