import {Sequelize} from '../node_modules/sequelize/lib/index.mjs';
const sequelizeCon = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});


export class Universities extends Sequelize.Model{};

Universities.init(
    {
        university: {
            type: Sequelize.DataTypes.STRING
        },
        fullname: {
            type: Sequelize.DataTypes.TEXT
        },
        category: {
            type: Sequelize.DataTypes.STRING
        },
        imgLink: {
            type: Sequelize.DataTypes.STRING
        },
        shortText: {
            type: Sequelize.DataTypes.TEXT
        },
        place: {
            type: Sequelize.DataTypes.JSON
        },
        pageLink: {
            type: Sequelize.DataTypes.STRING
        }
    }, {sequelize: sequelizeCon, modelName: 'Universities'}
);

sequelizeCon.sync();
