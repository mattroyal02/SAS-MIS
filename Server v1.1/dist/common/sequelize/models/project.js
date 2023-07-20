"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const getProjectModel = (sequelize) => {
    const Project = sequelize.define(config_1.modelNames.project, {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(1024),
            allowNull: false,
        },
        poNumber: {
            type: sequelize_1.DataTypes.STRING(512),
            allowNull: false,
        },
        supplierProjectNumber: {
            type: sequelize_1.DataTypes.STRING(1024),
            allowNull: false,
        },
        votingNumber: {
            type: sequelize_1.DataTypes.STRING(1024),
            allowNull: true,
        },
        allocatedUsers: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false,
            defaultValue: {},
        },
    }, {
        timestamps: false,
    });
    return Project;
};
exports.default = getProjectModel;
