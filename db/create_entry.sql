INSERT INTO memento_entries 
(title, type, image, journal, location, year, uid)
VALUES
(${title},${type},${image},${journal},${location},${year},${uid})
RETURNING eid, title, type, journal, location, year, uid ;