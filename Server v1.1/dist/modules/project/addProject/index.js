"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const addProject = async (req, res) => {
    const { models } = (0, common_1.getMysqlConnection)();
    const input = req.body;
    const results = await models.project.create(input);
    console.log(results);
    return res.send({
        status: "SUCCESS",
        Message: "Successfully created the Project",
        data: results,
    });
};
exports.default = addProject;
