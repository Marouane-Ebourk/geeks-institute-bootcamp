class Person:
    def __init__(self, first_name, age, last_name=""):
        self.first_name = first_name
        self.age = age
        self.last_name = last_name

    def is_18(self):
        return self.age >= 18


class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        person = Person(first_name, age, self.last_name)
        self.members.append(person)

    def check_majority(self, first_name):
        for person in self.members:
            if person.first_name == first_name:
                if person.is_18():
                    print(
                        "You are over 18, your parents Jane and John accept that you will go out with your friends"
                    )
                    return
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                    return
        print("this person does not belong to this family")

    def family_presentation(self):
        print(f"Family's name: {self.last_name}")
        for member in self.members:
            print(f"name: {member.first_name}, age: {member.age}.")


family = Family("Ebourk")
family.born("Marouane", 23)
family.born("Jihane", 10)
family.check_majority("Marouane")
family.family_presentation()

