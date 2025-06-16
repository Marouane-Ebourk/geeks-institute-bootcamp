DROP TABLE IF EXISTS questions_options;
DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT,
    correctAnswer INTEGER
);
CREATE TABLE options (id SERIAL PRIMARY KEY, option TEXT);

CREATE TABLE questions_options (
    question_id INTEGER REFERENCES questions(id),
    option_id INTEGER REFERENCES options(id)
);

INSERT INTO questions (question, correctAnswer)
VALUES ('What is 2+2?', 1),
    ('What is the capital of France?', 5),
    ('Which planet is known as the Red Planet?', 9),
    ('What is the largest mammal?', 13);


INSERT INTO options (option)
VALUES ('4'),
    ('3'),
    ('5'),
    ('2'),

    ('Paris'),
    ('London'),
    ('Berlin'),
    ('Madrid'),

    ('Venus'),
    ('Jupiter'),
    ('Saturn'),
    ('Mars'),

    ('Blue Whale'),
    ('Elephant'),
    ('Giraffe'),
    ('Hippopotamus');


INSERT INTO questions_options (question_id, option_id)
VALUES (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (3, 9),
    (3, 10),
    (3, 11),
    (3, 12),
    (4, 13),
    (4, 14),
    (4, 15),
    (4, 16);