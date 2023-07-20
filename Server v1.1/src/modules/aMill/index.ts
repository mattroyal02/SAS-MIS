import { Express } from "express";

import getPreviousMilla from "./getLatestMilla";
import getMilla from "./getMilla";
import getMillas from "./getMillas";

const routeAMill = (app: Express) => {
  app.get("/mills", getMillas);
  app.get("/mills/:id", getMilla);
  app.get("/mill/latest", getPreviousMilla);
};

export { getMilla, getMillas, getPreviousMilla, routeAMill };
