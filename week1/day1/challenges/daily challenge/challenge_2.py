# Write a program that asks a string to the user, and display a new string with any duplicate consecutive letters removed.

word = input("Give me a word : ")
result = ""
for char in word:
    if (char not in result):
        result += char
print(result)