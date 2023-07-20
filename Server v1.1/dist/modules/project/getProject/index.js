"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const getProject = async (req, res) => {
    const { 
    //        ↓↓↓  token table
    models: { project: Project }, } = (0, common_1.getMysqlConnection)();
    const project = await Project.findByPk(req.params.id);
    res.send({ data: project });
};
exports.default = getProject;
