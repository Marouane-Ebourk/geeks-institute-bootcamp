family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}

total_cost = 0

# print out what each member has to pay
for member, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    
    print(f"{member} has to pay {price} dhs")
    total_cost += price

# print out the total cost
print(f"Total cost for the family: {total_cost} dhs")

# ask the user to fill out an object of family member's and their ages
family = {}
while True:
    name = input("Enter the family member's name (enter x to exit): ")
    if name.lower() == 'x':
        break
    age = int(input(f"Enter {name}'s age: "))
    family[name] = age

print(family.items())