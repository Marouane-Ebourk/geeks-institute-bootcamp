-- Exercise 1: DVD Rental

-- Get a list of all the languages, from the language table.
select * from language;

-- Get a list of all films joined with their languages – select the following details : film title, description, and language name.
select title, description, language.name from film 
join language on film.language_id = language.language_id;

-- Get all languages, even if there are no films in those languages
-- select the following details : film title, description, and language name.
select title, description, language.name
from film right join language
on film.language_id = language.language_id;

-- Create a new table called new_film with the following columns : id, name. Add some new films to the table.
create table new_film (
    id serial primary key,
    name varchar(50)
);

INSERT INTO new_film (name) VALUES
('The Silent Forest'),
('Echoes of Time'),
('Digital Dreams'),
('Shadows of Tomorrow'),
('The Forgotten Code'),
('Midnight Run');

-- Create a new table called customer_review 
create table customer_review (
    review_id serial primary key,
    film_id int references new_film(id) on delete cascade,
    language_id int references language(language_id),
    title varchar(50) not null,
    score int not null,
    review_text text,
    last_update timestamp not null
);

-- Add 2 movie reviews. Make sure you link them to valid objects in the other tables.
insert into customer_review (film_id, language_id, title, score, review_text, last_update)
values 
(
    (select id from new_film where name = 'The Silent Forest'), 
    (select language_id from language where name = 'English'),
    'Great Movie',
    9,
    'Loved the pacing and characters',
    NOW()
),
(
    (select id from new_film where name = 'Midnight Run'), 
    (select language_id from language where name = 'English'),
    'Average movie',
    5,
    'This movie is so basic, not interesting.',
    NOW()
);

-- Delete a film that has a review from the new_film table, what happens to the customer_review table?
delete from new_film where name = 'The Silent Forest';
select * from new_film;
-- it deletes the reviews attached to this film 


-- Exercise 2 : DVD Rental 

-- Use UPDATE to change the language of some films. Make sure that you use valid languages.
update film set 
language_id = (select language_id from language where name = 'Italian')
where title = 'Chamber Italian';

update film set 
language_id = (select language_id from language where name = 'French')
where title = 'Grosse Wonderful';

-- Which foreign keys (references) are defined for the customer table?
-- How does this affect the way in which we INSERT into the customer table?

/*
foreign keys: 
- store_id references the store table
- address_id references the address table

how this affects:
if we want to insert values into customer table they have to be valid values in store and adderss tables
*/

-- We created a new table called customer_review. Drop this table. Is this an easy step, or does it need extra checking?
drop table if exists customer_review;

-- Find out how many rentals are still outstanding (ie. have not been returned to the store yet).
select count(*) from rental where return_date is null;

-- Find the 30 most expensive movies which are outstanding (ie. have not been returned to the store yet)
select * from rental
join inventory on rental.inventory_id = inventory.inventory_id
join film on film.film_id = inventory.film_id
where rental.return_date is null
order by film.rental_rate desc
limit 30;

-- The 1st film : The film is about a sumo wrestler, and one of the actors is Penelope Monroe.
select * from film
join film_actor on film.film_id = film_actor.film_id
join actor on film_actor.actor_id = actor.actor_id
where lower(film.description) like '%sumo wrestler%' 
and actor.first_name = 'Penelope'
and actor.last_name = 'Monroe';

-- The 2nd film : A short documentary (less than 1 hour long), rated “R”.
select * from film
join film_category on film.film_id = film_category.film_id
join category on film_category.category_id = category.category_id
where film.length < 60
and film.rating = 'R'
and category.name = 'Documentary';

-- The 3rd film : A film that his friend Matthew Mahan rented.
-- He paid over $4.00 for the rental, and he returned it between the 28th of July and the 1st of August, 2005.
select * from film
join inventory on film.film_id = inventory.film_id
join rental on inventory.inventory_id = rental.inventory_id
join customer on rental.customer_id = customer.customer_id
where customer.first_name = 'Matthew'
and customer.last_name = 'Mahan'
and rental.return_date between '2005-07-28' and '2005-08-01'
and film.rental_rate > 4.00;

-- The 4th film : His friend Matthew Mahan watched this film, as well. 
-- It had the word “boat” in the title or description, and it looked like it was a very expensive DVD to replace.
select film.title, film.description, film.replacement_cost from film
join inventory on film.film_id = inventory.film_id
join rental on inventory.inventory_id = rental.inventory_id
join customer on rental.customer_id = customer.customer_id
where customer.first_name = 'Matthew' and customer.last_name = 'Mahan'
and (lower(film.title) like '%boat%' or lower(film.description) like '%boat%')
order by film.replacement_cost desc limit 1;
