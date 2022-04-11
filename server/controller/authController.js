const { hashPassword, reHashPassword, replaceNull } = require('../helper');
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
    console.log('LOGIN password, hashed , got', password, hashed, got.password);

    if (got.password != hashed) {
        throw 'Password Incorrect';
    }

    res.status(200).json(got.id);
}

async function register(req, res) {
    let userObj = req.body;
    // userObj = replaceNull(userObj);
    console.log('to register obj ', userObj);
    let exist = await checkExist(userObj);
    if (exist) {
        res.status(400).send(exist);
    }
    let [hashed, salt] = await hashPassword(userObj.password);
    // console.log('password, hashed ', userObj.password, hashed);
    userObj.password = hashed;
    userObj.salt = salt;
    console.log('to register obj 2', userObj);

    let createdUserId = await addUser(userObj);

    res.status(200).json(createdUserId);
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

    console.log();
    let str = req.headers.authorization;
    let token = str && str.split(' ')[1];
    if (token == undefined) {
        res.status(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, info) => {
        console.log('info ', info);
        if (err) {
            console.log('err', err);
        }
        req.info = info;
        next();
    });
}
// res.cookie('cookie1' : { name: 'Leo' }).cookie('cookie2' : 'Teste').send()

async function cookie(req, res) {
    // httponly, secure:
    // assume login success here.

    let u = {
        username: 'bob',
        id: '3',
    };
    let token1 = jwt.sign(u, process.env.ACCESS_TOKEN);
    let token2 = jwt.sign(u, process.env.REFRESH_TOKEN);
    res.cookie('ACCESS_TOKEN', token1);
    res.cookie('REFRESH_TOKEN', token2);
    res.send('cookie success?');
    // res.status(200).json(c);
}
async function authMiddle(req, res, next) {
    // user 拿到 token，现在准备 request，
    console.log('auth middle req c ', req.cookies);
    let token = req.cookies.ACCESS_TOKEN;
    if (token == undefined) {
        res.status(401).end();
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, info) => {
        console.log('info ', info);
        if (err) {
            console.log('err', err);
            res.status(403).end();
        }
        req.info = info; // Here we set req 里面的一个 值，后面就能直接用 info
        console.log('success info ', info);
        next();
    });
}
async function refresh(req, res) {
    console.log('refresh req c', req.cookies);
    let token2 = req.cookies.REFRESH_TOKEN;
    if (token2 == undefined) {
        res.status(401).end();
    }

    jwt.verify(token2, process.env.REFRESH_TOKEN, (err, u) => {
        if (err) {
            res.status(403).end();
        }
        console.log('from refresh u', u);
        const newToken = jwt.sign(u, process.env.ACCESS_TOKEN);
        // req.cookie
        res.json(newToken);
    });
}

module.exports = {
    login,
    register,
    test,
    cookie,
    authMiddle,
    refresh,
};
