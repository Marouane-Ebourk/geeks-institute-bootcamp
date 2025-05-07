"""
Ask a user for a word.
Write a program that creates a dictionary. This dictionary stores the indexes of each letter in a list.
Make sure the letters are the keys.
Make sure the letters are strings.
Make sure the indexes are stored in a list, and those lists are values.

Examples
“dodo” ➞ { “d”: [0, 2], “o”: [1, 3] }
“froggy” ➞ { “f”: [0], “r”: [1], “o”: [2], “g”: [3, 4], “y”: [5] }
“grapes” ➞ { “g”: [0], “r”: [1], “a”: [2], “p”: [3] }
"""
import pprint

word = input("Please give me a word : ")
char_dict = dict()
for index in range(len(word)):
    char = word[index]

    if char in char_dict.keys():
        char_dict[char].append(index)
    else:
        char_dict[char] = [index]

print (word , "->", char_dict)
