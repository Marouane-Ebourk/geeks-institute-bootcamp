# Ask the user for a number and a length.
# Create a program that prints a list of multiples of the number until the list length reaches length.

number = int(input("Give me a number : "))
length = int(input("Give me a length : "))

multiples = []
for i in range(length):
    multiples.append(number * (i + 1))