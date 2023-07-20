"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const updateProject = async (req, res) => {
    const { models } = (0, common_1.getMysqlConnection)();
    const project = await models.project.findByPk(req.params.id);
    if (project) {
        await project.update(req.body);
    }
    res.send(project);
};
exports.default = updateProject;
