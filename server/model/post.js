const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const db = require('../DB/db').client;

const PostTable = db.define(
    'Post',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id',
        },
        username: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'username',
        },
        locname: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'locname',
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'time',
        },
        activity: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'activity',
        },
        description: {
            type: DataTypes.STRING,
            field: 'description',
        },
        maxppl: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'maxppl',
        },
        curppl: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'curppl',
        },
    },
    {
        tableName: 'Post',
        timestamps: false,
    }
);

class Post {
    constructor({
        id,
        requesterid,
        time,
        description,
        locname,
        lat,
        long,
        helper,
        reward,
        visible,
    }) {
        // 这里的 input 是一个 object，因为很多 field 会是 null。

        this.id = id;
        this.requesterid = requesterid;
        this.time = time;
        this.description = description;
        this.locname = locname;
        this.helper = helper; // Helper 是 User name
        this.reward = reward;
        this.visible = visible;
        this.lat = lat;
        this.long = long;
    }
}

module.exports = PostTable;
