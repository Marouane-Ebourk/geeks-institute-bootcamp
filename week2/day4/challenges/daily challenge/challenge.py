import requests
import random
import psycopg2
import pprint

HOSTNAME = "localhost"
USERNAME = "postgres"
PASSWORD = "password"
DATABASE = "example"


def get_random_countries(n=10):
    url = "https://restcountries.com/v3.1/all"
    response = requests.get(url)
    response.raise_for_status()
    countries = response.json()
    selected = random.sample(countries, n)
    # Extract name, capital, flag, subregion, population for each
    result = []
    for c in selected:
        name = c["name"]["common"]
        capital = c.get("capital", [None])[0] if c.get("capital") else None
        flag = c.get("flags", {}).get("png") or c.get("flags", {}).get("svg")
        subregion = c.get("subregion", None)
        population = c.get("population", None)
        result.append((name, capital, flag, subregion, population))
    return result


def write_countries_to_db(countries):
    connection = psycopg2.connect(
        host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE
    )
    cursor = connection.cursor()
    # Create table if not exists
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS random_countries (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            capital VARCHAR(100),
            flag TEXT,
            subregion VARCHAR(100),
            population BIGINT
        )
    """
    )
    for name, capital, flag, subregion, population in countries:
        cursor.execute(
            "INSERT INTO random_countries (name, capital, flag, subregion, population) VALUES (%s, %s, %s, %s, %s)",
            (name, capital, flag, subregion, population),
        )
    connection.commit()
    cursor.close()
    connection.close()


if __name__ == "__main__":
    countries = get_random_countries(10)
    write_countries_to_db(countries)
    print("10 random countries have been written to the database.")
