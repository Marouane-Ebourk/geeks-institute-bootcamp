// Create a function that:

// takes in two strings as two parameters
// and returns a boolean that indicates whether or not the first string is an anagram of the second string.

function isAnagram(string1, string2) {
    // turn both strings into lowercase and trim the whitespaces and then turn them into an array and then sort them
    const string1Letters = string1.toLowerCase().replaceAll(/\s+/g, "").split("").sort()
    const string2Letters = string2.toLowerCase().replaceAll(/\s+/g, "").split("").sort()
    const areStringsAnagrams =  string1Letters.every((letter, index) => letter == string2Letters[index])
    return areStringsAnagrams;
}

isAnagram("Astronomer", "Moon starer");
isAnagram("School master", "The classroom");
isAnagram("The Morse Code", "Here come dots");
isAnagram("slkdfj", "sdfl")