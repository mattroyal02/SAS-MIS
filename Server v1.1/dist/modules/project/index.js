"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.routeProject = exports.getProjects = exports.getProject = exports.addProject = void 0;
const filesystem_1 = require("filesystem");
const multer_1 = __importDefault(require("multer"));
const addProject_1 = __importDefault(require("./addProject"));
exports.addProject = addProject_1.default;
const getProject_1 = __importDefault(require("./getProject"));
exports.getProject = getProject_1.default;
const getProjects_1 = __importDefault(require("./getProjects"));
exports.getProjects = getProjects_1.default;
const updateProject_1 = __importDefault(require("./updateProject"));
exports.updateProject = updateProject_1.default;
const routeProject = (app) => {
    app.post("/addproject", addProject_1.default);
    app.get("/projects", getProjects_1.default);
    app.get("/projects/:id", getProject_1.default);
    app.put("/projects/:id", updateProject_1.default);
    app.post("/upload", (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }).array("files"), (req, res) => {
        console.log("req.body.file :>> ", req.files, req.body);
        const { projectName, options } = req.body;
        for (let index = 0; index < req.files.length; index++) {
            const file = req.files[index];
            console.log("file ===", file);
            // writeFileSync(join(__dirname, file.originalname), file.buffer);
            (0, filesystem_1.uploadFiles)(projectName, [
                {
                    name: options[index],
                    filename: file.originalname,
                    file: file.buffer,
                },
            ]);
        }
        res.send("good");
    });
};
exports.routeProject = routeProject;
