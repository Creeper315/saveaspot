const Location = require('../model/location');
const db = require('../DB/db').client;

async function getLocation() {
    let sql = `select * from location;`;
    let [list] = await db.query(sql);
    return list;
}

async function getUserString(str) {
    let sql = `select id, username from user where username like "%${str}%" order by username asc limit 30`;
    let [list] = await db.query(sql);
    return list;
}

// async function onPostDelete(postid) {
//     let SQL1 = `delete from joiner where postid=${postid};`;
//     let SQL2 = `delete from saved where postid=${postid};`;

//     await db.query(SQL1);
//     await db.query(SQL2);
//     return true;
// }

module.exports = { getLocation, getUserString };
