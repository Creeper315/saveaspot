const PostTable = require('../model/post');
const db = require('../DB/db').client;

const excQuery = async (sql) => {
    const [found] = await db.query(sql);
    // ↑ 第一个 [] 是因为，结果return出来的是 [results, metadata], 所以 [result] 只会获取 results，没有 metadata
    // if (found.length == 0) {
    //     return null;
    // }
    // console.log('get Post ', found);
    return found;
};

const updatePost = async (postObj) => {
    // 在postController 里需要写好：postObj 里面的，是 .id 还是 .postid
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
    // console.log('update post result', result);
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
    // console.log('delete result ', r);
    return r;
};

const savePost = async (username, postid) => {
    let sql = `insert into saved (username, postid) values ("${username}", ${postid});`;
    let r = await db.query(sql);
    return r;
};

const checksaved = async (username, postid) => {
    let sql = `select count(*) as c from saved where username="${username}" and postid=${postid}`;
    let [r] = await db.query(sql);
    r = r[0].c;
    // console.log('check saved: ', r);
    if (r >= 1) {
        return true;
    }
    return false;
};

const saveDelete = async (username, postid) => {
    let sql = `delete from saved where username="${username}" and postid=${postid};`;
    let r = await db.query(sql);
    return r;
};

module.exports = {
    excQuery,
    updatePost,
    createPost,
    deletePost,
    savePost,
    saveDelete,
    checksaved,
};
