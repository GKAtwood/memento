UPDATE memento_users 
SET firstName = ${firstName}, lastName = ${lastName}, email=${email}, password=${password}  
WHERE uid = ${uid}
RETURNING firstName, lastName, email;