map api: AIzaSyD-F9PkcMOHcDp5Zht0WTEP20tWLj0BDAk

在当前目录，先在 terminal 输入 sqlite3，来打开 sqlite3 ，注：ctr + d 是退出

.open spot.db 来打开这个 database，如果 database 不存在，就创建这个

打开 spot.db 后， .tables 来查看当前的 tables

然后，.read 路径/xxx.sql 来读某个 .sql 文件里的 query。比如读 create table，insert 什么的


在 terminal 里，sqlite3 打开的情况下，也可以直接跑 query，比如

INSERT INTO Users(email, secret, name) VALUES(‘admin@saveaspot.com’, ‘SaveASpot.123’, ‘Admin’)



读 sql 文件，我用了：

.read ../server/DB/script.js/drop.sql

.read ../server/DB/script.js/create.sql

.read ../server/DB/script.js/insert.sql


查看 table 结构

.schema TableName


some Query

insert into user (username, password, stuid) values ('richard', '123', '41174153');

DELETE FROM user Where username = 'richard';

Lin - zhuzhu

select locname, time, username, description from post join user on post.userid = user.id order by time desc;




