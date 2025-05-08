"""
Exercise 2 : Custom List Class
Instructions
Create a class called MyList, the class should receive a list of letters.
Add a method that returns the reversed list.
Add a method that returns the sorted list.
Bonus : Create a method that generates a second list with the same length as mylist. 
The list should be constructed with random numbers. (use list comprehension).
"""
import random

class MyList:

    def __init__(self, letters):
        self.letters = letters

    def get_reversed_list(self):
        return self.letters[::-1]

    def get_sorted_list(self):
        return sorted(self.letters)

    def get_random_numbers_list(self):
        return [random.randint(0, 9) for _ in range(len(self.letters))]


list = MyList(['a', 'b', 'g', 'a', 'c'])

print(list.get_reversed_list())
print(list.get_sorted_list())
print(list.get_random_numbers_list())