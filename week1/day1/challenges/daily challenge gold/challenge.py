from datetime import datetime

# Ask the user for their birthdate (specify the format, for example: DD/MM/YYYY).
birthdate = input("Give me your birthdate under this format DD/MM/YYYY :\n")
try:
    birth_day = int(birthdate.split("/")[0])
    birth_month = int(birthdate.split("/")[1])
    birth_year = int(birthdate.split("/")[2])
except Exception as e:
    print("Wrong format !")
    exit()

# calculate the age exactly
current_date = datetime.today()
years_diff = current_date.year - birth_year
month_diff = current_date.month - birth_month
day_diff = current_date.day - birth_day

if current_date.month < birth_month or (
    current_date.month == birth_month and birth_day < birthdate.day
):
    age = years_diff - 1
else:
    age = years_diff

# calculate the number of candles
candles_count = age % 10

# the base template of the cake
cake_image = """      |:H:a:p:p:y:|
    __|___________|__
   |^^^^^^^^^^^^^^^^^|
   |:B:i:r:t:h:d:a:y:|
   |                 |
   ~~~~~~~~~~~~~~~~~~~
"""
# the padding needed before drawing the cake
padding = "       "
# the space on top of the cake
available_space = 11
# the remaining space on the sides of the candles ( to center the candles )
side_padding = (available_space - candles_count) // 2

# detect if leap year
# it should be divisible by 4, and not divisible by 100 unless it is also divisible by 400
is_leap = False
if (birth_year % 4 == 0) and (birth_year % 100 != 0 or birth_year % 400 == 0):
    is_leap = True

# print the cakes
print(padding + "_" * side_padding + "i" * candles_count + "_" * side_padding)
print(cake_image)
# print the second cake if it is a leap year
if is_leap:
    print(padding + "_" * side_padding + "i" * candles_count + "_" * side_padding)
    print(cake_image)

