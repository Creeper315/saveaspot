const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const db = require('../DB/db').client;

const LocationTable = db.define(
    'Location',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id',
        },
        locname: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'locname',
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
        tableName: 'Location',
        timestamps: false,
    }
);

class Location {
    constructor({ id, locname, lat, long, picture }) {
        this.id = id;
        this.locname = name;
        this.lat = lat;
        this.long = long;
        this.picture = picture;
    }
}

module.exports = LocationTable;
