INSERT INTO memento_users 
(firstName, lastName, city, country, email, password, pic)
VALUES
(${firstName},${lastName},${city},${country},${email},${pic})

RETURNING uid, firstName, lastName, city, country, email, pic;