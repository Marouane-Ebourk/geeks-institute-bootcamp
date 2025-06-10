CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    username TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE IF NOT EXISTS hashpwd (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
);
