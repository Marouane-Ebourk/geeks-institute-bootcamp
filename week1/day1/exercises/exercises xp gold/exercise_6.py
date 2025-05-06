import random

games_won = 0
games_lost = 0
while True:
    # ask the user to input a number from 1 to 9 (including).
    user_input = input("Give me a number from 1 to 9 (to exit enter x): ")
    if user_input == "x" or int(user_input) > 9 or int(user_input) < 1 : 
        print(f"Games won : {games_won}, games lost : {games_lost}")
        print("Goodbye !")
        break
    else :
        number = int(user_input) 

    # get a random number between 1 and 9. Hint: random module.
    random_number = random.randint(0, 9)

    # if the user guesses the correct number print a message that says “Winner”.
    if number == random_number :
        games_won += 1
        print("Winner")

    # if the user guesses the wrong number print a message that says “Better luck next time.”
    else :
        games_lost += 1
        print("Better luck next time")
