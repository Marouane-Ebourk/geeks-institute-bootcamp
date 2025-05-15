create table users (
    user_id serial primary key,
    username varchar(50) not null,
    password varchar(50) not null
);

create table product_orders (
    order_id serial primary key,
    user_id int references users (user_id) on delete cascade,
    order_date timestamp default current_timestamp
);

create table items (
    item_id serial primary key,
    order_id int references product_orders (order_id) on delete cascade,
    product_name varchar(100) not null,
    price numeric(10, 2) not null
);

-- Create a function that returns the total price for a given order.
create or replace function total_price_per_order(given_order_id int)
returns numeric(10, 2) as $$
declare 
    total numeric;
begin
    select sum(items.price) into total
    from product_orders 
    join items on items.order_id = product_orders.order_id
    where product_orders.order_id = given_order_id;
    return total;
end;
$$ language plpgsql;

-- test 
insert into users (username, password)
values ('user1', 'password1'),
       ('user2', 'password2');

insert into product_orders (user_id)
values (1),
       (1),
       (2);

insert into items (order_id, product_name, price)
values (1, 'item1', 10.00),
       (1, 'item2', 20.00),
       (2, 'item3', 30.00),
       (3, 'item4', 40.00);

-- test the function
select total_price_per_order(1) as total_price;



