class Dog:

    def __init__(self, name, height):
        self.name = name
        self.height = height
    def bark(self):
        print("goes woof!")

    def jump(self):
        print(f"jumps {self.height * 2} cm high!")

davids_dog = Dog("bear", 4) 
sarahs_dog = Dog("doggy", 3)

# print the name and height of each dog.
print(f"david's dog's name is {davids_dog.name}, and its height is {davids_dog.height}")
print(f"sarah's dog's name is {sarahs_dog.name}, and its height is {sarahs_dog.height}")

# Call the bark() and jump() methods for each dog.
davids_dog.bark()
davids_dog.jump()

sarahs_dog.bark()
sarahs_dog.jump()

# compare dog sizes
if davids_dog.height > sarahs_dog.height :
    print("david's dog is bigger")
else:
    print("sarah's dog is bigger")