# Ask the user to input a month (1 to 12).
month = int(input("Please insert the month (1 - 12) : "))

# Display the season
# Spring 3  -  5
# Summer 6  -  8
# Autumn 9  -  11
# Winter 12 -  2
if month >= 3 and month <= 5 :
    print("The season is spring")
elif month >= 6 and month <= 8 :
    print("The season is summer")
elif month >= 9 and month <= 11 :
    print("The season is autumn")
elif month >= 12 and month <= 2 :
    print("The season is winter")