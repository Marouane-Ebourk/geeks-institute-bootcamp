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
('Marouane', 'Ebourk', '19/03/2002');

-- Fetch the first four students. You have to order the four students alphabetically by last_name.
select * from students order by last_name asc limit 4;

-- Fetch the details of the youngest student.
select * from students order by birth_date desc limit 1;

-- Fetch three students skipping the first two students.
select * from students limit 3 offset 2;