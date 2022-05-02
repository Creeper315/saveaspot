const { del } = require('express/lib/application');
const req = require('express/lib/request');
const {
    excQuery,
    updatePost,
    createPost,
    deletePost,
    savePost,
    saveDelete,
    checksaved,
} = require('../repository/postRepo');
const { updateUser } = require('../repository/userRepo');
// const { onPostDelete } = require('../repository/helperRepo');

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

async function postSave(req, res) {
    let { toSave, postid } = req.body;
    let username = req.info.username;

    if (toSave) {
        var r = await savePost(username, postid);
    } else {
        var r = await saveDelete(username, postid);
    }
    res.status(200).send('save success');
}

async function postDelete(req, res) {
    let postid = req.body.postid;
    console.log('? postid dlt', req.body);
    let r = await deletePost(postid); // 还要 delete 掉 所有的 saved，和 joined！
    // await onPostDelete(postid);
    res.status(200).send('delete success');
}

async function checkSaved(req, res) {
    let { postid } = req.body;
    let username = req.info.username;
    let result = await checksaved(username, postid);
    res.status(200).send(result);
}

async function postUpdate(req, res) {
    let postObj = req.body;

    let r = await updatePost(postObj);
    res.status(200);
}

async function postEdit(req, res) {
    let { postObj, userObj } = req.body;
    userObj.username = req.info.username;
    // userObj.id = req.info.id;
    // console.log('update body !!!!!!!', postObj, userObj);

    let r = await updatePost(postObj);
    let u = await updateUser(userObj);
    // console.log('update result ', r, u);
    res.status(200).send();
}

// SideBar 只用来 Edit personal profile. 比如 头像，名字，contact information
// Top Nav 只用来 filter posts。 filter 的选项，Own Post, Saved, location 可以叠加。取消查别人的 post
// async function getTotalNumPosts(){
//     let sql = `select count(*) from `
// }

// select * from post where username<>"Lin" and locname in (...) and activity in (...) limit xxx offset xxx;
// where xx and xx and xx and not exist (select * from joiner where username="Lin" and post)

// select id from post where username<>"Richard" and not exist (select * from joiner where joiner.username="Richard" and joiner.postid=post.id);
// select id from post where username<>"Richard" and id not in (select postid from joiner where joiner.username="Richard");

function filterCondition(option, myName) {
    let condition = ` where username<>"${myName}" `;
    if (option.listLocation.length > 0) {
        let str = option.listLocation;
        str = str.map((e) => {
            return `"${e}"`;
        });
        str.join(', ');
        str = ' (' + str + ') ';
        condition += ' and ' + 'locname in ' + str;
    }
    if (option.listActivity.length > 0) {
        let str = option.listActivity;
        str = str.map((e) => {
            return `"${e}"`;
        });
        str.join(', ');
        str = ' (' + str + ') ';
        condition += ' and ' + 'activity in ' + str;
    }
    condition += ` and id not in (select postid from joiner where joiner.username ="${myName}") `;
    return condition;
}

// function getPageStr(pageSize, onPage) {
//     let off = (onPage - 1) * pageSize;
//     let str = ` order by time desc limit ${pageSize} offset ${off}`;
//     return str;
// }
function getPageStr(filterOption, count) {
    let onPage = filterOption.onPage;
    let pSize = filterOption.pageSize;
    let totalPage = Math.ceil(count / pSize);

    if (count === 0) {
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
    let off = (onPage - 1) * pSize;
    let str = ` order by time desc limit ${pSize} offset ${off}`;
    return [str, onPage, totalPage];
}

async function getPageData(req, res) {
    let filterOption = req.body;
    // console.log('Filter Option', filterOption);

    let userInfo = req.info;
    if (userInfo == undefined || userInfo.username == undefined) {
        throw 'User is not defined? need re-login ?';
    }

    let myName = userInfo.username;
    let list, onPage, totalPage;
    if (filterOption.isUpcoming) {
        [list, onPage, totalPage] = await myupcoming(filterOption, myName);
    } else if (filterOption.isSaved) {
        [list, onPage, totalPage] = await getsaved(filterOption, myName);
    } else {
        [list, onPage, totalPage] = await getFiltered(filterOption, myName);
    }
    res.status(200).json({ pageData: list, onPage, totalPage });
}
async function getFiltered(filterOption, myName) {
    let condition = filterCondition(filterOption, myName);

    let SQL_count = 'select count(*) as count from post ';
    SQL_count += condition;
    SQL_count += ';';
    // console.log('final SQL1 ', SQL_count);

    let countPost = await excQuery(SQL_count);
    countPost = countPost[0]['count'];
    // console.log('count post is: ', countPost);
    let [pageStr, onPage, totalPage] = getPageStr(filterOption, countPost);

    let SQL_all = 'select * from post ';

    SQL_all += condition;
    SQL_all += pageStr;
    SQL_all += ';';

    // console.log('final SQL2 ', SQL_all);

    let list = await excQuery(SQL_all);
    list = list.map((e) => {
        return { ...e, btn: 'Join' };
    });
    // console.log('Post All Result List', list);
    // console.log('page : ', onPage, ' / ', totalPage);
    return [list, onPage, totalPage];
}

async function myupcoming(filterOption, myName) {
    let SQL_count = `select count(*) as count from post where username="${myName}" or id in (select postid from joiner where username="${myName}");`;
    let countPost = await excQuery(SQL_count);
    countPost = countPost[0]['count'];

    let [pageStr, onPage, totalPage] = getPageStr(filterOption, countPost);

    let SQL_all = `select * from post where username="${myName}" or id in (select postid from joiner where username="${myName}") `;

    SQL_all += pageStr;
    SQL_all += ';';
    // console.log('upcoming SQL all', SQL_all);
    // select * from post where username="Lin" or id in (select postid from joiner where username="Lin")  order by time desc limit 3 offset 0
    let list = await excQuery(SQL_all);
    list = list.map((e) => {
        if (e.username !== myName) {
            return { ...e, btn: 'Leave' };
        }
        return e;
    });

    // console.log('Post Upcoming Result ', list);
    // console.log('page : ', onPage, ' / ', totalPage);
    return [list, onPage, totalPage];
}

async function getsaved(filterOption, myName) {
    let condition = ` where id in (select postid from saved where username="${myName}") `;
    let SQL_count = `select count(*) as count from post `;
    SQL_count += condition + ';';

    let countPost = await excQuery(SQL_count);
    countPost = countPost[0]['count'];

    let [pageStr, onPage, totalPage] = getPageStr(filterOption, countPost);

    let SQL_all = `select * from post ` + condition + pageStr + ';';
    let list_all = await excQuery(SQL_all);

    let SQL_which_join = `select postid from joiner where username="${myName}"`;
    let joined_posts = await excQuery(SQL_which_join);
    joined_posts = joined_posts.map((e) => e.postid);
    let ss = new Set(joined_posts);
    // console.log('joined posts ', joined_posts, ss);
    list_all = list_all.map((e) => {
        if (ss.has(e.id)) {
            return { ...e, btn: 'Leave' };
        }
        return { ...e, btn: 'Join' };
    });
    return [list_all, onPage, totalPage];
}

module.exports = {
    getPageData,
    postUpdate,
    postSave,
    postDelete,
    checkSaved,
    postEdit,
    myupcoming,
    getsaved,
};
