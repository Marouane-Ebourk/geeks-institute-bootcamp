birthdays = {
    "marouane": "2002/03/19",
    "zaineb": "2010/02/17",
    "jihane": "2005/06/15",
}

print("You can look up the birthdays of the people in the list! \n")

for name, birthday in birthdays.items():
    print(f"{name}    :   {birthday}")

name = input("Please give me a name : ")

if name in birthdays.keys():
    print(f"{name}'s birthday is on {birthdays[name]}")
else:
    print("Sorry, we don't have the birthday information for person's name")