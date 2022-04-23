const { hashPassword, reHashPassword, createToken } = require('../helper');
const jwt = require('jsonwebtoken');
const {
    updateUser,
    getUser,
    addUser,
    checkExist,
} = require('../repository/userRepo');

// 注意，很多 function 都是 async，包括 hashPassword()[-]

async function login(req, res) {
    let { username, email, stuid, password } = req.body;

    let got = await getUser({ username, email, stuid });
    if (got == null) {
        throw 'User Does Not Exist';
    }
    let hashed = await reHashPassword(password, got.salt);
    // console.log('LOGIN password, hashed , got', password, hashed, got.password);

    if (got.password != hashed) {
        throw 'Password Incorrect';
    }
    initCookie(res, { name: got.username, id: got.id });
    console.log('what is res.cookie', res.cookie);
    delete got.password;
    delete got.salt;
    res.status(200).json(got);
}

async function register(req, res) {
    let userObj = req.body;
    // userObj = replaceNull(userObj);
    // console.log('to register obj ', userObj);
    let exist = await checkExist(userObj);
    if (exist) {
        res.status(400).send(exist);
    }
    let [hashed, salt] = await hashPassword(userObj.password);
    // console.log('password, hashed ', userObj.password, hashed);
    userObj.password = hashed;
    userObj.salt = salt;
    // console.log('to register obj 2', userObj);

    let createdUserId = await addUser(userObj);
    initCookie(res, { name: userObj.username, id: createdUserId });
    delete userObj.password;
    delete userObj.salt;
    userObj.id = createdUserId;
    res.status(200).json(userObj);
}

async function test(req, res, next) {
    // let o = {
    //     username: 'yuncheng',
    //     password: 'cute',
    //     stuid: '12345',
    //     email: 'wow@hehe',
    // };
    // let r = await addUser(o);
    // let o = {
    //     id: 2,
    //     username: 'yuncheng',
    //     email: 'wow@hehe',
    // };
    // let r = await updateUser(o);
    // console.log('what ?', r);
    // let o = {
    //     username: 'bobo',
    //     password: '333',
    // };
    // // o = replaceNull(o);
    // console.log('o replaced ', o);
    // let r = await addUser2(o);
    // res.status(200).json(r);
    // console.log('test result :', r.null, r['null']);
}
// res.cookie('cookie1' : { name: 'Leo' }).cookie('cookie2' : 'Teste').send()

function initCookie(res, userInfo) {
    // httponly, secure:
    // assume login success here.
    // res.clearCookie('c1');
    // res.clearCookie('c2');
    let token1 = createToken(userInfo, 'access');
    let token2 = createToken(userInfo, 'refresh');
    console.log('My Access Token is: ', token1);
    res.cookie('ACCESS_TOKEN', token1);
    res.cookie('REFRESH_TOKEN', token2);
    // res.send('cookie success?');
    // res.status(200).json(c);
}

module.exports = {
    login,
    register,
    test,
    // authMiddle,
    // refresh,
};
