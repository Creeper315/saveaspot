const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const db = require('../DB/db').client;

const UserTable = db.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id',
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
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
        stuid: {
            type: DataTypes.STRING,
            unique: true,
            field: 'stuid',
        },
        phone: {
            type: DataTypes.STRING,
        },
        picture: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'User',
        timestamps: false,
    }
);

class User {
    constructor({
        id,
        username,
        password,
        salt,
        stuid,
        phone,
        email,
        picture,
    }) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.stuid = stuid;
        this.phone = phone;
        this.email = email;
        this.picture = picture; // url link of the profile picture
    }
}

module.exports = UserTable;
