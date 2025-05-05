basket = ["Banana", "Apples", "Oranges", "Blueberries"];

# Remove Banana from the list.
basket.remove("Banana");

# Remove Blueberries from the list.
basket.remove("Blueberries");

# Add Kiwi to the end of the list. 
basket.append("Kiwi");

# Add Apples to the beginning of the list.
basket.insert(0, "Apples");

# Count how many apples are in the basket
apples_count = 0
for fruit in basket :
    if (fruit == "Apples"):
        apples_count += 1
print (f"There are {apples_count} apples");

# Empty the basket.
basket.clear()

# Print(basket)
print(basket)