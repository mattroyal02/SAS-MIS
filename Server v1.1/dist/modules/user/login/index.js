"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const common_1 = require("common");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const login = async (req, res) => {
    const { models } = (0, common_1.getMysqlConnection)();
    const userEmail = req.body.email;
    const user = await models.user.findOne({
        where: { email: userEmail },
    });
    if (!user) {
        return res.send({
            status: "FAILED",
            message: "Email and/or password incorrect !",
        });
    }
    else {
        let isPasswordCorrect = (0, bcrypt_1.compareSync)(req.body.password, user.password);
        if (isPasswordCorrect) {
            const secretKey = process.env.ACCESS_TOKEN_SECRET || "";
            let token = jsonwebtoken_1.default.sign({
                id: user.id,
                firstname: user.firstname,
                surname: user.surname,
                title: user.title,
                email: user.email,
                phoneNumber: user.phoneNumber,
                jobTitle: user.jobTitle,
                companyname: user.companyName,
            }, secretKey);
            return res.send({
                status: "SUCCESS",
                message: "Signin successful",
                token,
                user,
            });
        }
        else {
            return res.send({
                status: "FAILED",
                message: "Email and/or password incorrect !",
            });
        }
    }
};
exports.default = login;
