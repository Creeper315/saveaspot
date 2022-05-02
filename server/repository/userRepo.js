const UserTable = require('../model/user');
const db = require('../DB/db').client;

//  username, password, salt, phone, email, userpic

async function addUser({ username, email, password, salt, phone, userpic }) {
    try {
        const r = await UserTable.create({
            username: username,
            email: email,
            password: password,
            salt: salt,
            phone: phone,
            userpic: userpic,
        });
        // console.log('addUser2 result ', r);
        return r.null; // 这个 r.null 就是新创建的 user 的 id
    } catch (err) {
        console.log('Add User Error: ', err);
        return false;
    }
}

async function addUserNotUsed({ username, email, password, phone, userpic }) {
    const [results, metadata] = await db.query(
        `insert into user (username, email, password, phone, userpic) values (${username}, ${email}, ${password},${phone},${userpic});`
    );
    console.log('Add User ', results, 'META ', metadata, metadata.lastID);
    return metadata.lastID;
}

async function updateUser(userObj) {
    // check: 这个 user 如果不存在，会怎么样？ 如果 update 但是违反了 constraint 肿么办
    // solve:
    // 假设：input 的 id，肯定是目前已存在的 user 的 id
    // 可以搞个 input validation, 确保 input ，比如 username 不是 null - 前端可以做 validation？
    // 如果发现想 update 的 email，或者 username，已经存在，不 update 并且告诉 user 已存在

    // console.log('update start');

    if (userObj.username == undefined) {
        throw '? Username is not given when update';
    }
    let exist = await checkExist(userObj);
    if (exist) {
        console.log('ERR: in update user ', exist);
        throw exist;
    }
    let username = userObj.username;
    delete userObj.username;

    let result = await UserTable.update(userObj, {
        where: {
            username: username,
        },
    });
    console.log('update result ', result);
    return result;
    // } catch (err) {
    //     // throw new Error(err);
    //     console.log('update error ! ', err);
    // }
}

async function checkExist(userObj) {
    // 因为 USERNAME 是 PK，所以 Username 设定为无法改变！

    let errorMsg = '';
    // console.log('check unique start ', userObj);
    let sql = `select username from user where username<>"${userObj.username}" and email = "${userObj.email}"`;
    const [exist] = await db.query(sql);

    if (exist.length > 0) {
        errorMsg = 'Email already exist';
        return errorMsg;
    }
    return false;
}

async function getUser({ username, email }) {
    // get list of user satisfying one of these values. (因为这些值都是 unique，所以按理说只会拿到 1 个 row 的 user)
    // console.log('get user ', [id, username, email]);
    let sql = '';
    if (username != undefined) {
        sql = `select * from user where username = "${username}"`;
    } else if (email != undefined) {
        sql = `select * from user where email = "${email}"`;
    } else {
        return null; // No input was provided
    }
    const [found] = await db.query(sql);
    // ↑ 第一个 [] 是因为，结果return出来的是 [results, metadata], 所以 [result] 只会获取 results，没有 metadata
    // 第二个 [] 是因为，select 语句 return 一个 array of rows。这里我们只找 1 个 user，所以 array length 应该是 1
    if (found.length == 0) {
        return null;
    }
    return found[0];
}

async function joinUser(username, postid) {
    let SQL = `insert into joiner (username, postid) values ("${username}", ${postid});`;

    let r = await db.query(SQL);
    return r;
}

async function cancelJoinUser(username, postid) {
    let SQL = `delete from joiner where username="${username}" and postid= ${postid};`;

    let r = await db.query(SQL);
    return r;
}

module.exports = {
    addUser,
    updateUser,
    checkExist,
    getUser,
    joinUser,
    cancelJoinUser,
};
