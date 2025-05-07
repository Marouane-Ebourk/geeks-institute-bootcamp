matrix = [
    ["7", "i", "i"],
    ["T", "s", "x"],
    ["h", "%", "?"],
    ["i", " ", "#"],
    ["s", "M", " "],
    ["$", "a", " "],
    ["#", "t", "%"],
    ["^", "r", "!"],
]

decrypted_message = ""
# store the last added char to the decrypted message
last_char_added = ""
# loop through the cols
for col in range(len(matrix[0])):
    # loop through the rows 
    for row in range(len(matrix)):
        char = matrix[row][col]
        if char.isalpha():
            decrypted_message += char
            last_char_added = char
        elif last_char_added.isalpha():
            decrypted_message += " "
            last_char_added = char


print(decrypted_message)