"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const getNumberOfUsers = async (_, res) => {
    const { models: { user: User }, } = (0, common_1.getMysqlConnection)();
    const data = await User.count();
    // console.log("body", data);
    res.send({ data });
};
exports.default = getNumberOfUsers;
