INSERT INTO memento_entries 
(type, 
title, 
image, 
journal,
location, 
year,
uid
  )VALUES(
${type},
${title},
${image},
${journal},
${location},
${year},
${uid}
)
RETURNING eid, type, title, journal, location, year, uid ;