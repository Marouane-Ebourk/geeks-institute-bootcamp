# ask the user for 3 numbers
numbers = []
numbers.append(int(input("Input the 1st number : ")))
numbers.append(int(input("Input the 2nd number : ")))
numbers.append(int(input("Input the 3rd number : ")))

# find the greatest number
greatest_number = float("-inf");
print(greatest_number)
for number in numbers :
    if number > greatest_number :
        greatest_number = number

# print out the greatest number
print(f"The greatest number is: {greatest_number}")



