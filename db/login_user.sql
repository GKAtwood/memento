SELECT uid, firstName, lastName, pic from memento_users 
WHERE email = $1 and password = $2;