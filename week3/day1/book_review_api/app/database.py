import os
from dotenv import load_dotenv
from contextlib import contextmanager
import psycopg2

load_dotenv()

DB_CONFIG = {
    "dbname": os.getenv("POSTGRES_DB", "dev"), 
    "user": os.getenv("POSTGRES_USER", "postgres"), 
    "password": os.getenv("POSTGRES_PASSWORD", "password"), 
    "host": os.getenv("POSTGRES_HOST", "localhost"), 
    "port": os.getenv("POSTGRES_PORT", "5432") 
}

@contextmanager
def get_connection():
    connection = None
    try:
        connection = psycopg2.connect(**DB_CONFIG)
        yield connection
    except Exception as e:
        raise Exception(f"Error while connecting to database: {str(e)}")
    finally:
        if connection is not None:
            connection.close()


def create_tables():
    try:

        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    -- Users table
                    create table if not exists users (
                        id serial primary key,
                        username varchar(100) unique not null,
                        password varchar(150) not null,
                        is_admin bool not null default false
                    );

                    -- Books table
                    create table if not exists books (
                        id serial primary key,
                        title varchar(200) not null,
                        description text,
                        owner integer references users(id) on delete set null
                    );

                    -- Reviews table
                    create table if not exists reviews (
                        id serial primary key,
                        book_id integer references books(id) on delete cascade,
                        user_id integer references users(id) on delete cascade,
                        review_text text not null,
                        unique (book_id, user_id)
                    );
                """)
                conn.commit()
            pass
    except Exception as e:
        raise Exception(f"Error while creating database: {str(e)}")
