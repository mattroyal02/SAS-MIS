"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const modules_1 = require("modules");
const socket_io_1 = require("socket.io");
const PORT = +(process.env.PORT || 4050);
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "1mb" }));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.get("/", (_, res) => {
    res.send("Hello World! Server is Working...");
});
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "http://localhost:3000" } });
(0, modules_1.routeUser)(app, io);
(0, modules_1.routeProject)(app);
io.on("connection", (socket) => {
    console.log("client connected");
});
server.listen(PORT, () => {
    console.log(`app running on http://localhost:${PORT}`);
});
// bootstrap();
