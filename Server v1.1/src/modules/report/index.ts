import { Express } from "express";

import addReport from "./addReport";
import getPreviousReport from "./getPreviousReport";
import getReport from "./getReport";
import getReports from "./getReports";
import updateReport from "./updateReport";

const routeReport = (app: Express) => {
  app.post("/addReport", addReport);
  app.get("/reports", getReports);
  app.get("/reports/:id", getReport);
  app.put("/reports/:id", updateReport);
  app.get("/report/latest", getPreviousReport);
};

export {
  addReport,
  getPreviousReport,
  getReport,
  getReports,
  routeReport,
  updateReport,
};
