"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const jsonwebtoken_1 = require("jsonwebtoken");
const getUser = async (req, res) => {
    const { 
    // from database3 to product belowe here
    // change this ↓↓↓
    models: { user: User }, } = (0, common_1.getMysqlConnection)();
    const id = req.params.id;
    if (id) {
        const customer = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        });
        return res.send(customer);
    }
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log("token :>> ", token);
    const decoded = (0, jsonwebtoken_1.verify)(token || "", process.env.ACCESS_TOKEN_SECRET || "");
    if (decoded) {
        const me = await User.findByPk(decoded.id, {
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        });
        return res.send(me);
    }
};
exports.default = getUser;
