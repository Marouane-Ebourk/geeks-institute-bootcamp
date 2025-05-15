# menu_item.py

class MenuItem:
    def __init__(self, name, price=0):
        self.name = name
        self.price = price

    def save(self, connection):
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO menu_items (item_name, item_price) VALUES (%s, %s)",
            (self.name, self.price),
        )
        connection.commit()
        cursor.close()

    def delete(self, connection):
        cursor = connection.cursor()
        cursor.execute("DELETE FROM menu_items WHERE item_name = %s", (self.name,))
        connection.commit()
        cursor.close()

    def update(self, connection, new_name=None, new_price=None):
        cursor = connection.cursor()
        if new_name is not None and new_price is not None:
            cursor.execute(
                "UPDATE menu_items SET item_name = %s, item_price = %s WHERE item_name = %s",
                (new_name, new_price, self.name),
            )
            self.name = new_name
            self.price = new_price
        elif new_name is not None:
            cursor.execute(
                "UPDATE menu_items SET item_name = %s WHERE item_name = %s",
                (new_name, self.name),
            )
            self.name = new_name
        elif new_price is not None:
            cursor.execute(
                "UPDATE menu_items SET item_price = %s WHERE item_name = %s",
                (new_price, self.name),
            )
            self.price = new_price
        connection.commit()
        cursor.close()

# menu_manager.py

class MenuManager:

    @classmethod
    def get_by_name(cls, connection, name):
        cursor = connection.cursor()
        cursor.execute("select item_name, item_price from menu_Items where item_name = %s", (name,))
        result = cursor.fetchone()
        cursor.close()
        if result:
            return result
        return None

    @classmethod
    def all_items(cls, connection):
        cursor = connection.cursor()
        cursor.execute("select item_name, item_price from menu_items")
        results = cursor.fetchall()
        cursor.close()
        return results
        
# menu_editor.py

import psycopg2
# from menu_item import MenuItem
# from menu_manager import MenuManager

HOSTNAME = "localhost"
USERNAME = "postgres"
PASSWORD = "password"
DATABASE = "restaurant"
connection = psycopg2.connect(
    host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE
)


program_running = True

def show_user_menu():
    global program_running
    choice = input(
        """Please choose an option :
Add an Item (A)
Delete an Item (D)
Update an Item (U)
Show the Menu (S)
Exit (E)
"""
    )
    if choice.lower() not in ["a", "d", "u", "s", "e"]:
        raise Exception("Not a valid option")
    else:
        # run the appropriate function
        if choice.lower() == "a":
            add_item_to_menu()
        elif choice.lower() == "d":
            remove_item_from_menu()
        elif choice.lower() == "u":
            update_item_from_menu()
        elif choice.lower() == "s":
            show_restaurant_menu()
        elif choice.lower() == "e":
            print("Exiting the program.")
            show_restaurant_menu();
            program_running = False


def add_item_to_menu():
    name = input("Please enter the item's name : ")
    price = int(input("Please enter the item's price : "))

    try:
        item = MenuItem(name, price)
        item.save(connection)
        print("Item was added successfully")
    except Exception as e:
        print(f"There was an error adding the item: {e}")


def remove_item_from_menu():
    name = input("Please enter item's name : ")
    try:
        item = MenuItem(name)
        item.delete(connection)
        print("Item was deleted successfully.")
    except Exception as e:
        print(f"There was an error deleting the item: {e}")


def update_item_from_menu():
    old_name = input("Please enter the item's current name : ")
    old_price = int(input("Please enter the item's current price : "))
    new_name = input("Please enter the new name : ")
    new_price = int(input("Please enter the new price : "))
    try:
        item = MenuItem(old_name, old_price)
        item.update(connection, new_name=new_name, new_price=new_price)
        print("Item was updated successfully.")
    except Exception as e:
        print(f"There was an error updating the item: {e}")

def show_restaurant_menu():
    try:
        items = MenuManager.all_items(connection)
        for item in items:
            print(f"Name: {item[0]}, Price: {item[1]}")
    except Exception as e:
        print(f"There was an error showing the menu: {e}")


if __name__ == "__main__":
    while program_running:
        show_user_menu()