UPDATE memento_entries SET title=${title}, type=${type}, image=${image}, location=${location}, year=${year}
WHERE eid=$1  
RETURNING *;