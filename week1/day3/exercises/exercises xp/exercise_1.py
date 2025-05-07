class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat_1 = Cat("whiskers", 3)
cat_2 = Cat("snowy", 7)
cat_3 = Cat("bear", 2)

def find_oldest_cat(cat_1, cat_2, cat_3):
    max = float('-inf')
    oldest_cat = None
    for cat in [cat_1, cat_2, cat_3]:
        if cat.age > max :
            max =  cat.age
            oldest_cat = cat
    
    return oldest_cat


oldest_cat = find_oldest_cat(cat_1, cat_2, cat_3)
print(f"The oldest cat is {oldest_cat.name} and its age is {oldest_cat.age}")