from challenge import Board

class Game:

    def __init__(self, board):

        if not isinstance(board, Board):
            raise Exception("Argument should be a Board instance")

        self.board = board

    def get_user_item(self):
        position = int(input("Please enter your position (1-9) : "))
        if position < 1 or position > 9:
            raise Exception("Position should be between 1 and 9.")
        return position

    def get_game_result(self):
        pass

    def play(self):
        while True:
            print(self.board.current_mark)
            self.board.display()
            position = self.get_user_item()
            self.board.place_mark(position)
            win = self.board.check_win()
            if win:
                self.board.display()
                break
            tie = self.board.check_tie()
            if tie:
                self.board.display()
                break
            self.board.switch_player()
        

# start the game
board = Board()
game = Game(board)
game.play()

