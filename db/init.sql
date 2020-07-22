create table memento_users(
    uid SERIAL PRIMARY KEY,
    firstName varchar(30),
    lastName varchar(30),
    city TEXT,
    country varchar(25),
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
