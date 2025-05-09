class BankAccount:

    def __init__(self, username, password, balance=0, authenticated=False):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = authenticated

    def authenticate(self, username, password):
        if username == self.username and password == self.password:
            self.authenticated = True
        else:
            raise Exception("Credentials invalid !")

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("You're not authenticated !")

        if amount > 0:
            self.balance += amount
        else:
            raise Exception("The amount is not positive !")

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You're not authenticated !")

        if amount > 0:
            self.balance -= amount
        else:
            raise Exception("The amount is not positive !")


class MinimumBalanceAccount(BankAccount):

    def __init__(self, username, password, balance, authenticated, minimum_balance=0):
        super().__init__(username, password, balance, authenticated)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if amount > 0 and self.balance - amount > self.minimum_balance:
            self.balance -= amount
        else:
            raise Exception("This would make you go below your minimum balance !")


# TODO: bonus 

account = MinimumBalanceAccount(10, 4)
print(account.balance)
account.withdraw(3)
print(account.balance)
