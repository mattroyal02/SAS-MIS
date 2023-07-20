import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getReports = async (_: Request, res: Response) => {
  const {
    models: { report: Report },
  } = getMysqlConnection();

  const data = await Report.findAll();
  console.log("body", data);
  res.send({ data });
};

export default getReports;
