/*
Prompt the user for several words (separated by commas).
Put the words into an array.
Console.log the words one per line, in a rectangular frame as seen below.
Check out the Hints and Requirements below.
*/
const prompt = require('prompt-sync')()


// collect the words
const words = []
var longest_word_len = 0
for (let i = 0; i < 4; i ++ ) {
    let word = prompt('Please provide a word: ');
    words.push(word)
    if (word.length > 0 && word.length > longest_word_len)
        longest_word_len = word.length
}

// the top of the box ( we added 4 stars: 2 in each side for padding)
console.log("*".repeat(longest_word_len + 4))

words.forEach(word => {
    var line = ""    
    line += "* "
    line += word
    line += " ".repeat(longest_word_len - word.length)
    line += " *"
    console.log(line)
})

console.log("*".repeat(longest_word_len + 4))

