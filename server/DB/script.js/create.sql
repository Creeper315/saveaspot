

CREATE TABLE User (
    username TINYTEXT primary key,
    password text NOT NULL, -- SQLite string type is called TEXT, 因为 jwt 会 hash，所以 hashed password 可能会非常长
    salt text,
    email TINYTEXT null UNIQUE,
    phone varchar(20),
    userpic text
);

CREATE TABLE Post (
    id INTEGER PRIMARY KEY,
    username TINYTEXT NOT NULL,
    locname not null,
    time TINYTEXT NOT NULL,   -- 'YYYYMMDD'
    description text,
    activity tinytext not null, -- ENUM('biking', 'hiking', 'table tennis', 'party', 'basketball', 'gaming', 'studying', 'others'),
    maxppl integer not null,
    curppl integer default 0 not null,
    foreign key (username) references user (username) on delete cascade,
    foreign key (locname) references location (locname) on delete cascade
);

create table Location (
    locname TINYTEXT PRIMARY KEY,
    lat DECIMAL,
    long DECIMAL,
    locpic text
);

create table Saved (
    id integer primary key,
    username tinytext not null,
    postid integer not null,
    foreign key (username) references user (username) on delete cascade,
    foreign key (postid) references post (id) on delete cascade
);

create table joiner (
    id integer primary key,
    username tinytext not null,
    postid integer not null,
    foreign key (username) references user (username) on delete cascade,
    foreign key (postid) references post (id) on delete cascade
);

-- CREATE UNIQUE INDEX uniemail ON user(email) WHERE email IS NOT NULL;

-- CREATE UNIQUE INDEX unistuid ON user(stuid) WHERE stuid IS NOT NULL;
 


