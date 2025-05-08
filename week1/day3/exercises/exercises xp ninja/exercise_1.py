class Phone:

    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        print(f"{self.phone_number} called {other_phone}")
        self.call_history.append(other_phone)

    def show_call_history(self):
        print("Call history :")
        for phone_number in self.call_history:
            print(phone_number)

    def send_message(self, destination, content):
        message = dict()
        message["from"] = self.phone_number
        message["to"] = destination
        message["content"] = content

        self.messages.append(message)

    def show_outgoing_messages(self):
        print("Outgoing messages:")
        for message in self.messages:
            if message["from"] == self.phone_number:
                print(message)

    def show_incoming_messages(self):
        print("Incoming messages:")
        for message in self.messages:
            if message["to"] == self.phone_number:
                print(message)

    def show_messages_from(self ):
        print(f"Messages :")
        for message in self.messages:
            if message["from"] == self.phone_number:
                print(message)

# Create phone instances with Moroccan numbers
phone1 = Phone("+212612345678")
phone2 = Phone("+212698765432")
phone3 = Phone("+212655443322")

# Make some calls
phone1.call(phone2.phone_number)
phone2.call(phone1.phone_number)
phone3.call(phone1.phone_number)

# Send some messages
phone1.send_message(phone2.phone_number, "Salam! Labas 3lik?")
phone1.send_message(phone3.phone_number, "Kolchi bikhir ?")
phone2.send_message(phone1.phone_number, "Labas, shukran! W nta?")
phone3.send_message(phone1.phone_number, "Fin ghbrti a sahbi?")

# Show call history
phone1.show_call_history()

# Show outgoing messages for phone1
phone1.show_outgoing_messages()

# Show incoming messages for phone1
phone1.show_incoming_messages()

# Show messages phone1 received from phone2
phone1.show_messages_from()


