SELECT uid, firstName, lastName from memento_users 
WHERE email = $1 and password = $2;