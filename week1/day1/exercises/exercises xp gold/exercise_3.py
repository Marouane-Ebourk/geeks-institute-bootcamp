# Write a while loop that will continuously ask the user for their name, unless the input is equal to your name.
while True:
    name = input("Give me your name. I'll check if it's like mine : ")
    if name.lower() == "marouane" :
        print("here you go !")
        break
    else :
        print("try again")