const { hashPassword, reHashPassword, createToken } = require('../helper');
const {
    updateUser,
    getUser,
    addUser,
    checkExist,
} = require('../repository/userRepo');
const jwt = require('jwt-decode');
const { OAuth2Client } = require('google-auth-library');

async function googleIn(req, res) {
    // verify
    //get username, email,
    // 如果这个 google=true 的 username 已经有了，就 login
    // 如果没有，就让他有，set google to true，然后 login
    const { token, clientId } = req.body;
    const client = new OAuth2Client(clientId);

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });
        var payload = ticket.getPayload();
    } catch (err) {
        // console.log('g login e', err);
        res.status(400).send('google login err:', err);
    }
    let username = payload.name;
    let email = payload.email;
    let userpic = payload.picture;
    // account 是否存在。
    let got = await getUser({ username, email });
    if (got == null) {
        // register for this google account
        let userObj = { username, email, userpic, isgoogle: true };
        let createdUserId = await addUser(userObj);
        initCookie(res, { username });
        res.status(200).json(userObj);
    } else {
        // login
        // console.log('google got', got);
        initCookie(res, { username });
        res.status(200).json(got);
    }
}

async function login(req, res) {
    // console.log('has header?');
    let { username, email, password } = req.body;

    let got = await getUser({ username, email });
    if (got == null) {
        throw 'User Does Not Exist';
    }
    // qwe('got:', got);
    let hashed = await reHashPassword(password, got.salt);
    // console.log('LOGIN password, hashed , got', password, hashed, got.password);

    if (got.password != hashed) {
        throw 'Password Incorrect';
    }
    initCookie(res, { username: got.username });
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
    userObj.isgoogle = false;
    // console.log('to register obj 2', userObj);

    let createdUserId = await addUser(userObj);
    // console.log('register created uid ', createdUserId);
    initCookie(res, { username: userObj.username });
    delete userObj.password;
    delete userObj.salt;
    // userObj.id = createdUserId;
    res.status(200).json(userObj);
}

async function test(req, res, next) {
    // let o = {
    //     username: 'yuncheng',
    //     password: 'cute',
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
    // console.log('My Access Token is: ', token1);
    res.cookie('ACCESS_TOKEN', token1, { httpOnly: true });
    res.cookie('REFRESH_TOKEN', token2, { httpOnly: true });
    // res.cookie('ACCESS_TOKEN', token1);
    // res.cookie('REFRESH_TOKEN', token2);
    // res.send('cookie success?');
    // res.status(200).json(c);
}

async function logout(req, res) {
    res.cookie('ACCESS_TOKEN', null);
    res.cookie('REFRESH_TOKEN', null);
    res.status(200).send('ok');
}

module.exports = {
    login,
    register,
    test,
    googleIn,
    logout,
    // authMiddle,
    // refresh,
};
