Use sakila;

-- 1
SELECT * FROM country
WHERE country = 'China' OR country = 'Bangladesh' OR country = 'India';

SELECT * FROM country
WHERE country IN ('China', 'Bangladesh', 'India');

-- 2
SELECT last_name, middle_name, first_name FROM actor
WHERE last_name LIKE '%OD%';

-- 3
ALTER TABLE actor 
ADD COLUMN middle_name VARCHAR(45)
AFTER first_name;

SELECT * FROM actor;

-- 4
SELECT last_name, COUNT(last_name) as Total_Last_Name FROM actor 
GROUP BY last_name
HAVING Total_Last_Name >= 2;

-- 5
SELECT first_name, last_name, address FROM staff s
JOIN address a USING(address_id);

-- 6
 SELECT COUNT(i.film_id) as Total_Copies FROM film f
 JOIN inventory i ON f.film_id = i.film_id
 WHERE title = 'Hunchback Impossible'
 GROUP BY i.film_id;
 
 -- 7
 SELECT f.title, COUNT(i.film_id) as Total_Rented FROM rental
 JOIN inventory i USING(inventory_id)
 JOIN film f USING(film_id)
 GROUP BY i.film_id
 ORDER BY Total_Rented DESC;
 
 -- 9
 SELECT * FROM actor;
 SELECT * FROM film_actor;
 SELECT * FROM film WHERE title = 'Alone Trip';
 
 SELECT a.first_name, a.last_name, f.title, f.film_id FROM film_actor fa 
 JOIN film f ON fa.film_id = f.film_id
 JOIN actor a ON fa.actor_id = a.actor_id
 WHERE f.title = 'Alone Trip';
 
SELECT a.first_name, a.last_name, fa.film_id FROM actor a
JOIN film_actor fa ON fa.actor_id = a.actor_id
WHERE fa.film_id IN 
(SELECT f.film_id FROM film f WHERE f.title = 'Alone Trip'); 
 