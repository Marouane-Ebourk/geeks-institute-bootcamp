-- Database: bootcamp

-- DROP DATABASE IF EXISTS bootcamp;

CREATE DATABASE bootcamp
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United Kingdom.1252'
    LC_CTYPE = 'English_United Kingdom.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

create table students (
	id serial primary key,
	last_name varchar(50) not null,
	first_name varchar(50) not null,
	birth_date date not null
);

insert into students (first_name, last_name, birth_date) values 
('Marc', 'Benichou', '02/11/1998'),
('Yoan', 'Cohen', '03/12/2010'),
('Lea', 'Benichou', '27/07/1987'),
('Amelia', 'Dux', '07/04/1996'),
('David', 'Grez', '14/06/2003'),
('Omer', 'Simpson', '03/10/1980');

insert into students (first_name, last_name, birth_date) values
('Marouane', 'Ebourk', '19/03/2002')

-- Fetch all of the data from the table.
select * from students;

-- Fetch all of the students first_names and last_names.
select first_name, last_name from students;

-- Fetch the student which id is equal to 2.
select first_name, last_name from students where id = 2;

-- Fetch the student whose last_name is Benichou AND first_name is Marc.
select first_name, last_name from students 
where last_name = 'Benichou' and first_name = 'Marc';

-- Fetch the students whose last_names are Benichou OR first_names are Marc.
select first_name, last_name from students
where last_name = 'Benichou' or first_name = 'Marc';

-- Fetch the students whose first_names contain the letter a.
select first_name, last_name from students
where first_name like '%a%';

-- Fetch the students whose first_names start with the letter a.
select first_name, last_name from students
where first_name like 'a%';

-- Fetch the students whose first_names end with the letter a.
select first_name, last_name from students
where first_name like '%a';

-- Fetch the students whose second to last letter of their first_names are a (Example: Leah).
select first_name, last_name from students
where first_name like 'a_%';

-- Fetch the students whose id’s are equal to 1 AND 3 .
select first_name, last_name from students
where id = 1 and id = 3
