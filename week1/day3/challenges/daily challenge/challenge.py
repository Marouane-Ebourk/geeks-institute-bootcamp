class Farm:

    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = dict()

    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals.keys():
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count

    def get_info(self):
        info_string = ""
        info_string += self.name + "'s Farm\n\n"

        for animal, count in self.animals.items():
            info_string += f"{animal}: {count}\n"

        info_string += "\nE-I-E-I-0!"
        return info_string
    
    def get_animal_types(self):
        return sorted(self.animals.keys())

    # McDonald’s farm has cows, goats and sheep
    def get_short_info(self):
        animal_types = self.get_animal_types()
        info = f"{self.name}'s farm has"
        for i in range(len(animal_types)):
            animal = animal_types[i]
            if self.animals[animal] > 1:
                info += f" {animal}s"
            else:
                info += f" {animal}"
            if i != len(animal_types) - 1:
                info += ","
        return info

macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 1)
print(macdonald.get_info())
print(macdonald.get_short_info())
