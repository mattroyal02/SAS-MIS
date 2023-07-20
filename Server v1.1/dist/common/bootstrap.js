"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = exports.alter = void 0;
const sequelize_1 = require("./sequelize");
const bootstrap = async () => {
    const { dbConn } = (0, sequelize_1.getMysqlConnection)(false, false);
    await dbConn.query(`DROP DATABASE IF EXISTS \`${sequelize_1.DATABASE}\``);
    await dbConn.query(`CREATE DATABASE\`${sequelize_1.DATABASE}\``);
    const { dbConn: realConn } = (0, sequelize_1.getMysqlConnection)(true);
    await realConn.sync({ force: true });
};
exports.bootstrap = bootstrap;
const alter = async () => {
    const { dbConn } = (0, sequelize_1.getMysqlConnection)();
    await dbConn.sync({ alter: true });
};
exports.alter = alter;
