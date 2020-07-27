UPDATE memento_users 
SET firstName = $2, lastname = $3, email=$4, password=$5  WHERE uid = $1
RETURNING *;