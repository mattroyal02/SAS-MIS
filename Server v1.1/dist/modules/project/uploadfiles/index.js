"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const dotenv_1 = __importDefault(require("dotenv"));
const filesystem_1 = require("filesystem");
dotenv_1.default.config();
const addProject = async (req, res) => {
    const { models } = (0, common_1.getMysqlConnection)();
    const input = req.body;
    // Extract project ID, folders, and items from the request body
    const { projectId, folders, items } = req.body;
    // Call the uploadFiles function and pass the projectId and folders
    (0, filesystem_1.uploadFiles)(projectId, folders);
    // Process items (subfolders) if provided
    if (items && Array.isArray(items)) {
        for (const item of items) {
            // Extract item name and files from each item object
            const { itemName, files } = item;
            // Call the uploadFiles function and pass the projectId and files for each item
            (0, filesystem_1.uploadFiles)(projectId, files);
        }
    }
    const data = await models.token.create(input);
    console.log(data);
    return res.send({
        status: "SUCCESS",
        Message: "Successfully stored files",
        Body: data,
    });
};
exports.default = addProject;
