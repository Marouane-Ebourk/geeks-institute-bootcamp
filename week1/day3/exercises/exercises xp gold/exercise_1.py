"""
Write a class called Circle that receives a radius as an argument (default is 1.0).
Write two instance methods to compute perimeter and area.
Write a method that prints the geometrical definition of a circle.
"""
import math

class Circle:

    def __init__(self, radius=1.0):
        self.radius = radius

    def get_perimeter(self):
        return 2 * math.pi * self.radius

    def get_area(self):
        return math.pi * self.radius ** 2

    def get_definition(self):
        print("A circle is a shape consisting of all points in a plane that are at a given distance (radius) from a fixed point (the center).")

