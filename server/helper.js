const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function hashPassword(password) {
    let salt = await bcrypt.genSalt();
    let hashed = await bcrypt.hash(password, salt);
    return [hashed, salt];
}

async function reHashPassword(password, salt) {
    if (salt == undefined) {
        throw 'Need to provide salt!';
    }
    let hashed = await bcrypt.hash(password, salt);
    return hashed;
}

function replaceNull(obj) {
    let o = {
        username: null,
        password: null,
        salt: null,
        phone: null,
        email: null,
        userpic: null,
    };
    for (let [k, v] of Object.entries(obj)) {
        if (v != undefined) {
            o[k] = v;
        }
    }
    return o;
}

function gError(func) {
    // Global Error Handling !
    return (req, res, next) => {
        func(req, res).catch((e) => {
            console.log('Global Error : ', e);
            res.status(400).json(e); // 把 error 也 send 回去？
        });
    };
}

function createToken(data, type) {
    // console.log('Process Env Exist? ', process.env.ACCESS_TOKEN);
    // console.log('create token', data, type);
    if (type == 'access') {
        var token = jwt.sign(data, '' + process.env.ACCESS_TOKEN, {
            expiresIn: 60,
            // secure: true,
            // httpOnly: true,
            // sameSite: 'lax',
        });
    } else {
        var token = jwt.sign(data, '' + process.env.REFRESH_TOKEN);
    }
    return token;
}

function authMiddle(req, res, next) {
    // user 拿到 token，现在准备 request，
    // console.log('auth middle req c ', req.cookies);
    let token = req.cookies.ACCESS_TOKEN;
    // console.log('token got is : ', token);
    if (token == undefined) {
        return res.status(401).send('token not provided');
    }
    jwt.verify(token, '' + process.env.ACCESS_TOKEN, (err, userInfo) => {
        // console.log('info ', userInfo);
        if (err) {
            if (err.name == 'TokenExpiredError') {
                // console.log('access expred');
                // return res.status(403).json(err.name);
                refresh(req, res, next);
            } else {
                return res.status(403).json('Invalid Token ~');
            }
        } else {
            req.info = userInfo; // Here we set req 里面的一个 值，后面就能直接用 info
            // console.log('success info ', userInfo);
        }

        next();
    });
}
function refresh(req, res) {
    // console.log('refresh req c', req.cookies);
    let token2 = req.cookies.REFRESH_TOKEN;
    if (token2 == undefined) {
        return res.status(401).send('refresh token not given');
    }

    jwt.verify(token2, '' + process.env.REFRESH_TOKEN, (err, u) => {
        if (err) {
            // console.log('refresh token has error', err.name);
            return res.status(403).send(err);
        }
        // console.log('from refresh u', u);
        let newToken = createToken({ username: u.username }, 'access');
        req.info = u;
        // res.clearCookie('ACCESS_TOKEN');

        res.cookie('ACCESS_TOKEN', newToken, { httpOnly: true });
        // res.cookie('ACCESS_TOKEN', newToken);

        // res.send('refreshed');
    });
}

module.exports = {
    gError,
    hashPassword,
    createToken,
    authMiddle,
    reHashPassword,
    replaceNull,
};
