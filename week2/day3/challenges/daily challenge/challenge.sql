-- Part I

-- Create 2 tables : Customer and Customer profile
create table customer (
    id serial primary key,
    first_name varchar(50),
    last_name varchar(50) not null
);

create table customer_profile (
    id serial primary key,
    isLoggedIn boolean default false,
    customer_id int unique references customer(id) on delete cascade
);

-- Insert customers
insert into customer (first_name, last_name)
values 
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

-- Insert customer profiles using subqueries
insert into customer_profile (isLoggedIn, customer_id)
values (
    true,
    (select id from customer where first_name = 'John' and last_name = 'Doe')
);

insert into customer_profile (isLoggedIn, customer_id)
values (
    false,
    (select id from customer where first_name = 'Jerome' and last_name = 'Lalu')
);

-- The first_name of the LoggedIn customers
select c.first_name
from customer c
join customer_profile cp on c.id = cp.customer_id
where cp.isLoggedIn = true;

-- All the customers first_name and isLoggedIn columns - even the customers those who don’t have a profile.
select c.first_name, cp.isLoggedIn
from customer c
left join customer_profile cp on c.id = cp.customer_id;

-- The number of customers that are not LoggedIn
select count(*) as not_logged_in_count
from customer c
left join customer_profile cp on c.id = cp.customer_id
where cp.isLoggedIn = false;

-- Part II

-- Create a table named Book
create table book (
    book_id serial primary key,
    title varchar(100) not null,
    author varchar(100) not null
);

-- Insert books
insert into book (title, author) values
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

-- Create a table named Student
create table student (
    student_id serial primary key,
    name varchar(50) not null unique,
    age int check (age <= 15)
);

-- Insert students
insert into student (name, age) values
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

-- Create a table named Library
create table library (
    book_fk_id int references book(book_id) on delete cascade on update cascade,
    student_fk_id int references student(student_id) on delete cascade on update cascade,
    borrowed_date date,
    primary key (book_fk_id, student_fk_id)
);

-- the student named John, borrowed the book Alice In Wonderland on the 15/02/2022
insert into library (book_fk_id, student_fk_id, borrowed_date) values (
    (select book_id from book where title = 'Alice In Wonderland'),
    (select student_id from student where name = 'John'),
    '15/02/2022'
);

-- the student named Bob, borrowed the book To kill a mockingbird on the 03/03/2021
insert into library (book_fk_id, student_fk_id, borrowed_date) values (
    (select book_id from book where title = 'To kill a mockingbird'),
    (select student_id from student where name = 'Bob'),
    '03/03/2021'
);

-- the student named Lera, borrowed the book Alice In Wonderland on the 23/05/2021
insert into library (book_fk_id, student_fk_id, borrowed_date) values (
    (select book_id from book where title = 'Alice In Wonderland'),
    (select student_id from student where name = 'Lera'),
    '23/05/2021'
);

-- the student named Bob, borrowed the book Harry Potter the on 12/08/2021
insert into library (book_fk_id, student_fk_id, borrowed_date) values (
    (select book_id from book where title = 'Harry Potter'),
    (select student_id from student where name = 'Bob'),
    '12/08/2021'
);

-- Display the data
-- Select all the columns from the junction table
select * from library;

-- Select the name of the student and the title of the borrowed books
select s.name, b.title
from library l
join student s on l.student_fk_id = s.student_id
join book b on l.book_fk_id = b.book_id;

-- Select the average age of the children, that borrowed the book Alice in Wonderland
select avg(s.age) as avg_age
from library l
join student s on l.student_fk_id = s.student_id
join book b on l.book_fk_id = b.book_id
where b.title = 'Alice In Wonderland';

-- Delete a student from the Student table, what happened in the junction table ?
-- (Try deleting 'John' as an example)
delete from student where name = 'John';
-- The records for John are automatically deleted from the library table because of ON DELETE CASCADE.

