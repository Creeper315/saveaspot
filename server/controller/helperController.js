const { getLocation, getUserString } = require('../repository/helperRepo');

async function loadLocation(req, res) {
    // console.log('fun is ', getLocation);
    let listLoc = await getLocation();
    // console.log('list loc', listLoc);
    // 吧这个 list of string  改成 list of {value:, label:}
    // let valueLabelPair = listLoc.map((e) => {
    //     return { value: e.locname.toLowerCase(), label: e.locname };
    // });
    // res.status(200).json({ listLoc, valueLabelPair });
    listLoc = listLoc.map((e) => {
        return { ...e, value: e.locname.toLowerCase(), label: e.locname };
    });
    res.status(200).json(listLoc);
}

async function likeUser(req, res) {
    let str = req.body.str;
    console.log('likeUser ', str);
    let list = await getUserString(str);
    console.log('like found ', list);
    list = list.map((e) => {
        return { ...e, label: e.username };
    });
    res.status(200).json(list);
}

async function updateUser(req, res) {
    let id = req.info.id;
}

module.exports = { loadLocation, likeUser };
