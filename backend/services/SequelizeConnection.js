import { Sequelize} from "sequelize";

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    username:"root",
    database: 'websukien',
});

module.exports = sequelize;