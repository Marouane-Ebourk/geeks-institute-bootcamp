"""
Write a function that accepts one parameter (an int: X) and returns the value of X+XX+XXX+XXXX.
Example:

If X=3, the output when calling our function should be 3702 (3 + 33 + 333 + 3333)

Hint: Treating our number as an int or a str at different points in our code may be helpful.
"""

number_string = input("Please give me a number : ")

sum = 0
for iterations in range(1, 5):
    number = int(number_string * iterations)
    sum += number

print(f"the sum is : {sum}")