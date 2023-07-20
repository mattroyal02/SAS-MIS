"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = exports.fetchProjectFiles = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const getWorkingDirectory = () => {
    const workingDirectory = (0, path_1.join)(__dirname, "../..", "projects");
    if (!(0, fs_1.existsSync)(workingDirectory))
        (0, fs_1.mkdirSync)(workingDirectory);
    return workingDirectory;
};
const getProjectDirectory = (projectId) => {
    const projectFolder = (0, path_1.join)(getWorkingDirectory(), projectId);
    if (!(0, fs_1.existsSync)(projectFolder))
        (0, fs_1.mkdirSync)(projectFolder);
    return projectFolder;
};
const getItemDirectory = (projectId, itemId) => {
    const itemFolder = (0, path_1.join)(getProjectDirectory(projectId), itemId);
    if (!(0, fs_1.existsSync)(itemFolder))
        (0, fs_1.mkdirSync)(itemFolder);
    return itemFolder;
};
const uploadFiles = (projectId, folders) => {
    for (const { name, file, filename } of folders) {
        console.log("name :>> ", name);
        console.log("projectId :>> ", projectId);
        const folderDirectory = getItemDirectory(projectId, name);
        (0, fs_1.writeFileSync)((0, path_1.join)(folderDirectory, filename), file);
    }
};
exports.uploadFiles = uploadFiles;
const fetchProjectFiles = (projectId) => {
    const projectDirectory = getProjectDirectory(projectId);
    const files = (0, fs_1.readdirSync)(projectDirectory, { withFileTypes: true });
};
exports.fetchProjectFiles = fetchProjectFiles;
