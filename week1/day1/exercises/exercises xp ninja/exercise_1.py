# I'll try to predict the outputs of these code snippets

# 3 <= 3 < 9
# output : True

# 3 == 3 == 3
# output : True

# bool(0)
# output : False

# bool(5 == "5")
# output : False

# bool(4 == 4) == bool("4" == "4")
# output : True

# bool(bool(None))
# output : False

"""
x = (1 == True)
y = (1 == False)
a = True + 4
b = False + 10

print("x is", x)
print("y is", y)
print("a:", a)
print("b:", b)
"""

# output
"""
x is True
y is False
a: 5
b: 10
"""