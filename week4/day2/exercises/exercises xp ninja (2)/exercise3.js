// Write a JavaScript function to find a word within a string.
// console.log(search_word('The quick brown foxfox', 'fox'));
// "'fox' was found 1 times."

function search_word(string, searchValue) {
    let nTimes = 0
    for (let i = 0; i < string.length - searchValue.length + 1; i++) {
        if (string.substring(i, i+searchValue.length) == searchValue) 
            nTimes += 1
    }
    return `'${searchValue}' was found ${nTimes} times.`
}

console.log(search_word("The quick brown foxfox", "fox"));
