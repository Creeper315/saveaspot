


-- insert into user (username, password, stuid) values ('richard', '123', '41174153');

insert into location (locname, lat, long, picture) values ('EOSC', '123', '123', 'https://www.google.com.hk/url?sa=i&url=https%3A%2F%2Fyou.ubc.ca%2Fubc_programs%2Fearth-ocean-sciences%2F&psig=AOvVaw2GrUhK5cII9x5-IASw9f5j&ust=1649872039626000&source=images&cd=vfe&ved=0CAcQjRxqFwoTCKDbvoeNj_cCFQAAAAAdAAAAABAD');
insert into location (locname, lat, long, picture) values ('CIRS', '123', '123', 'https://www.google.com.hk/maps/uv?pb=!1s0x548672b683f2bcbf%3A0x688850f7f499fe90!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMjQ2onsHZly4d6qYglRraKCIo8U7Q6UaXoh9aq%3Dw482-h320-k-no!5zdWJjIHRyaXBsZSBPIC0gR29vZ2xlIOaQnOWwiw!15sCgIgAQ&imagekey=!1e10!2sAF1QipMjQ2onsHZly4d6qYglRraKCIo8U7Q6UaXoh9aq&hl=zh-TW&sa=X&ved=2ahUKEwi21MWojo_3AhWIGaYKHWJ3B4cQoip6BAh4EAM#');
insert into location (locname, lat, long, picture) values ('Math Building', '123', '123', 'https://www.google.com.hk/url?sa=i&url=http%3A%2F%2Fwww.maps.ubc.ca%2FPROD%2Findex_detail.php%3Flocat1%3D518&psig=AOvVaw1uvE5BtVQi9WlTVJyBzIWi&ust=1649873223787000&source=images&cd=vfe&ved=0CAcQjRxqFwoTCIDg8eyOj_cCFQAAAAAdAAAAABAD');
insert into location (locname, lat, long, picture) values ('Sauder', '123', '123', 'https://www.google.com.hk/url?sa=i&url=https%3A%2F%2Fwww.sauder.ubc.ca%2Fabout-ubc-sauder%2Flocations%2Fubc-campus&psig=AOvVaw1mY_1ZNbY1WR7K0mTw315t&ust=1649873266073000&source=images&cd=vfe&ved=0CAcQjRxqFwoTCOjqroKPj_cCFQAAAAAdAAAAABAD');
insert into location (locname, lat, long, picture) values ('Triple O', '123', '123', 'https://www.google.com.hk/imgres?imgurl=https%3A%2F%2Fstudents.ubc.ca%2Fsites%2Fstudents.ubc.ca%2Ffiles%2F20190409%2520-%2520SUBC%2520%2528Fries%2529%2520-%2520edits%2520-%2520Rachel-9390.jpg&imgrefurl=https%3A%2F%2Fstudents.ubc.ca%2Fubclife%2Fsnacks-ubc-fries&tbnid=lji2TGoeNcJ-qM&vet=12ahUKEwik8ISNj4_3AhWDRvUHHVxGDiEQMygAegUIARCjAQ..i&docid=HKQMF8Ys0okFFM&w=6720&h=4480&q=ubc%20triple%20o%20building&ved=2ahUKEwik8ISNj4_3AhWDRvUHHVxGDiEQMygAegUIARCjAQ');

insert into post (userid, time, description, locName) values (1, '20220412', 'thsnks', 'EOSC');
insert into post (userid, time, description, locName) values (2, '20220413', 'bruh', 'Sauder');
insert into post (userid, time, description, locName) values (1, '20220414', 'haha', 'Triple O');
insert into post (userid, time, description, locName) values (2, '20190415', 'fgh', 'EOSC');
insert into post (userid, time, description, locName) values (2, '20190715', 'qwe', 'EOSC');
insert into post (userid, time, description, locName) values (1, '20220417', 'asd', 'CIRS');


insert into saved (userid, postid) values (1, 1);
insert into saved (userid, postid) values (1, 2);
insert into saved (userid, postid) values (2, 3);
insert into saved (userid, postid) values (1, 4);