DROP TABLE if exists books;
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    published_year INT
);

INSERT INTO books (title, author, published_year) VALUES
('To Kill a Mockingbird', 'Harper Lee', 1960),
('1984', 'George Orwell', 1949),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
('The Hobbit', 'J.R.R. Tolkien', 1937),
('Pride and Prejudice', 'Jane Austen', 1813);