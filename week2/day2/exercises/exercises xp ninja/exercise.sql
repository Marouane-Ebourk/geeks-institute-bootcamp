-- Fetch the last 2 customers in alphabetical order (A-Z) – exclude ‘id’ from the results.
select first_name, last_name from customers order by first_name limit 2;

-- Use SQL to delete all purchases made by Scott.
delete from purchases where customer_id = (
	select customer_id from customers where first_name = 'Scott'
);

-- Does Scott still exist in the customers table, even though he has been deleted? Try and find him.
select * from customers where first_name = 'Scott';

-- Use SQL to find all purchases. Join purchases with the customers table, so that Scott’s order will appear, 
-- although instead of the customer’s first and last name, you should only see empty/blank. (Which kind of join should you use?).
select * from customers 
left join purchases
on customers.customer_id = purchases.customer_id;

-- Use SQL to find all purchases. Join purchases with the customers table, so that Scott’s order will NOT appear. 
-- (Which kind of join should you use?)
select * from customers 
right join purchases
on customers.customer_id = purchases.customer_id;