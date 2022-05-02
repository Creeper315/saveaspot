const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const db = require('../DB/db').client;

const UserTable = db.define(
    'User',
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            field: 'username',
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
            field: 'email',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password',
        },
        salt: {
            type: DataTypes.STRING,
            field: 'salt',
        },
        phone: {
            type: DataTypes.STRING,
        },
        userpic: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'User',
        timestamps: false,
    }
);

module.exports = UserTable;
