names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

# ask the user for their name
user_name = input("Please type in your name : ")

# print out the index of the first occurrence of their name in the list
for name in names :
    if user_name.capitalize() == name:
        print (f"The index of your name in the list is {names.index(name)}")
        break
