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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'userid',
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'time',
        },
        description: {
            type: DataTypes.STRING,
            field: 'description',
        },
        locname: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'locname',
        },
        helper: {
            type: DataTypes.INTEGER,
            field: 'helper',
        },
        reward: {
            type: DataTypes.STRING,
            field: 'reward',
        },
        visible: {
            type: DataTypes.INTEGER,
            field: 'visible',
        },
        lat: {
            type: DataTypes.DECIMAL,
            field: 'lat',
        },
        long: {
            type: DataTypes.DECIMAL,
            field: 'long',
        },
        picture: {
            type: DataTypes.STRING,
            field: 'picture',
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
