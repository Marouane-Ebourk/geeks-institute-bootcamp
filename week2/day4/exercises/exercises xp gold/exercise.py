import psycopg2
from psycopg2.extras import RealDictCursor

HOSTNAME = "localhost"
USERNAME = "postgres"
PASSWORD = "password"
DATABASE = "example"

connection = psycopg2.connect(
    host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE
)

def get_db_connection():
    return psycopg2.connect(
        host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE
    )

def get_users():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("select username, password from users;")
    results = cursor.fetchall()
    connection.close()
    return results


users = get_users()

logged_in = None

def sign_up():
    while True:
        input_username = input("username: ")
        # Check if username already exists
        if any(input_username == username for username, _ in users):
            print("This username already exists! Try another one!")
            continue
        else:
            password = input("password: ")
            # Add new user to the database
            connection = get_db_connection()
            cursor = connection.cursor()
            cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s);", (input_username, password))
            connection.commit()
            connection.close()
            users.append((input_username, password))
            print("User signed up successfully!")
            break


def log_in():
    global logged_in
    username = input("username: ")

    # Check if username exists using a for loop
    user_tuple = None
    for u in users:
        if u[0] == username:
            user_tuple = u
            break

    if not user_tuple:
        print("This username doesn't exist.")
        choice = input("If you would like to sign up press S / exit E: ").lower()
        if choice == 's':
            sign_up()
        elif choice == 'e':
            return False
        else:
            raise Exception('choice not existant')
    else:
        password = input("password: ")
        if user_tuple[1] == password:
            print("you are logged in")
            logged_in = username
        else:
            print("Invalid password !")
            return False
    return True

while True:
    choice = input("choose one of these options: \nLogin (L) \nExit (E) \n")
    if choice.lower() == 'e':
        break
    elif choice.lower() == 'l':
        if log_in() == False:
            break
    else:
        raise Exception('choice not existant')

