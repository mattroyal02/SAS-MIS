"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const getUserModel = (sequelize) => {
    const User = sequelize.define(config_1.modelNames.user, {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING(256),
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING(256),
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING(256),
            allowNull: false,
        },
        first_name: {
            type: sequelize_1.DataTypes.STRING(256),
            allowNull: false,
        },
        surname: {
            type: sequelize_1.DataTypes.STRING(256),
            allowNull: false,
        },
        company_name: {
            type: sequelize_1.DataTypes.STRING(256),
            allowNull: false,
        },
        job_title: {
            type: sequelize_1.DataTypes.STRING(256),
            allowNull: true,
        },
        phone_number: {
            type: sequelize_1.DataTypes.STRING(256),
            allowNull: true,
        },
        role: {
            type: sequelize_1.DataTypes.STRING(256),
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
    return User;
};
exports.default = getUserModel;
