from exercise_2 import Dog
import random

class PetDog(Dog):
    def __init__(self, name, age, weight): 
        super().__init__(name, age, weight)
        self.trained = False

    def train(self): 
        print(self.bark())
        self.trained = True

    def play(self, *args):
        result = ""
        for dog in args:
            result += (', ' if args.index(dog) != 0 else '') + dog.name

        result += " are all playing together"
        print(result)

    def do_a_trick(self):
        if self.trained:
            tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
            print(f"{self.name} {random.choice(tricks)}")

# Test PetDog methods
my_dog = PetDog("Fido", 2, 10)
my_dog.train()
dog1 = PetDog("Buddy", 4, 3)
dog2 = PetDog("Max", 4, 3)
my_dog.play(dog1, dog2)
my_dog.do_a_trick()