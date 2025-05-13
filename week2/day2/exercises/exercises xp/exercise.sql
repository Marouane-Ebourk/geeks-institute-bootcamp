-- Exercise 1 : Items and Customers 

-- All items, ordered by price (lowest to highest).
select item_label, item_price from items order by item_price asc;

-- Items with a price above 80 (80 included), ordered by price (highest to lowest).
select item_label, item_price from items 
where item_price >= 80 
order by item_price desc;

-- The first 3 customers in alphabetical order of the first name (A-Z) 
-- exclude the primary key column from the results.
select first_name, last_name from customers
order by first_name limit 3;

-- All last names (no other columns!), in reverse alphabetical order (Z-A)
select last_name from customers
order by last_name desc;


-- Exercise 2 : dvdrental database

-- In the dvdrental database write a query to select all the columns from the “customer” table.
select * from customer;

-- Write a query to display the names (first_name, last_name) using an alias named “full_name”.
select (first_name, last_name) as full_name from customer;

-- Lets get all the dates that accounts were created.
-- Write a query to select all the create_date from the “customer” table (there should be no duplicates).
select distinct create_date from customer;

-- Write a query to get all the customer details from the customer table, it should be displayed in descending order by their first name.
select * from customer order by first_name desc;

-- Write a query to get the film ID, title, description, year of release and rental rate in ascending order according to their rental rate.
select film_id as "film ID", title, description, release_year as "year of realease", rental_rate as "rental rate" from film
order by rental_rate asc;

-- Write a query to get the address, and the phone number of all customers living in the Texas district, 
-- these details can be found in the “address” table.
select address, phone
from customer inner join address
on customer.address_id = address.address_id
where address.district = 'Texas';

-- Write a query to retrieve all movie details where the movie id is either 15 or 150.
select * from film where film_id in (15, 150);

-- Write a query which should check if your favorite movie exists in the database.
-- Have your query get the film ID, title, description, length and the rental rate, these details can be found in the “film” table.
select film_id as "film ID", title, description, length, rental_rate as "rental rate" from film
where title = 'Forrest gump';

-- No luck finding your movie? Maybe you made a mistake spelling the name.
-- Write a query to get the film ID, title, description, length and the rental rate of all the movies starting with the two first letters of your favorite movie
select film_id as "film ID", title, description, length, rental_rate as "rental rate" from film
where title like 'Fo%';

-- Write a query which will find the 10 cheapest movies.
select film_id as "film ID", title, description, length, rental_rate as "rental rate" from film
order by rental_rate asc
limit 10;

-- Write a query which will find the next 10 cheapest movies.
select film_id as "film ID", title, description, length, rental_rate as "rental rate" from film
order by rental_rate asc
offset 10
FETCH FIRST 10 ROWS ONLY;

-- Write a query which will join the data in the customer table and the payment table.
-- You want to get the first name and last name from the curstomer table, 
-- as well as the amount and the date of every payment made by a customer, 
-- ordered by their id (from 1 to…).
select customer.customer_id, customer.first_name, customer.last_name, payment.amount, payment.payment_date
from customer inner join payment
on customer.customer_id = payment.customer_id
order by customer_id;

-- All the movies which are not in inventory.
select * from film
where film_id not in (
	select film_id from inventory
);

-- Write a query to find which city is in which country.
select city, country from country
inner join city 
on country.country_id = city.country_id;

-- Write a query to get the customer’s id, names (first and last), 
-- the amount and the date of payment ordered by the id of the staff member who sold them the dvd.
select customer.first_name, customer.last_name, amount, payment_date
from customer 
inner join payment on customer.customer_id = payment.customer_id
inner join staff on staff.staff_id = payment.staff_id
order by staff.staff_id

