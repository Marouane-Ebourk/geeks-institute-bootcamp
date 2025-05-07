cars = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

# convert into a list
cars = cars.split(', ')

print(f"There are {len(cars)} manufacturers")

# print in reverse (Z-A)
cars.sort(reverse=True)
for car in cars:
    print(car)

# count cars that have an 'o' and cars that don't have an 'i'
o_cars_count = 0
non_i_cars_count = 0
for car in cars:
    if 'o' in car.lower():
        o_cars_count += 1
    if 'i' not in car.lower():
        non_i_cars_count += 1

print(f"{o_cars_count} cars have 'o' in their name")
print(f"{non_i_cars_count} cars do not have 'i' in their name")

cars = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
# convert to set to remove duplicates
non_duplicate_cars_list = list(set(cars))

print(', '.join(non_duplicate_cars_list))
print(f"There are now {len(non_duplicate_cars_list)} manufacturers")

non_duplicate_cars_list.sort()
for car in non_duplicate_cars_list :
    print(car[::-1])
