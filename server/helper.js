const bcrypt = require('bcrypt');

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
    console.log('replace ', obj);
    let o = {
        username: null,
        password: null,
        salt: null,
        stuid: null,
        phone: null,
        email: null,
        picture: null,
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

module.exports = {
    gError,
    hashPassword,
    reHashPassword,
    replaceNull,
};
