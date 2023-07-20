"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = async (req, res) => {
    const { models } = (0, common_1.getMysqlConnection)();
    const input = { ...req.body, password: (0, bcrypt_1.hashSync)(req.body.password, 10) };
    let userExist = await models.user.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (userExist) {
        return res.send({
            status: "FAILURE",
            message: "user already exist login instead",
        });
    }
    const result = await models.user.create(input);
    const secretKey = process.env.ACCESS_TOKEN_SECRET || "";
    const token = jsonwebtoken_1.default.sign(result.get(), secretKey);
    return res.send({ status: "SUCCESS", accessToken: token });
};
exports.default = register;
/*
✅ get the payload from the POST
✅ take the password field from the payload and encrypt it, then store that value in the password field in the database
✅ create the user
✅get the user object from the database
✅make json web token of the user object
✅send that back as a response

*/
