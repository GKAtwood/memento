UPDATE memento_users SET firstName = ${firstName}, lastname = ${lastName}, email=${email}, password=${password} 
WHERE uid = ${uid}
RETURNING uid, firstName, lastName, email;
