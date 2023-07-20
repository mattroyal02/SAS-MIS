"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const getProject = async (_, res) => {
    const { models: { project: Project }, } = (0, common_1.getMysqlConnection)();
    const data = await Project.findAll();
    console.log("body", data);
    res.send({ data });
};
exports.default = getProject;
