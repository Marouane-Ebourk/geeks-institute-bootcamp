from game import Game

def get_user_menu_choice():
    choice = input("""Menu:\n(g) Play a new game\n(x) Show scores and exit\n""").lower()

    if choice != "g" and choice != "x":
        raise Exception("This choice is not valid !")

    return choice

def print_results(results):
    print("\nHere are the results of the games:")
    for key, value in results.items():
        print(f"{key}: {value}")
    

def main():
    results = {"win": 0, "lose": 0, "draw": 0}
    while True:
        menu_choice = get_user_menu_choice()
        if menu_choice == "x":
            print_results(results)
            break

        elif menu_choice == "g":
            game = Game()
            result = game.play()
            results[result] += 1

main()




