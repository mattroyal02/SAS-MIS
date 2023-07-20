import cors from "cors";
import express from "express";
import http from "http";
import { routeProduct, routeUser } from "modules";
import { routeAMill } from "modules/aMill";
import { routeBinMultiplier } from "modules/binMultiplier";
import { routeReport } from "modules/report";
import { Server } from "socket.io";

const PORT = +(process.env.PORT || 4050);

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (_, res) => {
  res.send("Hello World! Server is Working...");
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

routeUser(app, io);
routeProduct(app);
routeBinMultiplier(app);
routeReport(app);
routeAMill(app);

io.on("connection", (socket) => {
  console.log("client connected");
});

server.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}`);
});

// bootstrap();
