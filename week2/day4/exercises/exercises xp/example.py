from fastapi import FastAPI
from psycopg2.extras import RealDictCursor
import uvicorn
import psycopg2

HOSTNAME = "localhost"
USERNAME = "postgres"
PASSWORD = "password"
DATABASE = "dvdrental"

app = FastAPI()


# Function to get a new database connection
def get_db_connection():
    return psycopg2.connect(
        host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE
    )


@app.get("/customers")
def get_customers():
    connection = get_db_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT first_name, last_name FROM customer LIMIT 20;")
    results = cursor.fetchall()
    connection.close()
    return results


# Uncomment the following lines to run with: python example.py
if __name__ == "__main__":
    uvicorn.run("example:app", host="127.0.0.1", port=8000, reload=True)
