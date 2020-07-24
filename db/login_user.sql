SELECT uid, firstName, lastName from memento_users 
WHERE email = ${email} and password = ${password};