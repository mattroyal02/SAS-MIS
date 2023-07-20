"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelsWithAssociations = void 0;
const config_1 = require("./config");
const project_1 = __importDefault(require("./project"));
const user_1 = __importDefault(require("./user"));
const userProject_1 = __importDefault(require("./userProject"));
const getModelsWithAssociations = (sequelize) => {
    const User = (0, user_1.default)(sequelize);
    const Project = (0, project_1.default)(sequelize);
    const UserProject = (0, userProject_1.default)(sequelize);
    User.belongsToMany(Project, { through: UserProject });
    Project.belongsToMany(User, { through: UserProject });
    const models = {
        [config_1.modelNames.user]: User,
        [config_1.modelNames.project]: Project,
        [config_1.modelNames.userProject]: UserProject,
    };
    return models;
};
exports.getModelsWithAssociations = getModelsWithAssociations;
