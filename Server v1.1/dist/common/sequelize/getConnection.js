"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE = exports.getMysqlDbConfig = exports.getMysqlConnection = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("./models");
let existingConn;
const DATABASE = "pcs-qc";
exports.DATABASE = DATABASE;
const getMysqlDbConfig = (database) => {
    return {
        username: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PWD || "Lukistarmat1",
        host: process.env.MYSQL_URL || "localhost",
        port: process.env.MYSQL_PORT ? +process.env.MYSQL_PORT : 3306,
        ...(database ? { database } : {}),
        dialect: "mysql",
        logging: false,
        define: { freezeTableName: true, underscored: true },
        pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    };
};
exports.getMysqlDbConfig = getMysqlDbConfig;
const getMysqlConnection = (withDatabase = true, persist = true) => {
    const dbConn = existingConn ||
        new sequelize_1.Sequelize(getMysqlDbConfig(withDatabase ? DATABASE : undefined));
    if (!existingConn && persist) {
        existingConn = dbConn;
    }
    const models = (0, models_1.getModelsWithAssociations)(dbConn);
    return { dbConn, models };
};
exports.getMysqlConnection = getMysqlConnection;
