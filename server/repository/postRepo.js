const PostTable = require('../model/post');
const db = require('../DB/db').client;

const getPost = async (sql) => {
    const [found] = await db.query(sql);
    // ↑ 第一个 [] 是因为，结果return出来的是 [results, metadata], 所以 [result] 只会获取 results，没有 metadata
    // if (found.length == 0) {
    //     return null;
    // }
    delete found.password;
    delete found.salt;
    return found;
};

const updatePost = async (postObj) => {
    // 在postController 里需要写好：postObj 里面的，是 .id 还是 .postid
    console.log('in Repo update, post:', postObj);
    let id = postObj.postid;
    delete postObj.postid;
    postObj.picture = postObj.postp;
    if (id == undefined) {
        throw 'Post Id Not Defined';
    }
    let result = await PostTable.update(postObj, {
        where: {
            id: id,
        },
    });
    console.log('update result', result);
    return result;
};

const createPost = async (postObj) => {
    // implement validation later

    const r = await PostTable.create(postObj);
    return r.null;
};

const deletePost = async (id) => {
    let sql = `delete from post where id = ${id};`;
    let r = await db.query(sql);
    console.log('delete result ', r);
    return r;
};

const savePost = async (userid, postid) => {
    let sql = `insert into saved (userid, postid) values (${userid}, ${postid});`;
    let r = await db.query(sql);
    return r;
};

const checksaved = async (userid, postid) => {
    let sql = `select count(*) as c from saved where userid=${userid} and postid=${postid}`;
    let [r] = await db.query(sql);
    r = r[0].c;
    console.log('check saved: ', r);
    if (r >= 1) {
        return true;
    }
    return false;
};

const saveDelete = async (userid, postid) => {
    let sql = `delete from saved where userid=${userid} and postid=${postid};`;
    let r = await db.query(sql);
    return r;
};

module.exports = {
    getPost,
    updatePost,
    createPost,
    deletePost,
    savePost,
    saveDelete,
    checksaved,
};
