class Board():

    # 3 x 3 by default
    def __init__(self, cols=3, rows=3):
        self.cols = cols
        self.rows = rows
        self.board = [ ['-' for _ in range(self.cols)]  for _ in range(self.rows)]
        self.current_mark = "x"

    def display(self):
        printed_row = ""
        for row in range(self.rows):
            for col in range(self.cols):
                position = self.board[row][col]
                if position == '-':
                    printed_row += f" {row * self.cols + col + 1} "
                elif position == "x":
                    printed_row += " X "
                elif position == "o":
                    printed_row += " O "

                # draw side line if not end of row
                if col < self.cols - 1:
                    printed_row += " | "
            
            # if end then just draw the raw
            print(printed_row)
            printed_row = ""
            if row < self.rows-1:
                print("---------------")
                

    def switch_player(self):
        self.current_mark = "x" if self.current_mark == "o" else "o"

    def place_mark(self, position):
        # position is between 1 and 9
        # 1    2    3
        # 0,0  0,1  0,2

        # 4    5    6
        # 1,0  1,1  1,2

        # 7    8    9
        # 2,0  2,1  2,2
        row = (position - 1) // self.rows
        col = (position - 1) % self.cols
        if self.board[row][col] == "-":
            self.board[row][col] = self.current_mark
        else:
            print("Position is filled ! Try again !")
    
    def check_win(self):
        # check horizontally : check all the rows
        for row in self.board:
            win = row[0] != "-" and all(cell == row[0] for cell in row)
            if win:
                print(f"player {self.current_mark} won !")
                return True
        
        # check vertically : check all the columns
        for col_index in range(self.cols):
            win = self.board[0][col_index] != "-" and all(self.board[row_index][col_index] == self.current_mark for row_index in range(self.rows) )
            if win:
                print(f"player {self.current_mark} won !")
                return True

        # check diagonally 
        # Primary diagonal (0, 0) (1, 1) (2, 2)
        primary = [self.board[i][i] for i in range(3)]
        win =  primary[0] != "-" and all(cell == primary[0] for cell in primary)
        if win:
            print(f"player {self.current_mark} won !")
            return True

        # Secondary diagonal
        secondary = [self.board[i][2 - i] for i in range(3)]
        win =  secondary[0] != "-" and all(cell == secondary[0] for cell in secondary)
        if win:
            print(f"player {self.current_mark} won !")
            return True


        return False

    def check_tie(self):
        for row in self.board:
            if "-" in row:
                return False  # Still empty spots, not a draw yet
        print("It's a tie !")
        return True  # All spots filled, and no winner (checked separately
