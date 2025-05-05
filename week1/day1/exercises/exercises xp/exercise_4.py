"""
Write code that will ask the user for their height in centimeters.
If they are over 145cm print a message that states they are tall enough to ride.
If they are not tall enough print a message that says they need to grow some more to ride.
"""

height = int(input("Give me your height in centimeters : "))
if height > 145:
    print("You are tall enough ride")
else:
    print("You need to grow some more to ride")
