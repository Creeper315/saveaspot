const {
    updateUser,
    joinUser,
    cancelJoinUser,
    getUser,
} = require('../repository/userRepo');
const { updatePost } = require('../repository/postRepo');

async function getuser(req, res) {
    let username = req.query.username; // 需要查找的 user 的 username
    let user = await getUser({ username });
    if (user == null) {
        res.status(400).send('null user');
        return;
    }
    if (user.password) delete user.password;
    if (user.salt) delete user.salt;

    res.status(200).json(user);
}

async function userUpdate(req, res) {
    // let id = req.info.id;
    let userObj = req.body;
    // console.log('up user', userObj);
    let r = await updateUser(userObj);
    res.status(200).json(r);
}

async function userJoin(req, res) {
    let username = req.info.username;
    let { postid, curppl, toJoin } = req.body;
    let postObj;
    if (toJoin) {
        await joinUser(username, postid);
        postObj = { postid, curppl: curppl + 1 };
    } else {
        await cancelJoinUser(username, postid);
        if (curppl <= 0) {
            console.log('ERR?? how can curppl be <= 0 ?');
            postObj = { postid, curppl: 0 };
        } else {
            postObj = { postid, curppl: curppl - 1 };
        }
    }
    await updatePost(postObj);

    res.status(200).send('success');
}

// async function userCancelJoin(req, res) {
//     let username = req.info.username;
//     let { postid, curppl } = req.body;
//     await cancelJoinUser(username, postid);
//     if (curppl <= 0) {
//         console.log('ERR??/ how can curppl be <= 0 ?');
//         let postObj = { postid, curppl: curppl - 1 };
//         await updatePost(postObj);
//     }

//     res.status(200).send('success');
// }

module.exports = { userUpdate, userJoin, getuser };
