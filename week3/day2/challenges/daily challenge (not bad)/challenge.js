// Create a variable called sentence. The value of the variable should be a string that contains the words “not” and “bad”.
// For example, “The movie is not that bad, I like it”.

let sentence = "The weather today is not even that bad, I dig it."
// Create a variable called wordNot where it’s value is the first appearance (ie. the position) of the substring “not” (from the sentence variable).

const wordNot = sentence.indexOf("not")
const wordBad = sentence.indexOf("bad")

console.log(wordNot, wordBad)
if (wordBad > wordNot && wordBad != -1 && wordBad != -1) {
    before = sentence.slice(0, wordNot)
    console.log(before)

    after = sentence.slice (wordBad+3, sentence.length - 1 )
    console.log(after)

    console.log(before + "good" + after)
}
else {
    console.log(sentence)
}
