"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const updateUser = async (req, res) => {
    const { models } = (0, common_1.getMysqlConnection)();
    const user = await models.user.findByPk(req.params.id);
    if (user) {
        await user.update(req.body);
    }
    res.send(user);
};
exports.default = updateUser;
