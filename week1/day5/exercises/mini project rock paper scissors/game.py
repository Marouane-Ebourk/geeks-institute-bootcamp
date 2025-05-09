import random


class Game:

    def __init__(self):
        pass

    def get_user_item(self):
        while True:
            items = {"r": "rock", "p": "paper", "s": "scissors"}
            item_choice = input(
                "\nplease choose an item :\nr - rock\np - paper\ns - scissors\n"
            ).lower()
            if item_choice == "r" or item_choice == "p" or item_choice == "s":
                return items[item_choice]
            else:
                print("please choose one of the items !")

    def get_computer_item(self):
        return random.choice(["rock", "paper", "scissors"])

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"

        outcomes = {
            ("rock", "scissors"): "win",
            ("scissors", "paper"): "win",
            ("paper", "rock"): "win",
            ("scissors", "rock"): "lose",
            ("paper", "scissors"): "lose",
            ("rock", "paper"): "lose",
        }
        return outcomes[(user_item, computer_item)]

    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()

        result = self.get_game_result(user_item, computer_item)

        if result == "win":
            print(f"\nYou selected {user_item}. The computer selected {computer_item}. You won!\n")
        elif result == "lose":
            print(f"\nYou selected {user_item}. The computer selected {computer_item}. You lost!\n")
        elif result == "draw":
            print(f"\nYou selected {user_item}. The computer selected {computer_item}. You drew!\n")
        
        return result
