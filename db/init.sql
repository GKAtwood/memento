create table memento_users(
    uid SERIAL PRIMARY KEY,
    firstName varchar(30),
    lastName varchar(30),
    email TEXT ,
    password varchar(15)
);


CREATE TABLE memento_entries (
    eid SERIAL PRIMARY KEY,
    type TEXT,
    title VARCHAR(20),
    image TEXT,
    journal TEXT,
    location TEXT,
    year INTEGER,
    uid INTEGER REFERENCES memento_users (uid)
);

ALTER TABLE memento_users
ADD COLUMN pic TEXT;
