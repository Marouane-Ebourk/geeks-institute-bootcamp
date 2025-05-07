import random

# generate a random temperature according to the season
def get_random_temp(season):
    if season == 'winter':
        return float(random.randint(-10, 16))
    elif season == 'spring':
        return float(random.randint(5, 23))
    elif season == 'summer':
        return float(random.randint(20, 40))
    elif season == 'autumn':
        return float(random.randint(5, 24))
    else:
        print("Invalid season !")

# determine the season depending on the month
def determine_season(month):
    if month in [12, 1, 2]:
        return 'winter'
    elif month in [3, 4, 5]:
        return 'spring'
    elif month in [6, 7, 8]:
        return 'summer'
    elif month in [9, 10, 11]:
        return 'autumn'
    else:
        print("Invalid month !")


def main():
    month = int(input("Enter the number of the month (1 - 12) : "))
    season = determine_season(month)
    temp = get_random_temp(season)
    print(f"The temperature right now is {temp} degrees Celsius.")

    # print a message according to the temperature generated
    if temp < 0:
        print("Brrr, that's freezing! Wear some extra layers today.")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don't forget your coat.")
    elif 17 <= temp <= 23:
        print("Pleasant weather. A light jacket should do.")
    elif 24 <= temp <= 32:
        print("It's getting warm. Stay hydrated!")
    elif temp > 32:
        print("It's very hot! Make sure to drink plenty of water and stay cool.")


main()