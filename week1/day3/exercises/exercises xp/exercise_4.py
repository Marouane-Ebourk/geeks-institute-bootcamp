class Zoo:

    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        self.animals.append(new_animal)

    def get_animals(self):
        for animal in self.animals:
            print(animal)
    
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold) 

    def sort_animals(self):
        animals = sorted(self.animals)
        grouped_sorted_animals = dict()
        for animal in animals:
            first_letter = animal[0].upper()
            # if it exists add it
            if first_letter in grouped_sorted_animals.keys():
                grouped_sorted_animals[first_letter].append(animal)
            # if it doesn't create it 
            else:
                grouped_sorted_animals[first_letter] = [animal]
        return grouped_sorted_animals

    def get_groups(self):
        sorted_animals = self.sort_animals()
        for letter, animals in sorted_animals.items():
            print(f"{letter}: {animals}")

ramat_gan_safari = Zoo("Ramat Gan Safari")

# Step 3: Use the Zoo methods
ramat_gan_safari.add_animal("Giraffe")
ramat_gan_safari.add_animal("Bear")
ramat_gan_safari.add_animal("Baboon")
ramat_gan_safari.add_animal("Zebra")
ramat_gan_safari.get_animals()
ramat_gan_safari.sell_animal("Bear")
print("\n")
ramat_gan_safari.get_animals()
ramat_gan_safari.sort_animals()
print("\n")
ramat_gan_safari.get_groups()
    