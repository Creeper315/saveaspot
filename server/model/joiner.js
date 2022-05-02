const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const db = require('../DB/db').client;

const JoinerTable = db.define(
    'Joiner',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id',
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'username',
        },
        postid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'postid',
        },
    },
    {
        tableName: 'Joiner',
        timestamps: false,
    }
);

module.exports = JoinerTable;
