import { Sequelize, DataTypes, Model } from 'sequelize.';
import { dataList } from './modules.js';

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
dataList.forEach((element) => Universities.create(element));