


-- insert into user (username, password, stuid) values ('richard', '123', '41174153');

-- insert into location (locname, lat, long, locpic) values ('EOSC', '49.2630524', '-123.2529355', 'https://you.ubc.ca/wp-content/uploads/2013/06/UBC-Earth-and-Ocean-Sciences-Earth-Ocean-Sciences.gif');
-- insert into location (locname, lat, long, locpic) values ('CIRS', '49.2621951', '-123.2541628', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/CIRS_Building_UBC.jpg/1200px-CIRS_Building_UBC.jpg');
-- insert into location (locname, lat, long, locpic) values ('Math Building', '49.2664636', '-123.2600187', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-7ZtYjL-7P0O8hGZEPio1JHzfJB2pTj3sRVC0GzomuZXUsZv_GC2JyKewNHH5x2rwmU&usqp=CAU');
-- insert into location (locname, lat, long, locpic) values ('Sauder', '49.2648274', '-123.2559826', 'https://www.mba.today/images/news/ubc-sauder.jpg');
-- insert into location (locname, lat, long, locpic) values ('Triple O', '49.2658607', '-123.2566798', 'https://lh5.googleusercontent.com/p/AF1QipMjQ2onsHZly4d6qYglRraKCIo8U7Q6UaXoh9aq=w408-h270-k-no');
-- insert into location (locname, lat, long, locpic) values ('Henning', '49.2664925', '-123.2543871', 'https://mapio.net/images-p/34276474.jpg');
-- insert into location (locname, lat, long, locpic) values ('Nest', '49.2665228', '-123.2520892', 'https://www.ams.ubc.ca/wp-content/uploads/2018/08/THe-Nest_DialogBH_Panorama.jpg');
-- insert into location (locname, lat, long, locpic) values ('Thunderbird Residence', '49.2592275', '-123.2513988', 'https://vancouver.housing.ubc.ca/wp-content/uploads/2014/01/Res_detail_TB_exterior2_1170x660.jpg');
-- insert into location (locname, lat, long, locpic) values ('Ponderosa Residence', '49.2642809', '-123.2583223', 'https://vancouver.housing.ubc.ca/wp-content/uploads/2014/01/Res_detail_PC_exterior1_1170x660.jpg');
-- insert into location (locname, lat, long, locpic) values ('Wreck Beach', '49.2656824', '-123.2516173', 'https://i0.wp.com/vancouversbestplaces.com/wp-content/uploads/2018/03/Wreck-Beach.jpg?resize=640%2C310&ssl=1');



-- insert into post (username, time, description, locname, activity, maxppl) values ('Lin', '20220412', '111', 'EOSC', 'biking', 4);
-- insert into post (username, time, description, locname, activity, maxppl) values ('Lin', '20220414', '222', 'Triple O', 'hiking', 4);
-- insert into post (username, time, description, locname, activity, maxppl) values ('Lin', '20220417', '333', 'CIRS', 'table tennis', 4);
-- insert into post (username, time, description, locname, activity, maxppl) values ('Lin', '20220418', '334', 'Nest', 'biking', 4);


-- insert into post (username, time, description, locname, activity, maxppl) values ('Richard', '20220413', '444', 'Sauder', 'table tennis', 4);
-- insert into post (username, time, description, locname, activity, maxppl) values ('Richard', '20190415', '555', 'EOSC', 'studying', 4);
-- insert into post (username, time, description, locname, activity, maxppl) values ('Richard', '20190715', '666', 'EOSC', 'table tennis', 4);
-- insert into post (username, time, description, locname, activity, maxppl) values ('Richard', '20190725', '667', 'Math Building', 'studying', 4);

-- insert into post (username, time, description, locname, activity, maxppl) values ('Peter', '20220414', '222', 'Henning', 'party', 4);
-- insert into post (username, time, description, locname, activity, maxppl) values ('Peter', '20190415', '555', 'Nest', 'gaming', 4);
-- insert into post (username, time, description, locname, activity, maxppl) values ('Peter', '20190715', '666', 'Ponderosa Residence', 'party', 4);
-- insert into post (username, time, description, locname, activity, maxppl) values ('Peter', '20220417', '333', 'Thunderbird Residence', 'others', 4);


-- insert into saved (username, postid) values (1, 1);
-- insert into saved (username, postid) values (1, 2);
-- insert into saved (username, postid) values (2, 3);
-- insert into saved (username, postid) values (2, 4);

-- insert into joiner (username, postid) values (1, 3);
-- insert into joiner (username, postid) values (2, 3);
-- insert into joiner (username, postid) values (2, 4);
-- insert into joiner (username, postid) values (2, 4);

-- insert into joiner (username, postid) values (3, 5);
-- insert into joiner (username, postid) values (3, 6);