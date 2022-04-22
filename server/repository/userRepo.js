const UserTable = require('../model/user');
const db = require('../DB/db').client;

// id, username, password, stuid, phone, email, picture

async function addUser({
    username,
    email,
    password,
    salt,
    stuid,
    phone,
    picture,
}) {
    try {
        const r = await UserTable.create({
            username: username,
            email: email,
            password: password,
            salt: salt,
            stuid: stuid,
            phone: phone,
            picture: picture,
        });
        // console.log('addUser2 result ', r);
        return r.null; // 这个 r.null 就是新创建的 user 的 id
    } catch (err) {
        console.log('Add User Error: ', err);
        return false;
    }
}

async function addUserNotUsed({
    username,
    email,
    password,
    stuid,
    phone,
    picture,
}) {
    const [results, metadata] = await db.query(
        `insert into user (username, email, password, stuid, phone, picture) values (${username}, ${email}, ${password}, ${stuid},${phone},${picture});`
        // `insert into user (username, email, password, stuid, phone, picture) values ("${username}", "${email}", "${password}", "${stuid}","${phone}","${picture}");`
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
    let id = userObj.id;
    delete userObj.id;
    if (id == undefined) {
        throw '? ID is not given when update';
    }
    let exist = await checkExist(userObj);
    // try {
    if (exist) {
        console.log('in update, Not Unique ', exist);
        throw exist;
        // throw new Error(exist);
    }
    // console.log('BEFORE UPDATE, id, obj ', id, userObj);

    // check that some "NOT NULL" fields are not set to null or undefined.
    //

    let result = await UserTable.update(userObj, {
        where: {
            id: id,
        },
    });
    // console.log('update result ', result);
    return result;
    // } catch (err) {
    //     // throw new Error(err);
    //     console.log('update error ! ', err);
    // }
}

async function checkExist(userObj) {
    // check if user already exist, based on username or student id or email
    let errorMsg = '';
    // console.log('check unique start ', userObj);
    let sql = `select * from user where username = "${userObj.username}" or stuid = "${userObj.stuid}" or email = "${userObj.email}"`;
    const [exist] = await db.query(sql);
    // console.log('check unique ', exist);
    if (exist.length > 20) {
        errorMsg = 'Username or Student Number or Email already exist';
    } else {
        for (let e of exist) {
            if (e.username != null && e.username == userObj.username) {
                errorMsg += ' Username already exist.';
            }
            if (e.stuid != null && e.stuid == userObj.stuid) {
                errorMsg += ' Student Number already exist.';
            }
            if (e.email != null && e.email == userObj.email) {
                errorMsg += ' Email already exist.';
            }
        }
    }

    // console.log('unique msg ', errorMsg);
    if (errorMsg != '') {
        return errorMsg;
    }
    return false;
}

async function getUser({ id, username, stuid, email }) {
    // get list of user satisfying one of these values. (因为这些值都是 unique，所以按理说只会拿到 1 个 row 的 user)
    // console.log('get user ', [id, username, stuid, email]);
    let sql = '';
    if (id != undefined) {
        sql = `select * from user where id = ${id}`;
    } else if (username != undefined) {
        sql = `select * from user where username = "${username}"`;
    } else if (stuid != undefined) {
        sql = `select * from user where stuid = "${stuid}"`;
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

module.exports = { addUser, updateUser, checkExist, getUser };
