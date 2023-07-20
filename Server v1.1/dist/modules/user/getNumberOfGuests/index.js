"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const getNumberOfGuests = async (_, res) => {
    const { models: { user: User }, } = (0, common_1.getMysqlConnection)();
    const data = await User.count({
        where: {
            role: "client",
        },
    });
    // console.log("body", data);
    res.send({ data });
};
exports.default = getNumberOfGuests;
