import os
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from contextlib import contextmanager

load_dotenv()

DB_CONFIG = {
    "dbname": os.getenv("POSTGRES_DB", "dev"), 
    "user": os.getenv("POSTGRES_USER", "postgres"), 
    "password": os.getenv("POSTGRES_PASSWORD", "password"), 
    "host": os.getenv("POSTGRES_HOST", "localhost"), 
    "port": os.getenv("POSTGRES_PORT", "5432") 
}

app = FastAPI()

@contextmanager
def get_connection():
    connection = None
    try:
        connection = psycopg2.connect(**DB_CONFIG)
        yield connection
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error while connecting to database: {str(e)}")
    finally:
        if connection is not None:
            connection.close()

# validation
class CountryBase(BaseModel):
    country: str

class CountryCreate(CountryBase):
    pass

class CountryUpdate(BaseModel):
    country: str

class CityBase(BaseModel):
    city: str
    country: str

class CityCreate(CityBase):
    pass

class CityUpdate(BaseModel):
    city: str

@app.get("/cities", response_model=List[CityBase])
def get_cities(skip: int=0, limit: int = 100):
    """
    Retrieve a list of cities with their country names.

    Args:
        skip (int): Number of records to skip for pagination.
        limit (int): Maximum number of records to return.

    Returns:
        List[CityBase]: List of cities with their country names.
    """
    try:
        with get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    select city.city, country.country 
                    from city
                    join country on country.country_id = city.country_id
                    offset %s limit %s;
                    """
                    ,(skip, limit)
                )
                cities = cur.fetchall()
                if cities is None:
                    print(f"cities not found")
                    raise HTTPException(status_code=404, detail="Cities not found!")
                
                print(f"Retrieved all the cities")
                return cities
    except HTTPException:
        # Re-raise HTTPExceptions (like 404) without modification
        raise
    except Exception as e:
        print("Error retrieving cities")
        print(e)
        raise HTTPException(status_code=500, detail="Error retrieving cities")

@app.get("/countries", response_model=List[CountryBase])
def get_countries(skip: int=0, limit: int = 100):
    """
    Retrieve a list of countries.

    Args:
        skip (int): Number of records to skip for pagination.
        limit (int): Maximum number of records to return.

    Returns:
        List[CountryBase]: List of countries.
    """
    try:
        with get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    select * from country
                    offset %s limit %s;
                    """
                    ,(skip, limit)
                )
                countries = cur.fetchall()
                if countries is None:
                    print(f"countries not found")
                    raise HTTPException(status_code=404, detail="Countries not found")
                
                print(f"Retrieved all the countries")
                return countries
    except HTTPException:
        # Re-raise HTTPExceptions (like 404) without modification
        raise
    except Exception as e:
        print("Error retrieving countries")
        print(e)
        raise HTTPException(status_code=500, detail="Error retrieving countries")
        
@app.get("/cities/{country}", response_model=List[CityBase])
def get_country_cities(country: str, skip: int=0, limit: int = 100):
    """
    Retrieve a list of cities for a given country.

    Args:
        country (str): Name of the country.
        skip (int): Number of records to skip for pagination.
        limit (int): Maximum number of records to return.

    Returns:
        List[CityBase]: List of cities for the specified country.
    """
    try:
        with get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    select * from city
                    join country on country.country_id = city.country_id
                    where country.country = %s
                    offset %s limit %s;
                    """
                    ,(country, skip, limit)
                )
                cities = cur.fetchall()
                if cities is None:
                    print(f"cities not found")
                    raise HTTPException(status_code=404, detail=f"Cities for the country {country} not found")
                
                print(f"Retrieved all the cities")
                return cities
    except HTTPException:
        # Re-raise HTTPExceptions (like 404) without modification
        raise
    except Exception as e:
        print("Error retrieving cities")
        print(e)
        raise HTTPException(status_code=500, detail=f"Error retrieving cities for country {country}")

@app.put("/city/{city_id}", response_model=CityBase)
def update_city(city_id: int, city_update: CityUpdate):
    """
    Update the name of a city.

    Args:
        city_id (int): ID of the city to update.
        city_update (CityUpdate): Object containing the new city name.

    Returns:
        CityBase: The updated city with its country.
    """
    try:
        with get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Get current city and country
                cur.execute(
                    """
                    select city.city, country.country
                    from city
                    join country on country.country_id = city.country_id
                    where city.city_id = %s;
                    """,
                    (city_id,)
                )
                city_row = cur.fetchone()
                if not city_row:
                    raise HTTPException(status_code=404, detail=f"City with id {city_id} not found")
                current_country = city_row["country"]

                # Update city name only
                cur.execute(
                    """
                    update city
                    set city = %s
                    where city_id = %s
                    returning city;
                    """,
                    (city_update.city, city_id)
                )
                updated = cur.fetchone()
                if not updated:
                    raise HTTPException(status_code=404, detail=f"City with id {city_id} not found after update")
                conn.commit()
                return {"city": updated["city"], "country": current_country}
    except HTTPException:
        raise
    except Exception as e:
        print("Error updating city")
        print(e)
        raise HTTPException(status_code=500, detail="Error updating city")

@app.post("/country", response_model=CountryBase, status_code=201)
def create_country(country: CountryCreate):
    """
    Create a new country.

    Args:
        country (CountryCreate): Object containing the country name.

    Returns:
        CountryBase: The created country.
    """
    try:
        with get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Insert new country
                cur.execute(
                    """
                    insert into country (country)
                    values (%s)
                    returning country;
                    """,
                    (country.country,)
                )
                new_country = cur.fetchone()
                if not new_country:
                    raise HTTPException(status_code=500, detail="Failed to create country")
                conn.commit()
                return new_country
    except HTTPException:
        raise
    except Exception as e:
        print("Error creating country")
        print(e)
        raise HTTPException(status_code=500, detail="Error creating country")

@app.delete("/city/{city}", status_code=204)
def delete_city(city: str):
    """
    Delete a city by its name.

    Args:
        city (str): Name of the city to delete.

    Returns:
        None
    """
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("delete from city where city = %s returning city;", (city,))
                deleted = cur.fetchone()
                if not deleted:
                    raise HTTPException(status_code=404, detail=f"The city {city} not found")
                conn.commit()
                return
    except HTTPException:
        raise
    except Exception as e:
        print("Error deleting city")
        print(e)
        raise HTTPException(status_code=500, detail="Error deleting city")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", reload=True)