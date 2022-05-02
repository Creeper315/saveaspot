const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const db = require('../DB/db').client;

const SavedTable = db.define(
    'Saved',
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
        postid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'postid',
        },
    },
    {
        tableName: 'Saved',
        timestamps: false,
    }
);

module.exports = SavedTable;
