import { Express } from "express";
import { Server } from "socket.io";
import attemptCode from "./attemptCode";
import getNumberOfGuests from "./getNumberOfGuests";
import getNumberOfUsers from "./getNumberOfUsers";
import getUser from "./getUser";
import getUsers from "./getUsers";
import loginUser from "./login";
import logoutUser from "./logout";
import registerUser from "./register";
import updateUser from "./updateUser";

const routeUser = (app: Express, io: Server) => {
  app.post("/register", registerUser);
  app.post("/login", loginUser);
  app.post("/logout", logoutUser);
  app.post("/attempt", async (req, res) => attemptCode(req, res, io));
  app.get("/users", getUsers);
  app.get("/users/:id", getUser);
  app.get("/me", getUser);
  app.put("/users/:id", updateUser);
  app.get("/numberOfUsers", getNumberOfUsers);
  app.get("/numberOfGuests", getNumberOfGuests);
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUser,
  routeUser,
  updateUser,
  getNumberOfUsers,
  getNumberOfGuests,
};
