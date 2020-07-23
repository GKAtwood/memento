INSERT INTO memento_users 
(firstName, lastName, email, password)
VALUES
(${firstName},${lastName},${email},${password})

RETURNING *;