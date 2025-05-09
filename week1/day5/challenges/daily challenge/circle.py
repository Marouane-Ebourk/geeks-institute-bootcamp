import math
import turtle

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self._radius = radius
        elif diameter is not None:
            self._radius = diameter / 2
        else:
            raise ValueError("radius or diameter must be specified")

    @property
    def radius(self):
        return self._radius

    @property
    def diameter(self):
        return self._radius * 2

    @property
    def area(self):
        return math.pi * self._radius ** 2

    def __str__(self):
        return f"radius: {round(self.radius, 2)}, diameter: {round(self.diameter, 2)}, area: {round(self.area, 2)}"

    def __add__(self, other):
        return Circle(radius=self.radius + other.radius)

    def __eq__(self, other):
        return isinstance(other, Circle) and self.radius == other.radius

    def __gt__(self, other):
        return self.radius > other.radius

    def __ge__(self, other):
        return self.radius >= other.radius

circle1 = Circle(radius=50)
circle2 = Circle(diameter=160)
circle3 = circle1 + circle2
circles = [circle1, circle2, circle3]

circles.sort()

for circle in circles:
    print(circle)

s = turtle.getscreen()
t = turtle.Turtle()

for circle in circles:
    t.circle(circle.radius)

turtle.done()