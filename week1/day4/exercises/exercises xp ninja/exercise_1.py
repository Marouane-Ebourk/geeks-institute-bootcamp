import os
import time
import random

class Cell:
    def __init__(self, alive):
        self.alive = alive

class Grid:
    def __init__(self, size):
        self.size = size
        self.grid = self.fill_grid()

    def fill_grid(self):
        grid = []
        for i in range(self.size):
            row = []
            for j in range(self.size):
                cell_life = random.choice([True, False])
                row.append(Cell(cell_life))
            grid.append(row)
        return grid

    def display_grid(self):
        for i in range(self.size):
            for j in range(self.size):
                if self.grid[i][j].alive:
                    print("1", end=" ")
                else:
                    print("0", end=" ")
            print("")

    def count_alive_neighbors(self, x, y):
        count = 0
        for i in range(x - 1, x + 2):
            for j in range(y - 1, y + 2):
                if (i == x and j == y) or i < 0 or j < 0 or i >= self.size or j >= self.size:
                    continue  # skip the cell itself and out-of-bounds cells
                if self.grid[i][j].alive:
                    count += 1
        return count

    def next_generation(self):
        new_grid = []
        for i in range(self.size):
            new_row = []
            for j in range(self.size):
                neighbors = self.count_alive_neighbors(i, j)
                is_alive = self.grid[i][j].alive

                if is_alive:
                    # Living cell
                    if neighbors == 2 or neighbors == 3:
                        new_life = True
                    else:
                        new_life = False
                else:
                    # Dead cell
                    if neighbors == 3:
                        new_life = True
                    else:
                        new_life = False

                new_row.append(Cell(new_life))
            new_grid.append(new_row)
        self.grid = new_grid

def main():
    size = int(input("Enter the size of the grid: "))
    generations = int(input("Enter the number of generations to simulate: "))
    grid = Grid(size)
    grid.display_grid()
    time.sleep(1)
    os.system("cls" if os.name == "nt" else "clear")
    
    for i in range(generations):
        grid.next_generation()
        grid.display_grid()
        time.sleep(1)
        # clear for windows
        os.system("cls")

main()
