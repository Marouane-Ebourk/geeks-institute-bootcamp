class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        self_power = self.run_speed() * self.weight
        other_dog_power = other_dog.run_speed() * other_dog.weight

        if self_power > other_dog_power:
            return f'{self.name.capitalize()} wins {other_dog.name} in a fight.'
        else:
            return f'{other_dog.name.capitalize()} wins {self.name} in a fight.'

dog1 = Dog('Bob', 14, 14)
dog2 = Dog('Cooper', 2, 4)
dog3 = Dog('Tango', 3, 20)


print(dog1.bark())
print(dog2.run_speed())
print(dog1.fight(dog2))