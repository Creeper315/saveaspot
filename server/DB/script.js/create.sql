

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
    userId integer NOT NULL,
    time TINYTEXT NOT NULL,   -- 'YYYYMMDD'
    description text,
    locName not null,
    helper TINYTEXT ,
    reward text,
    -- visible INTEGER, -- SQLite doesn't have Boolean type, use 0 and 1 instead. 1-visible . 0-invisible.
    picture text,
    foreign key (userId) references user (id),
    foreign key (helper) references user (username), 
    foreign key (locName) references location (locname)
);

create table Location (
    id INTEGER PRIMARY KEY,
    locname TINYTEXT unique not null,
    lat DECIMAL,
    long DECIMAL,
    picture text
);

create table Saved (
    id integer primary key,
    userId integer not null,
    postId integer not null,
    foreign key (userid) references user (id),
    foreign key (postId) references post (id)
)

-- CREATE UNIQUE INDEX uniemail ON user(email) WHERE email IS NOT NULL;

-- CREATE UNIQUE INDEX unistuid ON user(stuid) WHERE stuid IS NOT NULL;
 


