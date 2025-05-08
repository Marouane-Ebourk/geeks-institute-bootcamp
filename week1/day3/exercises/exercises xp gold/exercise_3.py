import pprint
class MenuManager:

    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice_level": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice_level": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice_level": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice_level": "C", "gluten": False},
            {
                "name": "Beef bourguignon",
                "price": 25,
                "spice_level": "B",
                "gluten": True,
            },
        ]

    def add_item(self, name, price, spice, gluten):
        self.menu.append(
            {"name": name, "price": price, "spice": spice, "gluten": gluten}
        )

    def update_item(self, name, price, spice, gluten):
        for item in self.menu:
            if item["name"].lower() == name.lower():
                item.update(
                    {"price": price, "spice": spice, "gluten": gluten}
                )
                return
        print("This dish is not in the menu")

    def remove_item(self, name):
        for item in self.menu:
            if item["name"].lower() == name.lower():
                self.menu.remove(item)    
                print(f"The updated menu :")
                print(self.menu)
                return
        print("This dish is not in the menu")
    

menu_manager = MenuManager()
menu_manager.add_item('couscous', 100, 'B', False)
print("\n")
pprint.pprint(menu_manager.menu)

menu_manager.update_item('couscous', 10, 'C', False)
print("\n")
pprint.pprint(menu_manager.menu)

menu_manager.remove_item('Soup')
print("\n")
pprint.pprint(menu_manager.menu)
                