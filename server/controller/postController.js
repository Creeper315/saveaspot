const { del } = require('express/lib/application');
const req = require('express/lib/request');
const {
    getPost,
    updatePost,
    createPost,
    deletePost,
    savePost,
    saveDelete,
    checksaved,
} = require('../repository/postRepo');
const { updateUser } = require('../repository/userRepo');

const init_state = {
    listLocation: [], // Array of location name
    // listUser: null, // string, username Or stuid
    // userId: null,  // 不需要这个了，因为从 authMiddle 里面，req.info 就是当前登录的 user
    ownPost: false,
    saved: false,
    helpedByMe: false,
    pageSize: 3,
    onPage: 1,
};

// req.info === { name: u.name, id: u.id }

async function postHelp(req, res) {
    let { toHelp, postId } = req.body;
    let username = req.info.name;

    if (toHelp) {
        var r = await updatePost({ postid: postId, helper: username });
    } else {
        var r = await updatePost({ postid: postId, helper: null });
    }
    res.status(200).send('help success');
}

async function postSave(req, res) {
    let { toSave, postId } = req.body;
    let userid = req.info.id;

    if (toSave) {
        var r = await savePost(userid, postId);
    } else {
        var r = await saveDelete(userid, postId);
    }
    res.status(200).send('save success');
}

async function postDelete(req, res) {
    let id = req.body.postId;
    let r = await deletePost(id);
    res.status(200).send('delete success');
}

async function checkSaved(req, res) {
    let { postId } = req.body;
    let userId = req.info.id;
    console.log('check --- ', userId, postId);
    let result = await checksaved(userId, postId);
    res.status(200).send(result);
}

async function postUpdate(req, res) {
    let postObj = req.body;
    console.log('body !!!!!!!', req.body);

    let r = await updatePost(postObj);
    res.status(200);
}

async function postEdit(req, res) {
    let { postObj, userObj } = req.body;
    userObj.id = req.info.id;
    console.log('update body !!!!!!!', postObj, userObj);

    let r = await updatePost(postObj);
    let u = await updateUser(userObj);
    console.log('update result ', r, u);
    res.status(200);
}

// SideBar 只用来 Edit personal profile. 比如 头像，名字，contact information
// Top Nav 只用来 filter posts。 filter 的选项，Own Post, Saved, location 可以叠加。取消查别人的 post
// async function getTotalNumPosts(){
//     let sql = `select count(*) from `
// }
function filterRequirement(filterOption, myId, myName) {
    // select .... from ... where (return)
    let sql = '';
    let condition = [];

    if (filterOption.listLocation.length > 0) {
        let str = filterOption.listLocation;
        str = str.map((e) => {
            return `"${e}"`;
        });
        str.join(', ');
        str = 'pp.locname in (' + str + ')';
        console.log('joined - ', str);
        condition.push(str);
    }
    if (filterOption.ownPost == true) {
        let str = `pp.userid=${myId}`;
        condition.push(str);
    } else if (filterOption.userId != null) {
        let str = `pp.userid=${filterOption.userId}`;
        condition.push(str);
    }
    if (filterOption.saved) {
        let str = `pp.id in (select postid from saved where userid=${myId})`;
        condition.push(str);
    }
    if (filterOption.helpedByMe) {
        let str = `pp.id in (select id from post where helper="${myName}")`;
        condition.push(str);
    }
    if (condition.length) {
        sql += ' where ';
        sql += condition.join(' and ');
    }
    return sql;
}
function getPageStr(pageSize, onPage) {
    let off = (onPage - 1) * pageSize;
    let str = ` order by time desc limit ${pageSize} offset ${off}`;
    return str;
}

async function getPageData(req, res) {
    let filterOption = req.body;
    console.log('Filter Option', filterOption);

    let userInfo = req.info;
    if (userInfo == undefined || userInfo.id == undefined) {
        throw 'User is not defined? need re-login ?';
    }
    let myId = userInfo.id;
    let myName = userInfo.name;
    let condition = filterRequirement(filterOption, myId, myName);
    let join =
        'user uu join post pp join location ll on pp.userid=uu.id and pp.locname=ll.locname';
    // select * from post pp join location ll join user uu on pp.userid=uu.id and pp.locname=ll.locname
    // where
    let sql1 = `select count(*) as count from `;
    sql1 += join + condition;
    sql1 += ';';
    // console.log('final SQL1 ', sql1);
    let countPost = await getPost(sql1);
    countPost = countPost[0]['count'];
    // console.log('count post is: ', countPost);

    let totalPage = Math.ceil(countPost / filterOption.pageSize);
    let onPage = filterOption.onPage;

    if (countPost === 0) {
        onPage = 0;
        totalPage = 0;
    } else {
        if (onPage <= 0) {
            onPage = 1;
        }
        if (onPage > totalPage) {
            onPage = totalPage;
        }
    }
    // select u.username, p.time, l.locname from user u join post p left join location l on u.id=p.userid and p.locname=l.locname where p.locname='EOSC';
    // select u.username, p.time, p.locname from user u join post p left join location l on p.userid=u.id and p.locname=l.locname where p.locname="EOSC";

    // select u.username, p.time, p.locname from user u join post p on p.userid=u.id  where p.locname="EOSC";

    let sql2 =
        'select pp.id as postid, uu.id as userid, uu.username, uu.picture as userp, uu.email, uu.phone, pp.time, pp.description, pp.locname, pp.helper, pp.reward, ll.lat, ll.long, pp.picture as postp, ll.picture as locp from ';

    sql2 += join + condition;
    sql2 += getPageStr(filterOption.pageSize, onPage);
    sql2 += ';';

    console.log('final SQL2 ', sql2);

    let list = await getPost(sql2);

    console.log('Result ', list);
    // console.log('page : ', onPage, ' / ', totalPage);

    res.status(200).json({ pageData: list, onPage, totalPage });
}

module.exports = {
    getPageData,
    postUpdate,
    postHelp,
    postSave,
    postDelete,
    checkSaved,
    postEdit,
};
