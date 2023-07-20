"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const getUsers = async (_, res) => {
    const { models } = (0, common_1.getMysqlConnection)();
    const data = await models.user.findAll({
        where: { role: "client" },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    res.send({ data });
};
exports.default = getUsers;
