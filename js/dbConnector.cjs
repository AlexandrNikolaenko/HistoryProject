// import sequelize from 'sequelize';
const { Sequelize, DataTypes, Model } = require('sequelize');
// import { Sequelize } from '../node_modules/sequelize/lib/sequelize.js';
const sequelizeCon = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

class Universities extends Model{};

Universities.init(
    {
        university: {
            type: DataTypes.STRING
        },
        fullname: {
            type: DataTypes.TEXT
        },
        category: {
            type: DataTypes.STRING
        },
        imgLink: {
            type: DataTypes.STRING
        },
        shortText: {
            type: DataTypes.TEXT
        },
        place: {
            type: DataTypes.JSON
        },
        pageLink: {
            type: DataTypes.STRING
        }
    }, {sequelize: sequelizeCon, modelName: 'Universities'}
);

sequelizeCon.sync();

exports.Universities = Universities;