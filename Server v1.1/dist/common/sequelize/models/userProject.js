"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const getUserProjectModel = (sequelize) => {
    const UserProject = sequelize.define(config_1.modelNames.userProject, {
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
        },
        projectId: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
        },
    }, {
        timestamps: true,
    });
    return UserProject;
};
exports.default = getUserProjectModel;
