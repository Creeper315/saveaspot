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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'userid',
        },
        postId: {
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
