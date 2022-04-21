const Location = require('../model/location');
const db = require('../DB/db').client;

async function getLocation() {
    let sql = `select locname, lat, long, picture from location;`;
    let [list] = await db.query(sql);
    return list;
}

async function getUserString(str) {
    let sql = `select id, username from user where username like "%${str}%" order by username asc limit 30`;
    let [list] = await db.query(sql);
    return list;
}

module.exports = { getLocation, getUserString };
