from game import Game

def get_user_menu_choice():
    choice = input("""Menu:\n(g) Play a new game\n(x) Show scores and exit\n""").lower()

    if choice != "g" and choice != "x":
        raise Exception("This choice is not valid !")

    return choice

def print_results(results):
    if len(results) == 0:
        print("No games were played!")
    else:
        print("\nHere are the results of the games:")
        for result in results:
            print(result.upper())

def main():
    results = []
    while True:
        menu_choice = get_user_menu_choice()
        if menu_choice == "x":
            print_results(results)
            break

        elif menu_choice == "g":
            game = Game()
            result = game.play()
            results.append(result)

main()




