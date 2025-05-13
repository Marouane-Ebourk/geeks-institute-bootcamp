-- Exercise 1: DVD Rental

-- Find out how many films there are for each rating.
select rating, count(*) from film 
group by rating;


-- Get a list of all the movies that have a rating of G or PG-13.
select title, rating from film
where rating = 'G' or rating = 'PG-13';

-- Filter this list further: look for only movies that are under 2 hours long, and whose rental price (rental_rate) is under 3.00.
-- Sort the list alphabetically.
select title, rating from film
where (rating = 'G' or rating = 'PG-13')
and length < (2 * 60) and rental_rate < 3.0
order by title;

-- Find a customer in the customer table, and change his/her details to your details, using SQL UPDATE.
update customer set 
	first_name = 'Marouane',
	last_name = 'Ebourk',
	email = 'marouaneebourk@gmail.com'
where customer_id = 1;

-- Now find the customer’s address, and use UPDATE to change the address to your address (or make one up).
update address set
	address = 'Casablanca Morocco'
where address_id in (
	select address_id from customer
	where customer_id = 1
	limit 1
);


-- Exercise 2: students table

-- ‘Lea Benichou’ and ‘Marc Benichou’ are twins, they should have the same birth_dates. Update both their birth_dates to 02/11/1998.
update students set
	birth_date = '02/11/1998'
where last_name = 'Benichou'
and first_name in ('Marc', 'Lea');

-- Change the last_name of David from ‘Grez’ to ‘Guez’.
update students set 
	last_name = 'Grez'
where first_name = 'David' and last_name = 'Guez';

-- Delete the student named ‘Lea Benichou’ from the table.
delete from students 
where first_name = 'Lea' and last_name = 'Benichou';

-- Count how many students are in the table.
select count(*) from students;

-- Count how many students were born after 1/01/2000.
select count(*) from students 
where birth_date > '01/01/2000';


-- Add a column to the student table called math_grade.
alter table students 
add column math_grade integer default (0);

-- Add 80 to the student which id is 1.
update students set math_grade = math_grade + 80
where id = 1;

-- Add 90 to the students which have ids of 2 or 4.
update students set math_grade = math_grade + 90
where id in (2, 4);

-- Add 40 to the student which id is 6.
update students set math_grade = math_grade + 40
where id = 6;

-- Count how many students have a grade bigger than 83
select count(*) from students 
where math_grade > 83;

-- Add another student named ‘Omer Simpson’ with the same birth_date as the one already in the table. Give him a grade of 70.
insert into students (last_name, first_name, birth_date, math_grade)
values ('Simpson', 'Omer', '03/10/1980', 70);

-- Bonus: Count how many grades each student has.
select first_name, last_name, count(math_grade) as total_grade from students
group by first_name, last_name;

-- Find the sum of all the students grades.
select sum(math_grade) from students;


-- Exercise 3 : Items and customers

-- Part I
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    item_id INTEGER REFERENCES items(item_id),
    quantity_purchased INTEGER NOT NULL
);
select * from items;

-- Scott Scott bought 1 fan
insert into purchases (customer_id, item_id, quantity_purchased)
values (
    (select customer_id from customers where first_name = 'Scott' and last_name = 'Scott'),
    (select item_id from items where item_label = 'Fan'),
    1
);

-- Melanie Johnson bought ten large desks
insert into purchases (customer_id, item_id, quantity_purchased)
values (
	(select customer_id from customers where first_name = 'Melanie' and last_name = 'Johnson'),
	(select item_id from items where item_label = 'Large Desk'),
	10
);

-- Greg Jones bougth two small desks
insert into purchases (customer_id, item_id, quantity_purchased)
values (
	(select customer_id from customers where first_name = 'Greg' and last_name = 'Jones'),
	(select item_id from items where item_label = 'Small Desk'),
	2
); 


-- Part II

-- All purchases.
select * from purchases;

-- All purchases joining customer table
select * from purchases 
inner join customers
on purchases.customer_id = customers.customer_id;

-- Purchases of the customer with the ID equal to 5.
select * from purchases
where customer_id = 5;

-- Purchases for a large desk AND a small desk
select * from purchases
inner join items
on purchases.item_id = items.item_id
where item_label in ('Large Desk', 'Small Desk');

/* Use SQL to show all the customers who have made a purchase. Show the following fields/columns:
Customer first name
Customer last name
Item name */
select customers.first_name, customers.last_name, items.item_label from purchases 
inner join customers on purchases.customer_id = customers.customer_id
inner join items on purchases.item_id = items.item_id;

-- Add a row which references a customer by ID, but does not reference an item by ID (leave it blank). Does this work? Why/why not?
insert into purchases (customer_id, quantity_purchased)
values (1, 1);

-- it works because if item_id is defined like this :
-- item_id INTEGER REFERENCES items(item_id)
-- it takes null as a default value if not specified






