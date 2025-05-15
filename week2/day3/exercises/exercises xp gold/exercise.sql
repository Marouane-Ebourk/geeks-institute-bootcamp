-- Exercise 1 : DVD Rentals

-- Get a list of all rentals which are out (have not been returned).
select * from rental where return_date is NULL;

-- Get a list of all customers who have not returned their rentals. Make sure to group your results.
select first_name, last_name from rental
join customer on rental.customer_id = customer.customer_id
where return_date is NULL
group by first_name, last_name;

-- Get a list of all the Action films with Joe Swank.
select film.title
from film
join film_category fc on film.film_id = fc.film_id
join category c on fc.category_id = c.category_id
join film_actor fa on film.film_id = fa.film_id
join actor a on fa.actor_id = a.actor_id
where c.name = 'Action'
    and a.first_name = 'Joe'
    and a.last_name = 'Swank';


-- Exercise 2 : Happy Halloween

-- How many stores there are, and in which city and country they are located.
select country, city, count(*)
from store
join address on store.address_id = address.address_id
join city on address.city_id = city.city_id
join country on city.country_id = country.country_id
group by country, city;

-- How many hours of viewing time there are in total in each store – in other words, the sum of the length of every inventory item in each store.
select store.store_id, sum(film.length)/60 as "total hours"
from store
join inventory on inventory.store_id = store.store_id
join film on film.film_id = inventory.film_id
group by store.store_id;

-- Make sure to exclude any inventory items which are not yet returned.
select store.store_id, sum(film.length)/60 as "total hours"
from store
join inventory on inventory.store_id = store.store_id
join rental on rental.inventory_id = inventory.inventory_id
join film on film.film_id = inventory.film_id
where rental.return_date is not null
group by store.store_id

-- A list of all customers in the cities where the stores are located.
select * from customer
join address on address.address_id = customer.address_id
join city on city.city_id = address.city_id
where city.city_id in (
    select city.city_id from store
    join address on address.address_id = store.address_id
    join city on city.city_id = address.city_id
)

-- A list of all customers in the countries where the stores are located.
select concat(customer.first_name, ' ', customer.last_name) as customer_name
from customer
join address on address.address_id = customer.address_id
join city on city.city_id = address.city_id
join country on country.country_id = city.country_id
where country.country_id in (
    select country.country_id from store
    join address on address.address_id = store.address_id
    join city on city.city_id = address.city_id
    join country on country.country_id = city.country_id
)


-- Some people will be frightened by watching scary movies while zombies walk the streets. Create a ‘safe list’ of all movies which do not include the ‘Horror’ category, or contain the words ‘beast’, ‘monster’, ‘ghost’, ‘dead’, ‘zombie’, or ‘undead’ in their titles or descriptions… Get the sum of their viewing time (length).

select sum(f.length) as safe_total_length
from film f
left join film_category fc on f.film_id = fc.film_id
left join category c on fc.category_id = c.category_id
where c.name != 'Horror'
  and lower(f.title) not like '%beast%'
  and lower(f.title) not like '%monster%'
  and lower(f.title) not like '%ghost%'
  and lower(f.title) not like '%dead%'
  and lower(f.title) not like '%zombie%'
  and lower(f.title) not like '%undead%'
  and lower(f.description) not like '%beast%'
  and lower(f.description) not like '%monster%'
  and lower(f.description) not like '%ghost%'
  and lower(f.description) not like '%dead%'
  and lower(f.description) not like '%zombie%'
  and lower(f.description) not like '%undead%';

