CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

INSERT INTO posts (title, content) VALUES
('First Post', 'This is the content of the first post.'),
('Second Post', 'This is the content of the second post.'),
('Third Post', 'This is the content of the third post.');