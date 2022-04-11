

CREATE TABLE User (
    id INTEGER PRIMARY KEY,
    username TINYTEXT unique not null,
    password text NOT NULL, -- SQLite string type is called TEXT, 因为 jwt 会 hash，所以 hashed password 可能会非常长
    salt text,
    email TINYTEXT null UNIQUE,
    stuid varchar(8) null unique,
    phone varchar(20),
    picture text
);

CREATE TABLE Post (
    id INTEGER PRIMARY KEY,
    requesterid integer NOT NULL,
    time TINYTEXT NOT NULL,
    description text,
    locationid integer,
    helper integer ,
    reward text,
    visible INTEGER, -- SQLite doesn't have Boolean type, use 0 and 1 instead. 1-visible . 0-invisible.
    lat DECIMAL,
    long DECIMAL,
    picture text,
    foreign key (requesterid) references user (id),
    foreign key (locationid) references location (id)
);

create table Location (
    id INTEGER PRIMARY KEY,
    locname TINYTEXT not null,
    lat DECIMAL,
    long DECIMAL,
    picture text
);

-- CREATE UNIQUE INDEX uniemail ON user(email) WHERE email IS NOT NULL;

-- CREATE UNIQUE INDEX unistuid ON user(stuid) WHERE stuid IS NOT NULL;
 


