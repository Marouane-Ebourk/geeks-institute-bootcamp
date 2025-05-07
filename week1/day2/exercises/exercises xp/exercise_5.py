import random

# function that compares a random number and a guessed number
def guess_number(number):
    random_number = random.randint(1, 100)

    if number == random_number:
        print("Success! it's the correct number!")
    else:
        print("Fail! it's not the correct number!.")
        print(f"Your number: {number}, Random number: {random_number}")

guess_number(3)