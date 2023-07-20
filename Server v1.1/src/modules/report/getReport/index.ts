import { getMysqlConnection } from "common";
import { Request, Response } from "express";

const getReport = async (req: Request, res: Response) => {
  const {
    //        ↓↓↓  table name here
    models: { report: Report },
  } = getMysqlConnection();
  const report = await Report.findByPk(req.params.id);
  res.send({ data: report });
};

export default getReport;
