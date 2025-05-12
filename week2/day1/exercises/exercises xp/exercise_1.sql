create table items (
	item_id SERIAL primary key,
	item_label varchar (50) not null,
	item_price int not null
);

insert into items (item_id, item_label, item_price) values 
(1, 'Small Desk', 100),
(2, 'Large Desk', 300),
(3, 'Fan', 80);

create table customers (
	customer_id SERIAL primary key,
	first_name varchar(50) not null,
	last_name varchar (50) not null
);

insert into customers (customer_id, first_name, last_name) values
(1, 'Greg', 'Jones'),
(2, 'Sandra', 'Jones'),
(3, 'Scott', 'Scott'),
(4, 'Trevor', 'Green'),
(5, 'Melanie', 'Johnson');

fetch all items
select * from items;
select * from customers;


-- All the items with a price above 80 (80 not included).
select * from items where item_price > 80;
-- -- All the items with a price below 300. (300 included)
select * from items where item_price <= 300;
-- -- All customers whose last name is 'Smith' (What will be your outcome?).
select * from customers where last_name = 'Smith';
-- -- All customers whose last name is 'Jones'.
select * from customers where last_name = 'Jones';
-- -- All customers whose firstname is not 'Scott'.
select * from customers where first_name != 'Scott';
